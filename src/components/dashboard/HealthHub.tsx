import { ArrowUpRight, Bell } from 'lucide-react'
import type { HubItem } from '@/types'
import { Card } from '../ui/Card'
import { SectionHeader } from '../ui/SectionHeader'

interface HealthHubProps {
  items: HubItem[]
  onSelect?: (id: string) => void
}

export function HealthHub({ items, onSelect }: HealthHubProps) {
  return (
    <Card as="section" aria-label="My Health Hub" className="px-[19px] pt-[20px] pb-[16px] 2xl:h-[350px]">
      <SectionHeader
        size={17}
        title="My Health Hub"
        action={
          <button
            type="button"
            aria-label="Hub notifications"
            className="mr-[32px] flex size-[28px] items-center justify-center rounded-full border border-brand-200 bg-white text-brand-600 transition hover:bg-brand-50"
          >
            <Bell size={12} />
          </button>
        }
      />

      <ul className="mt-[11px] grid grid-cols-2 gap-[16px]">
        {items.map(({ id, label, icon: Icon, badge }) => (
          <li key={id}>
            <button
              type="button"
              onClick={() => onSelect?.(id)}
              className="relative flex h-[129px] w-full flex-col justify-between rounded-[16px] border border-[#bfe8ee] bg-linear-to-br from-[#f1fcfd] via-[#e6f8fa] to-[#d3f4f7] p-[11px] pb-[30px] text-left shadow-card transition hover:-translate-y-0.5"
            >
              <span className="flex items-start justify-between">
                <span className="flex size-[36px] items-center justify-center rounded-[10px] bg-linear-to-br from-brand-400 to-brand-700 text-white shadow-[0_4px_8px_-2px_rgb(11_155_182/0.5)]">
                  <Icon size={17} className={id === 'messages' ? 'fill-white' : undefined} aria-hidden />
                </span>
                {badge ? (
                  <span
                    className="flex size-[20px] items-center justify-center rounded-full bg-[#e5383b] text-[11px] font-bold text-white"
                    aria-label={`${badge} unread`}
                  >
                    {badge}
                  </span>
                ) : (
                  <span className="flex size-[24px] items-center justify-center rounded-full bg-white shadow-soft"><ArrowUpRight size={11} className="text-brand-600" aria-hidden /></span>
                )}
              </span>
              <span className="text-[13.5px] leading-tight font-bold">{label}</span>
            </button>
          </li>
        ))}
      </ul>
    </Card>
  )
}
