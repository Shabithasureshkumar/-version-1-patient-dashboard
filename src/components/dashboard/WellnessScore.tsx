import { Info, MessageSquareText, Sparkles } from 'lucide-react'
import { useId } from 'react'
import { cn } from '@/lib/cn'
import type { WellnessFactor, WellnessLevel } from '@/types'
import { Badge } from '../ui/Badge'
import { Card } from '../ui/Card'

interface WellnessScoreProps {
  score: number
  max: number
  label: string
  message: string
  factors: WellnessFactor[]
  onOpenChat?: () => void
}

const LEVEL_STYLES: Record<WellnessLevel, { tile: string; text: string; label: string }> = {
  good: { tile: 'bg-emerald-50/80 text-emerald-800', text: 'text-emerald-600', label: 'Good' },
  moderate: { tile: 'bg-amber-50 text-amber-800', text: 'text-amber-600', label: 'Moderate' },
  poor: { tile: 'bg-red-50 text-red-800', text: 'text-red-600', label: 'Poor' },
}

const FACTOR_TILE: Record<string, string> = {
  sleep: 'bg-[#f2effd] text-[#6d4fd6]',
  activity: 'bg-[#fff2e6] text-[#f08a24]',
  nutrition: 'bg-[#e6f5ec] text-[#2fa05a]',
  stress: 'bg-[#e6f4f1] text-[#12a08a]',
}

export function WellnessScore({ score, max, label, message, factors, onOpenChat }: WellnessScoreProps) {
  return (
    <Card as="section" aria-labelledby="wellness-title" className="relative px-[17px] pt-[19px] pb-[72px] 2xl:h-[303px] 2xl:pb-[14px]">
      <header className="flex items-center justify-between">
        <h2 id="wellness-title" className="flex items-center gap-2.5 text-[14.5px] font-bold">
          <span className="flex size-6 items-center justify-center rounded-full bg-brand-100 text-brand-600">
            <Sparkles size={13} aria-hidden />
          </span>
          Wellness Score
          <Info size={13} className="text-slate-400" aria-label="How is this calculated?" />
        </h2>
        <Badge className="rounded-md bg-[#d6f2e1] px-3 py-[6px] font-bold text-[#1c8a52]">{label}</Badge>
      </header>

      <ScoreGauge score={score} max={max} />
      <p className="mt-[8px] text-center text-[12px] text-muted">{message}</p>

      <ul className="mt-[9px] grid grid-cols-2 gap-[8px] sm:grid-cols-4">
        {factors.map(({ id, label: name, level, icon: Icon }) => (
          <li
            key={id}
            className={cn(
              'flex h-[112px] flex-col items-center justify-center gap-1.5 rounded-2xl text-center',
              FACTOR_TILE[id] ?? LEVEL_STYLES[level].tile,
            )}
          >
            <Icon size={18} aria-hidden />
            <span className="text-[11px] font-semibold text-ink">{name}</span>
            <span className={cn('rounded-full px-2 py-[3px] text-[9px] font-bold', level === 'moderate' ? 'bg-[#fde9a9] text-[#8a5d05]' : 'bg-[#d6f2e1] text-[#1c8a52]')}>
              {LEVEL_STYLES[level].label}
            </span>
          </li>
        ))}
      </ul>

      <button
        type="button"
        onClick={onOpenChat}
        aria-label="Open health assistant chat"
        className="absolute right-[30px] -bottom-[2px] flex size-[62px] items-center justify-center rounded-full bg-linear-to-br from-[#5ccbe0] to-[#0a8aa8] text-white shadow-[0_10px_20px_-6px_rgb(11_155_182/0.6)] transition hover:scale-105"
      >
        <MessageSquareText size={26} aria-hidden />
      </button>
    </Card>
  )
}

/* ------------------------------------------------------------------ */

const SIZE = 197
const STROKE = 30
const RADIUS = (SIZE - STROKE) / 2
const START_DEG = 187
const SWEEP_DEG = 166

const polar = (deg: number) => {
  const rad = (deg * Math.PI) / 180
  return { x: SIZE / 2 + RADIUS * Math.cos(rad), y: SIZE / 2 + RADIUS * Math.sin(rad) }
}

const arc = (from: number, to: number) => {
  const a = polar(from)
  const b = polar(to)
  const large = to - from > 180 ? 1 : 0
  return `M${a.x} ${a.y} A${RADIUS} ${RADIUS} 0 ${large} 1 ${b.x} ${b.y}`
}

function ScoreGauge({ score, max }: { score: number; max: number }) {
  const id = useId()
  const ratio = Math.min(Math.max(score / max, 0), 1)

  return (
    <div className="relative mx-auto mt-[8px] h-[90px] w-[197px] overflow-hidden">
      <svg
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        className="absolute top-0 left-0 size-[197px]"
        role="img"
        aria-label={`Wellness score ${score} out of ${max}`}
      >
        <defs>
          <linearGradient id={id} x1="0" y1="0" x2="1" y2="0">
            <stop stopColor="#06b3d3" />
            <stop offset="1" stopColor="#0a7f9d" />
          </linearGradient>
        </defs>
        <path d={arc(START_DEG, START_DEG + SWEEP_DEG)} stroke="#e8eef2" strokeWidth={STROKE} strokeLinecap="butt" fill="none" />
        <path
          d={arc(START_DEG, START_DEG + SWEEP_DEG * ratio)}
          stroke={`url(#${id})`}
          strokeWidth={STROKE}
          strokeLinecap="round"
          fill="none"
        />
      </svg>

      <p className="absolute inset-x-0 top-[47px] text-center">
        <span className="text-[26px] font-bold">{score}</span>
        <span className="text-[14px] font-medium text-muted">/{max}</span>
      </p>
    </div>
  )
}
