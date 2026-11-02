import { useEffect, useState } from 'react'

/**
 * Returns a Date that ticks every second, starting from `initial`.
 * Pass `new Date()` for a real clock, or a fixed date for demos/tests.
 */
export function useClock(initial: Date): Date {
  const [now, setNow] = useState(initial)

  useEffect(() => {
    const id = window.setInterval(() => setNow((prev) => new Date(prev.getTime() + 1000)), 1000)
    return () => window.clearInterval(id)
  }, [])

  return now
}
