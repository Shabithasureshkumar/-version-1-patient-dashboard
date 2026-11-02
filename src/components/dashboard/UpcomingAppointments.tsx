import { CalendarDays, ChevronLeft, ChevronRight, Clock, Video } from 'lucide-react'
import { useMemo, useState } from 'react'
import { cn } from '@/lib/cn'
import {
  addDays,
  formatLongDate,
  formatMonthYear,
  formatWeekdayShort,
  getWeek,
  isSameDay,
  parseISODate,
  toISODate,
} from '@/lib/date'
import type { UpcomingAppointment } from '@/types'
import { Avatar } from '../ui/Avatar'
import { Badge } from '../ui/Badge'
import { Card } from '../ui/Card'

interface UpcomingAppointmentsProps {
  appointments: UpcomingAppointment[]
  today: Date
  onJoin?: (id: string) => void
  onReschedule?: (id: string) => void
  onViewAll?: () => void
}

export function UpcomingAppointments({ appointments, today, onJoin, onReschedule, onViewAll }: UpcomingAppointmentsProps) {
  const [selected, setSelected] = useState(today)
  const week = useMemo(() => getWeek(selected), [selected])

  const byDate = useMemo(() => {
    const map = new Map<string, UpcomingAppointment[]>()
    appointments.forEach((a) => map.set(a.date, [...(map.get(a.date) ?? []), a]))
    return map
  }, [appointments])

  const dayAppointments = byDate.get(toISODate(selected)) ?? []

  return (
    <Card as="section" aria-labelledby="upcoming-title" className="overflow-hidden px-[16px] pt-[18px] pb-[14px] 2xl:h-[380px]">
      <header className="flex items-center justify-between">
        <h2 id="upcoming-title" className="text-[15px] font-semibold">
          Upcoming Appointment
        </h2>
        <button type="button" onClick={onViewAll} className="-m-2 p-2 text-[11px] font-semibold text-brand-600 hover:underline">
          View All
        </button>
      </header>

      <div className="mt-[10px] flex items-center justify-between">
        <p className="text-[13px] font-semibold">{formatMonthYear(selected)}</p>
        <div className="flex gap-2">
          <NavButton label="Previous week" onClick={() => setSelected((d) => addDays(d, -7))}>
            <ChevronLeft size={14} />
          </NavButton>
          <NavButton label="Next week" onClick={() => setSelected((d) => addDays(d, 7))}>
            <ChevronRight size={14} />
          </NavButton>
        </div>
      </div>

      <ul className="mt-[15px] -mr-[10px] grid grid-cols-7 gap-[5.5px]" aria-label="Week days">
        {week.map((day) => {
          const active = isSameDay(day, selected)
          const hasAppt = byDate.has(toISODate(day))
          return (
            <li key={day.toISOString()}>
              <button
                type="button"
                onClick={() => setSelected(day)}
                aria-pressed={active}
                aria-label={`${formatLongDate(day)}${hasAppt ? ', has appointments' : ''}`}
                className={cn(
                  'relative flex h-[66px] w-full flex-col items-center justify-center gap-1 rounded-2xl text-[11px] transition',
                  active
                    ? 'bg-linear-to-b from-[#10a8c8] to-[#0786a6] text-white shadow-[0_10px_18px_-6px_rgb(11_155_182/0.6)]'
                    : 'bg-slate-50 text-slate-500 hover:bg-brand-50',
                )}
              >
                <span>{formatWeekdayShort(day)}</span>
                <span className={cn('text-[18px] font-bold', !active && 'text-ink')}>{day.getDate()}</span>
                {hasAppt && (
                  <span
                    aria-hidden
                    className={cn('absolute bottom-1.5 size-1 rounded-full', active ? 'bg-white' : 'bg-brand-500')}
                  />
                )}
              </button>
            </li>
          )
        })}
      </ul>

      <div className="mt-[16px] flex items-center justify-between text-[12px]">
        <p className="font-semibold">{formatLongDate(selected)}</p>
        <p className="font-semibold text-brand-600">
          {dayAppointments.length} appointment{dayAppointments.length === 1 ? '' : 's'}
        </p>
      </div>

      {dayAppointments.length === 0 ? (
        <p className="mt-3 rounded-2xl bg-slate-50 py-8 text-center text-[12px] text-muted">
          No appointments scheduled for this day.
        </p>
      ) : (
        <ul className="mt-[8px] flex flex-col gap-3 2xl:[&>li:not(:first-child)>*]:invisible">
          {dayAppointments.map((appt) => (
            <AppointmentCard key={appt.id} appt={appt} onJoin={onJoin} onReschedule={onReschedule} />
          ))}
        </ul>
      )}
    </Card>
  )
}

function NavButton({ label, onClick, children }: { label: string; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="flex size-7 items-center justify-center rounded-full border border-slate-200 bg-white text-ink shadow-soft transition hover:bg-brand-50"
    >
      {children}
    </button>
  )
}

function AppointmentCard({
  appt,
  onJoin,
  onReschedule,
}: {
  appt: UpcomingAppointment
  onJoin?: (id: string) => void
  onReschedule?: (id: string) => void
}) {
  return (
    <li className="rounded-[16px] border border-brand-100 bg-linear-to-b from-white to-[#f1fafc] p-[13px]">
      <div className="flex items-center gap-3">
        <Avatar name={appt.doctor.name} src={appt.doctor.avatarUrl} size={42} className="from-brand-500 to-brand-700" />
        <div className="min-w-0 flex-1">
          <p className="text-[14px] font-bold">{appt.doctor.name}</p>
          <p className="text-[11px] text-muted">{appt.doctor.specialty}</p>
        </div>
        <Badge className="rounded-md bg-[#d6f2e1] px-[10px] py-[5px] text-[9.5px] font-bold text-[#1c8a52]">{appt.type}</Badge>
      </div>

      <div className="mt-3 flex items-center justify-between text-[11px] font-medium text-ink/80">
        <span className="inline-flex items-center gap-1.5">
          <CalendarDays size={12} className="text-brand-600" aria-hidden />
          {formatLongDate(parseISODate(appt.date))}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Clock size={12} className="text-brand-600" aria-hidden />
          {appt.startTime} - {appt.endTime}
        </span>
      </div>

      <div className="mt-[10px] grid grid-cols-2 gap-[9px]">
        <button
          type="button"
          onClick={() => onJoin?.(appt.id)}
          className="inline-flex h-[37px] items-center justify-center gap-2 rounded-[10px] bg-linear-to-r from-[#0a7f9d] to-[#069cbc] text-[11.5px] font-bold text-white shadow-[0_6px_12px_-4px_rgb(11_155_182/0.55)] transition hover:brightness-110"
        >
          <Video size={14} aria-hidden />
          Join Now
        </button>
        <button
          type="button"
          onClick={() => onReschedule?.(appt.id)}
          className="h-[37px] rounded-[10px] border border-slate-200 bg-white text-[11.5px] font-bold transition hover:bg-slate-50"
        >
          Reschedule
        </button>
      </div>
    </li>
  )
}
