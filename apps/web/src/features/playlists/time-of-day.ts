// Meal order, not alphabetical: this is how the occasion row reads.
export const OCCASIONS = ['Breakfast', 'Lunch', 'Dinner', 'Late night', 'Party'] as const

type Slot<T> = { from: number, to: number, value: T }

// Half-open [from, to) ranges; Late night wraps past midnight, so it has two slots.
const OCCASION_SLOTS: Slot<string>[] = [
  { from: 0, to: 5, value: 'Late night' },
  { from: 5, to: 11, value: 'Breakfast' },
  { from: 11, to: 15, value: 'Lunch' },
  { from: 18, to: 22, value: 'Dinner' },
  { from: 22, to: 24, value: 'Late night' }
]

const GREETING_SLOTS: Slot<string>[] = [
  { from: 5, to: 12, value: 'Good morning' },
  { from: 12, to: 18, value: 'Good afternoon' }
]

function valueForHour<T> (slots: Slot<T>[], hour: number): T | undefined {
  return slots.find(({ from, to }) => hour >= from && hour < to)?.value
}

// Afternoon (15–18 h) has no meal, so nothing is suggested.
export function occasionForHour (hour: number): string | null {
  return valueForHour(OCCASION_SLOTS, hour) ?? null
}

export function greetingForHour (hour: number): string {
  return valueForHour(GREETING_SLOTS, hour) ?? 'Good evening'
}

export function describeSelection (count: number, genre: string, occasion: string): string {
  const noun = count === 1 ? 'playlist' : 'playlists'
  const kind = genre === '' ? noun : `${genre} ${noun}`
  const moment = occasion === '' ? '' : ` for ${occasion.toLowerCase()}`

  return `${count} ${kind}${moment}`
}
