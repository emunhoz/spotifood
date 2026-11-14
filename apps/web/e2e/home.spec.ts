import { test, expect, type Page } from '@playwright/test'

// 20:00 local: "Good evening" and the Dinner suggestion, every run
const DINNER_TIME = new Date('2026-01-15T20:00:00+01:00')

async function openHome (page: Page, path = '/') {
  await page.clock.setFixedTime(DINNER_TIME)
  await page.goto(path)
  await expect(page.getByRole('article').first()).toBeVisible()
}

test('home', async ({ page }) => {
  await openHome(page)

  await expect(page.getByRole('heading', { level: 1 })).toHaveText('24 playlists')
  await expect(page.getByRole('button', { name: /^Dinner 6 \(suggested for now\)/ })).toBeVisible()
  await expect(page).toHaveScreenshot('home.png')
})

test('an occasion chip filters, counts and lands in the URL', async ({ page }) => {
  await openHome(page)

  await page.getByRole('button', { name: /^Dinner/ }).click()

  await expect(page).toHaveURL(/occasion=Dinner/)
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('6 playlists for dinner')
  await expect(page.getByRole('article')).toHaveCount(6)
  await expect(page.getByRole('button', { name: /^Dinner/ })).toHaveAttribute('aria-pressed', 'true')
  await expect(page).toHaveScreenshot('dinner.png')
})

test('search finds dishes and offers a way out when nothing matches', async ({ page }) => {
  await openHome(page)
  const search = page.getByRole('textbox', { name: 'Search playlists' })

  await search.fill('ramen')
  await expect(page.getByRole('article')).toHaveCount(1)

  await search.fill('lasagna')
  await expect(page.getByRole('heading', { name: 'No playlists found' })).toBeVisible()
  await expect(page).toHaveScreenshot('empty.png')

  await page.getByRole('button', { name: 'Clear filters' }).last().click()
  await expect(page.getByRole('article')).toHaveCount(24)
  await expect(search).toHaveValue('')
})

test('the playlist detail opens from a card, and Back closes it', async ({ page }) => {
  await openHome(page)

  await page.getByRole('button', { name: 'Ramen at 2AM' }).click()

  const dialog = page.getByRole('dialog', { name: 'Ramen at 2AM' })
  await expect(dialog).toBeVisible()
  await expect(page).toHaveURL(/playlist=pl-17/)
  await expect(dialog.getByRole('listitem')).toHaveCount(6)
  await expect(page).toHaveScreenshot('detail.png')

  await page.goBack()
  await expect(dialog).toBeHidden()
})

test('a shared link restores filters and the open playlist', async ({ page }) => {
  await openHome(page, '/?genre=Lo-fi&playlist=pl-17')

  await expect(page.getByRole('dialog', { name: 'Ramen at 2AM' })).toBeVisible()
  await page.keyboard.press('Escape')
  await expect(page).not.toHaveURL(/playlist=/)
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('4 Lo-fi playlists')
})

test('slash focuses the search from anywhere', async ({ page, isMobile }) => {
  test.skip(isMobile, 'keyboard shortcut is a desktop affordance')
  await openHome(page)

  await page.keyboard.press('/')

  await expect(page.getByRole('textbox', { name: 'Search playlists' })).toBeFocused()
})
