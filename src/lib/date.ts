const pad = (n: number): string => String(n).padStart(2, '0')

/** yyyy-mm-dd in local time. */
export const toISODate = (d: Date): string =>
  `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`

export const addDays = (d: Date, days: number): Date => {
  const next = new Date(d)
  next.setDate(next.getDate() + days)
  return next
}

/** Sunday-start week containing `d`. */
export const getWeek = (d: Date): Date[] => {
  const start = addDays(d, -d.getDay())
  return Array.from({ length: 7 }, (_, i) => addDays(start, i))
}

export const formatTime12 = (d: Date): string => {
  const h = d.getHours() % 12 || 12
  return `${pad(h)}:${pad(d.getMinutes())} ${d.getHours() >= 12 ? 'PM' : 'AM'}`
}

export const formatMonthYear = (d: Date): string =>
  d.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })

export const formatWeekdayShort = (d: Date): string =>
  d.toLocaleDateString('en-US', { weekday: 'short' })

/** "Wednesday 28 Oct" */
export const formatBannerDate = (d: Date): string =>
  `${d.toLocaleDateString('en-US', { weekday: 'long' })} ${d.getDate()} ${d.toLocaleDateString('en-US', { month: 'short' })}`

/** "Wed, Oct 28, 2026" */
export const formatLongDate = (d: Date): string =>
  d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })

export const isSameDay = (a: Date, b: Date): boolean => toISODate(a) === toISODate(b)

export const parseISODate = (iso: string): Date => {
  const [y, m, d] = iso.split('-').map(Number)
  return new Date(y, m - 1, d)
}
