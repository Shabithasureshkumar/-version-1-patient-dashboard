import { ChevronRight } from 'lucide-react'
import { cn } from '@/lib/cn'
import type { ServiceItem } from '@/types'

interface ServiceCardsProps {
  services: ServiceItem[]
  onSelect?: (id: string) => void
}

const ICON_IMAGES: Record<string, { file: string; w: number; h: number }> = {
  book: { file: 'svc-book.webp', w: 44, h: 34 },
  consult: { file: 'svc-consult.webp', w: 44, h: 34 },
  refill: { file: 'svc-refill.webp', w: 38, h: 32 },
  lab: { file: 'svc-lab.webp', w: 36, h: 36 },
}

const BACKGROUNDS = [
  'from-[#effafd] to-[#d9eef7]',
  'from-[#edf9fc] to-[#dcedf6]',
  'from-[#eefefd] to-[#ccfcfc]',
  'from-[#f4fdfe] to-[#dcfafb]',
]

export function ServiceCards({ services, onSelect }: ServiceCardsProps) {
  return (
    <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 2xl:grid-cols-4">
      {services.map(({ id, title, description, price, icon: Icon }, i) => {
        const img = ICON_IMAGES[id]
        return (
          <li key={id}>
            <button
              type="button"
              onClick={() => onSelect?.(id)}
              className={cn(
                'group relative flex h-[109px] w-full flex-col justify-between overflow-hidden rounded-[22px] border border-white/70 bg-linear-to-b p-[13px] pb-[12px] text-left shadow-[0_6px_18px_-10px_rgb(16_60_90/0.25)] transition hover:-translate-y-0.5',
                BACKGROUNDS[i % BACKGROUNDS.length],
              )}
            >
              <span className="flex items-start justify-between">
                {img ? (
                  <img
                    src={`${import.meta.env.BASE_URL}images/${img.file}`}
                    alt=""
                    width={img.w}
                    height={img.h}
                    className="mt-[6px] max-w-none"
                  />
                ) : (
                  <Icon size={30} className="text-brand-500" aria-hidden />
                )}
                <span className="flex size-[25px] items-center justify-center rounded-full bg-white text-brand-500 shadow-soft transition group-hover:bg-brand-500 group-hover:text-white">
                  <ChevronRight size={12} aria-hidden />
                </span>
              </span>

              <span className="flex items-end justify-between gap-2">
                <span className="min-w-0">
                  <span className="block truncate text-[13.6px] font-semibold text-ink">{title}</span>
                  <span className="mt-[2px] block truncate text-[11px] text-muted">{description}</span>
                </span>
                <span className="-mr-[6px] mb-[1px] shrink-0 rounded-full border border-white bg-white/60 px-[10px] py-[11px] text-[13px] leading-none font-semibold text-ink shadow-[0_2px_8px_-3px_rgb(16_60_90/0.2)]">
                  {price}
                </span>
              </span>
            </button>
          </li>
        )
      })}
    </ul>
  )
}
