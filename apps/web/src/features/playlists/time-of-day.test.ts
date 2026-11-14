import { greetingForHour, occasionForHour, describeSelection } from './time-of-day'

describe('occasionForHour', () => {
  test.each([
    [4, 'Late night'],
    [5, 'Breakfast'],
    [10, 'Breakfast'],
    [11, 'Lunch'],
    [14, 'Lunch'],
    [15, null],
    [17, null],
    [18, 'Dinner'],
    [21, 'Dinner'],
    [22, 'Late night'],
    [0, 'Late night']
  ])('%i h → %s', (hour, expected) => {
    expect(occasionForHour(hour)).toBe(expected)
  })
})

describe('greetingForHour', () => {
  test.each([
    [5, 'Good morning'],
    [11, 'Good morning'],
    [12, 'Good afternoon'],
    [17, 'Good afternoon'],
    [18, 'Good evening'],
    [3, 'Good evening']
  ])('%i h → %s', (hour, expected) => {
    expect(greetingForHour(hour)).toBe(expected)
  })
})

describe('describeSelection', () => {
  test('counts everything when nothing is selected', () => {
    expect(describeSelection(24, '', '')).toBe('24 playlists')
  })

  test('uses the singular for one result', () => {
    expect(describeSelection(1, '', '')).toBe('1 playlist')
  })

  test('names the occasion and genre', () => {
    expect(describeSelection(6, '', 'Dinner')).toBe('6 playlists for dinner')
    expect(describeSelection(2, 'Jazz', 'Dinner')).toBe('2 Jazz playlists for dinner')
  })
})
