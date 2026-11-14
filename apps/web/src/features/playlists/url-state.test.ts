import { readCriteria, criteriaToSearch, readPlaylistId, withPlaylistId } from './url-state'

describe('readCriteria', () => {
  test('reads the known params', () => {
    expect(readCriteria('?q=ramen&genre=Lo-fi&occasion=Late+night')).toEqual({ search: 'ramen', genre: 'Lo-fi', occasion: 'Late night' })
  })

  test('falls back to empty criteria for missing params', () => {
    expect(readCriteria('')).toEqual({ search: '', genre: '', occasion: '' })
  })

  test('ignores unknown params', () => {
    expect(readCriteria('?utm_source=x&genre=Jazz')).toEqual({ search: '', genre: 'Jazz', occasion: '' })
  })
})

describe('criteriaToSearch', () => {
  test('writes only the criteria that are set', () => {
    expect(criteriaToSearch({ search: '', genre: 'Jazz', occasion: '' }, '')).toBe('?genre=Jazz')
  })

  test('returns an empty string when nothing is set', () => {
    expect(criteriaToSearch({ search: '', genre: '', occasion: '' }, '')).toBe('')
  })

  test('keeps params it does not own', () => {
    expect(criteriaToSearch({ search: 'eggs', genre: '', occasion: '' }, '?playlist=pl-01&genre=Rock')).toBe('?playlist=pl-01&q=eggs')
  })

  test('round-trips through readCriteria', () => {
    const criteria = { search: 'late snacks', genre: 'Lo-fi', occasion: 'Late night' }
    expect(readCriteria(criteriaToSearch(criteria, ''))).toEqual(criteria)
  })
})

describe('playlist param', () => {
  test('reads the open playlist id', () => {
    expect(readPlaylistId('?genre=Jazz&playlist=pl-17')).toBe('pl-17')
    expect(readPlaylistId('?genre=Jazz')).toBeNull()
  })

  test('sets and removes the id while keeping the filters', () => {
    expect(withPlaylistId('?genre=Jazz', 'pl-17')).toBe('?genre=Jazz&playlist=pl-17')
    expect(withPlaylistId('?genre=Jazz&playlist=pl-17', null)).toBe('?genre=Jazz')
    expect(withPlaylistId('?playlist=pl-17', null)).toBe('')
  })
})
