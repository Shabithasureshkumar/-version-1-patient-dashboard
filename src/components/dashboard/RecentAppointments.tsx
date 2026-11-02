import type { PastAppointment } from '@/types'
import { Avatar } from '../ui/Avatar'
import { Card } from '../ui/Card'
import { SectionHeader, ViewAllButton } from '../ui/SectionHeader'

interface RecentAppointmentsProps {
  appointments: PastAppointment[]
  onViewAll?: () => void
}

const STATUS_LABEL: Record<PastAppointment['status'], string> = {
  completed: 'Completed',
  upcoming: 'Upcoming',
  cancelled: 'Cancelled',
}

export function RecentAppointments({ appointments, onViewAll }: RecentAppointmentsProps) {
  return (
    <Card as="section" aria-label="Recent appointments" className="px-[22px] pt-[17px] pb-[14px] 2xl:h-[350px]">
      <SectionHeader size={14.3} title="Recent Appointments" action={<ViewAllButton onClick={onViewAll} />} />

      <ul className="mt-[16px] flex flex-col gap-[22px]">
        {appointments.map(({ id, doctor, when, status }) => (
          <li key={id} className="flex h-[54px] items-center gap-[11px]">
            <Avatar name={doctor.name} src={doctor.avatarUrl} size={42} />
            <div className="min-w-0 flex-1">
              <p className="truncate text-[13px] leading-tight font-semibold">{doctor.name}</p>
              <p className="text-[10.5px] leading-tight text-ink/80">{doctor.specialty}</p>
              <p className="text-[9.5px] leading-tight text-muted">{when}</p>
            </div>
            <span className="rounded-[6px] border border-[#cdeedd] bg-[#e3f5ec] px-[8px] py-[5px] text-[9px] leading-none font-bold text-[#17894f]">
              {STATUS_LABEL[status]}
            </span>
          </li>
        ))}
      </ul>
    </Card>
  )
}
