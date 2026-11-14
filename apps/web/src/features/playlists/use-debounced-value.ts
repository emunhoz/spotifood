import { useEffect, useState } from 'react'

// The input stays instant; the filter, view transition and URL write follow once typing pauses.
export function useDebouncedValue<T> (value: T, delayMs: number): T {
  const [debounced, setDebounced] = useState(value)

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delayMs)
    return () => clearTimeout(timer)
  }, [value, delayMs])

  return debounced
}
