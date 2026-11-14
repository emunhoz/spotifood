import { coverSvg, coverDataUrl } from './cover'

const base = { id: 'pl-01', genre: 'Jazz', cover: ['#F6D365', '#FDA085'] as [string, string] }

describe('coverSvg', () => {
  test('is deterministic for the same playlist', () => {
    expect(coverSvg(base)).toBe(coverSvg({ ...base }))
  })

  test('varies with the playlist id', () => {
    expect(coverSvg(base)).not.toBe(coverSvg({ ...base, id: 'pl-02' }))
  })

  test('keeps the playlist colors', () => {
    expect(coverSvg(base)).toContain('#F6D365')
    expect(coverSvg(base)).toContain('#FDA085')
  })

  test.each([
    ['Jazz', '<path'],
    ['Lo-fi', '<circle'],
    ['Rock', '<rect'],
    ['Unknown genre', '<circle']
  ])('draws a %s motif', (genre, element) => {
    expect(coverSvg({ ...base, genre })).toContain(element)
  })
})

describe('coverDataUrl', () => {
  test('wraps the svg in a data URL', () => {
    expect(coverDataUrl(base)).toMatch(/^data:image\/svg\+xml,/)
  })
})
