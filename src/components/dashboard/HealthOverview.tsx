import { Activity, CalendarDays, ChevronDown } from 'lucide-react'
import { useId, useState, type ReactNode } from 'react'
import { cn } from '@/lib/cn'
import type { Vitals } from '@/types'
import { Card } from '../ui/Card'

const RANGES = ['Last 7 days', 'Last 30 days', 'Last 90 days'] as const

interface HealthOverviewProps {
  vitals: Vitals
}

export function HealthOverview({ vitals }: HealthOverviewProps) {
  const [range, setRange] = useState<(typeof RANGES)[number]>(RANGES[0])
  const selectId = useId()

  return (
    <Card as="section" aria-labelledby="health-overview-title" className="px-[18px] pt-[16px] pb-[18px] 2xl:h-[188px]">
      <header className="mb-[17px] flex items-center justify-between">
        <h2 id="health-overview-title" className="flex items-center gap-3 text-[17px] font-semibold">
          <span className="flex size-[30px] items-center justify-center rounded-lg bg-linear-to-br from-brand-400 to-brand-600 text-white shadow-[0_4px_10px_-2px_rgb(11_155_182/0.55)]">
            <Activity size={16} aria-hidden />
          </span>
          Your Health Overview
        </h2>

        <div className="relative">
          <label htmlFor={selectId} className="sr-only">
            Time range
          </label>
          <CalendarDays size={13} className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-brand-700" />
          <select
            id={selectId}
            value={range}
            onChange={(e) => setRange(e.target.value as (typeof RANGES)[number])}
            className="h-[30px] cursor-pointer appearance-none rounded-full border border-slate-200 bg-white pr-8 pl-8 text-[11.5px] font-medium shadow-[0_4px_10px_-4px_rgb(16_60_90/0.3)] focus:outline-none"
          >
            {RANGES.map((r) => (
              <option key={r}>{r}</option>
            ))}
          </select>
          <ChevronDown size={12} className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2" />
        </div>
      </header>

      <div className="grid grid-cols-1 gap-[14px] sm:grid-cols-2 2xl:grid-cols-4">
        <HeartRateCard {...vitals.heartRate} />
        <BloodPressureCard {...vitals.bloodPressure} />
        <WeightCard {...vitals.weight} />
        <HeightCard {...vitals.height} />
      </div>
    </Card>
  )
}

/* ------------------------------------------------------------------ */

const img = (file: string) => `${import.meta.env.BASE_URL}images/${file}`

function VitalShell({ icon, label, children }: { icon: ReactNode; label: string; children: ReactNode }) {
  return (
    <article className="relative isolate h-[107px] overflow-hidden rounded-[22px] border border-[#cfe9ef] bg-linear-to-br from-white via-[#f3fbfd] to-[#e6f6fa]">
      <span aria-hidden className="absolute -top-8 -right-6 -z-10 size-[110px] rounded-full bg-white/70" />
      <div className="flex items-start gap-[12px] px-[19px] pt-[13px]">
        <span className="mt-[2px] flex h-[38px] w-[38px] shrink-0 items-center justify-center">{icon}</span>
        <div className="min-w-0">
          <p className="text-[12px] leading-none font-medium text-ink">{label}</p>
          {children}
        </div>
      </div>
    </article>
  )
}

function StatusPill({ children }: { children: ReactNode }) {
  return (
    <span className="absolute bottom-[18px] left-[19px] inline-flex h-[17px] items-center gap-1.5 rounded-full bg-white px-[8px] text-[8.5px] font-semibold text-ink shadow-[0_2px_6px_-2px_rgb(16_60_90/0.25)]">
      {children}
    </span>
  )
}

const NormalPill = () => (
  <StatusPill>
    <span className="size-[5px] rounded-full bg-emerald-500" aria-hidden />
    Normal
  </StatusPill>
)

