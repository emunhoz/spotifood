import { readCriteria, criteriaToSearch } from './url-state'

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
