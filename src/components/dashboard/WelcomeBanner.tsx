import { UserRound } from 'lucide-react'
import { useClock } from '@/hooks/useClock'
import { formatBannerDate, formatTime12 } from '@/lib/date'

interface WelcomeBannerProps {
  name: string
  role: string
  avatarUrl?: string
  initialTime: Date
}

export function WelcomeBanner({ name, role, avatarUrl, initialTime }: WelcomeBannerProps) {
  const now = useClock(initialTime)

  return (
    <section
      aria-label="Welcome"
      className="relative flex min-h-[128px] items-start justify-between gap-3 overflow-hidden rounded-[28px] bg-linear-to-r from-[#007d9b] via-[#0087a6] to-[#029ec0] px-[18px] pt-[23px] pb-[14px] text-white 2xl:h-[128px] 2xl:pb-0 shadow-banner"
    >
      <div className="relative z-10 flex flex-col items-start">
        <h1 className="text-[26px] leading-[28px] font-bold">Welcome, {name}!</h1>
        <span className="mt-[10px] flex h-[28px] items-center rounded-full bg-white/55 px-[15px] text-[15px] font-medium text-[#0b4f64]">{role}</span>
        <div className="mt-[6px] flex items-center gap-[11px]">
          <time dateTime={now.toISOString()} className="text-[20px] leading-none font-bold tabular-nums">
            {formatTime12(now)}
          </time>
          <span className="rounded-full bg-white px-[11px] py-[5px] text-[9.3px] leading-none font-medium text-ink">
            {formatBannerDate(now)}
          </span>
        </div>
      </div>

      <div className="absolute inset-y-0 right-0 w-[300px] bg-[radial-gradient(circle_at_70%_50%,rgb(255_255_255/0.22),transparent_62%)]" />
      <div className="relative z-10 -mt-[1px] mr-[-5px] flex size-[110px] shrink-0 items-center justify-center overflow-hidden rounded-full bg-brand-100 shadow-[0_0_0_9px_rgb(255_255_255/0.16),0_0_0_20px_rgb(255_255_255/0.08)]">
        {avatarUrl ? (
          <img src={avatarUrl} alt={name} className="size-full object-cover" />
        ) : (
          <UserRound size={64} className="mt-3 text-brand-600" strokeWidth={1.4} aria-hidden />
        )}
      </div>
    </section>
  )
}