const Value = ({ children, unit }: { children: ReactNode; unit: string }) => (
  <p className="mt-[4px] flex items-baseline gap-[5px]">
    <span className="text-[22px] leading-none font-bold">{children}</span>
    <span className="text-[13px] text-muted">{unit}</span>
  </p>
)

function HeartRateCard({ bpm }: { bpm: number }) {
  return (
    <VitalShell icon={<img src={img('vital-heart.webp')} alt="" width={40} height={36} className="max-w-none" />} label="Heart Rate">
      <Value unit="bpm">{bpm}</Value>
      <NormalPill />
      <svg viewBox="0 0 172 24" className="absolute right-[24px] bottom-[11px] h-[24px] w-[172px]" aria-hidden fill="none">
        <path
          d="M0 14 H40 L46 13 L52 4 L58 20 L62 14 H110 L114 10 L120 20 L126 4 L132 20 L136 14 H172"
          stroke="#7fdcee"
          strokeWidth="1.5"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
      </svg>
    </VitalShell>
  )
}

function BloodPressureCard({ systolic, diastolic, trend }: Vitals['bloodPressure']) {
  return (
    <VitalShell icon={<img src={img('vital-bp.webp')} alt="" width={40} height={40} className="max-w-none" />} label="Blood Pressure">
      <Value unit="">
        {systolic}/{diastolic}
      </Value>
      <NormalPill />
      <div className="absolute right-[13px] bottom-[11px] flex h-[26px] items-end gap-[5px]" aria-hidden>
        {trend.map((h, i) => (
          <span
            key={i}
            className={cn(
              'w-[9px] rounded-[4px]',
              i === trend.length - 1 ? 'bg-brand-400 shadow-[0_0_8px_rgb(47_179_201/0.8)]' : i % 3 === 0 ? 'bg-brand-700' : 'bg-brand-600',
            )}
            style={{ height: `${Math.max(10, h * 0.28)}px` }}
          />
        ))}
      </div>
    </VitalShell>
  )
}

function WeightCard({ kg, deltaKg, trend }: Vitals['weight']) {
  const pts = trend.map((v, i) => [(i / (trend.length - 1)) * 180, 30 - v * 0.45] as const)
  const line = pts.map(([x, y]) => `${x},${y}`).join(' ')
  return (
    <VitalShell icon={<img src={img('vital-weight.webp')} alt="" width={40} height={38} className="max-w-none" />} label="Weight">
      <Value unit="kg">{kg}</Value>
      <StatusPill>
        ↓ {deltaKg} kg
      </StatusPill>
      <svg viewBox="0 0 180 32" className="absolute right-[24px] bottom-[10px] h-[28px] w-[180px]" aria-hidden fill="none">
        <polygon points={`${line} 180,32 0,32`} fill="rgb(11 155 182 / 0.12)" />
        <polyline points={line} stroke="var(--color-brand-700)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </VitalShell>
  )
}

function HeightCard({ cm, feet, min, max }: Vitals['height']) {
  const pct = ((cm - min) / (max - min)) * 100
  return (
    <VitalShell icon={<img src={img('vital-height.webp')} alt="" width={38} height={40} className="max-w-none" />} label="Height">
      <Value unit="cm">{cm}</Value>
      <StatusPill>⇕ {feet}</StatusPill>
      <div className="absolute right-[13px] bottom-[11px] w-[188px]">
        <div className="relative h-[10px] rounded-full bg-linear-to-r from-[#a8f4f8] to-[#5fd6e8]">
          <span
            className="absolute top-1/2 size-[16px] -translate-x-1/2 -translate-y-1/2 rounded-full border-[3px] border-white bg-brand-300 shadow-[0_0_0_2px_rgb(95_214_232/0.6),0_0_10px_rgb(95_214_232/0.9)]"
            style={{ left: `${pct}%` }}
          />
        </div>
        <div className="mt-[7px] flex justify-between text-[8px] text-muted">
          <span>{min}</span>
          <span>{(min + max) / 2}</span>
          <span>{max} cm</span>
        </div>
      </div>
    </VitalShell>
  )
}
