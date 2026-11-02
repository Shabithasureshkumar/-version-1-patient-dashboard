import { Clock, Moon, Sun } from 'lucide-react'
import { useId, useMemo, useState } from 'react'
import { cn } from '@/lib/cn'
import type { DoseState, Medication, MedicationTab } from '@/types'
import { Card } from '../ui/Card'
import { SectionHeader, ViewAllButton } from '../ui/SectionHeader'

const TABS: { id: MedicationTab; label: string }[] = [
  { id: 'today', label: 'Today' },
  { id: 'tomorrow', label: 'Tomorrow' },
  { id: 'week', label: 'This Week' },
]

interface MedicationReminderProps {
  medications: Medication[]
  onDoseChange?: (id: string, state: DoseState) => void
  onViewAll?: () => void
}

const SCHEDULED_LABEL: Record<MedicationTab, string> = {
  today: 'doses taken today',
  tomorrow: 'doses scheduled tomorrow',
  week: 'doses scheduled this week',
}

export function MedicationReminder({ medications, onDoseChange, onViewAll }: MedicationReminderProps) {
  const [tab, setTab] = useState<MedicationTab>('today')
  const [doses, setDoses] = useState<Record<string, DoseState>>({})

  const setDose = (id: string, state: DoseState) => {
    setDoses((prev) => ({ ...prev, [id]: state }))
    onDoseChange?.(id, state)
  }

  const taken = useMemo(() => medications.filter((m) => doses[m.id] === 'taken').length, [medications, doses])

  return (
    <Card as="section" aria-label="Medication Reminder" className="px-[19px] pt-[17px] pb-[14px] 2xl:h-[350px]">
      <SectionHeader size={16.5} title="Medication Reminder" action={<ViewAllButton onClick={onViewAll} />} />

      <div role="tablist" aria-label="Schedule range" className="mt-[6px] grid grid-cols-3 rounded-[12px] border border-brand-100 bg-[#e8f6f8] p-[4px]">
        {TABS.map(({ id, label }) => (
          <button
            key={id}
            role="tab"
            type="button"
            aria-selected={tab === id}
            aria-controls="medication-panel"
            onClick={() => setTab(id)}
            className={cn(
              'h-[25px] rounded-[9px] text-[12px] font-semibold transition',
              tab === id ? 'bg-linear-to-r from-brand-600 to-brand-700 text-white shadow-soft' : 'text-ink/75',
            )}
          >
            {label}
          </button>
        ))}
      </div>

      <DoseArc
        medications={medications}
        doses={tab === 'today' ? doses : {}}
        taken={tab === 'today' ? taken : 0}
        tab={tab}
      />

      <ul id="medication-panel" role="tabpanel" aria-label={TABS.find((t) => t.id === tab)?.label} className="mt-[10px] flex flex-col gap-[8px]">
        {medications.map((med) => (
          <MedicationRow
            key={med.id}
            med={med}
            state={doses[med.id] ?? 'pending'}
            onChange={setDose}
            readOnly={tab !== 'today'}
          />
        ))}
      </ul>
    </Card>
  )
}

/* ------------------------------------------------------------------ */

const W = 354
const CX = W / 2
const R = 300
const TOP = 30
const SPAN = 359

const pointAt = (t: number) => {
  const dx = (t - 0.5) * SPAN
  return { x: CX + dx, y: TOP + R - Math.sqrt(R * R - dx * dx) }
}

const RINGS = ['#0b9bb6', '#f59e0b', '#6e45d6']

const TIME_TONES = ['bg-[#d3e8f4] text-[#1c4d6b]', 'bg-[#fbe7a1] text-[#6b4f08]', 'bg-[#dcd2f8] text-[#43309b]']

function DoseArc({
  medications,
  doses,
  taken,
  tab,
}: {
  medications: Medication[]
  doses: Record<string, DoseState>
  taken: number
  tab: MedicationTab
}) {
  const scheduled = medications.length * (tab === 'week' ? 7 : 1)
  const gradientId = useId()
  const a = pointAt(0.5 - 0.5 * 0.9)
  const b = pointAt(0.5 + 0.5 * 0.9)

  return (
    <div className="relative mt-[9px] h-[92px] w-full" aria-hidden={false}>
      <svg
        viewBox={`0 0 ${W} 92`}
        className="size-full overflow-visible"
        role="img"
        aria-label={tab === 'today' ? `${taken} of ${medications.length} doses taken today` : `${scheduled} ${SCHEDULED_LABEL[tab]}`}
      >
        <defs>
          <linearGradient id={gradientId} x1={a.x} y1="0" x2={b.x} y2="0" gradientUnits="userSpaceOnUse">
            <stop stopColor="#f6c453" />
            <stop offset="0.3" stopColor="#8fcf8a" />
            <stop offset="0.5" stopColor="#17a2c4" />
            <stop offset="0.78" stopColor="#3a6fd0" />
            <stop offset="1" stopColor="#6e45d6" />
          </linearGradient>
        </defs>

        <path
          d={`M${a.x} ${a.y} A${R} ${R} 0 0 1 ${b.x} ${b.y}`}
          fill="none"
          stroke={`url(#${gradientId})`}
          strokeWidth="11"
          strokeLinecap="round"
        />

        {medications.map((med, idx) => {
          const { x, y } = pointAt(med.arcPosition)
          const ring = RINGS[idx % RINGS.length]
          const done = doses[med.id] === 'taken'
          return (
            <g key={med.id}>
              <circle cx={x} cy={y} r="10" fill="white" stroke={ring} strokeWidth="3" />
              <circle cx={x} cy={y} r="4" fill={ring} opacity={done ? 1 : 0.9} />
              <foreignObject x={x - 30} y={y - 34} width="60" height="18">
                <span className="mx-auto block w-fit rounded-[5px] bg-white px-1.5 text-[8.5px] leading-[15px] font-semibold shadow-[0_1px_4px_rgb(16_60_90/0.2)] whitespace-nowrap text-ink">
                  {med.time.replace(/^0/, '').replace(' ', ' ').toUpperCase()}
                </span>
              </foreignObject>
            </g>
          )
        })}
      </svg>

      <Sun size={16} className="absolute bottom-[8px] left-[0px] text-amber-400" aria-hidden />
      <Moon size={14} className="absolute right-[0px] bottom-[10px] text-indigo-700" aria-hidden />

      <div className="absolute inset-x-0 top-[42px] text-center">
        <p className="text-[17px] leading-none font-bold">
          {tab === 'today' ? taken : scheduled}
          {tab === 'today' && <span className="text-[13px] font-medium text-muted">/{medications.length}</span>}
        </p>
        <p className="mt-[3px] text-[9.5px] leading-none text-muted">{SCHEDULED_LABEL[tab]}</p>
      </div>
    </div>
  )
}

function MedicationRow({
  med,
  state,
  onChange,
  readOnly,
}: {
  med: Medication
  state: DoseState
  onChange: (id: string, state: DoseState) => void
  readOnly: boolean
}) {
  const resolved = state !== 'pending'
  const tone = TIME_TONES[Math.min(Math.floor(med.arcPosition * 3), 2)]

  return (
    <li className="flex h-[43px] items-center justify-between rounded-[13px] border border-slate-200/70 bg-white px-[13px] shadow-[0_1px_4px_rgb(16_90_120/0.08)]">
      <div className="min-w-0">
        <p className="text-[13px] leading-none font-bold">{med.name}</p>
        <p className="mt-[5px] flex items-center gap-1.5 text-[10px] leading-none text-ink/80">
          {med.dose}
          <span className={cn('inline-flex items-center gap-1 rounded-full px-[6px] py-[2px] text-[9px] font-bold', tone)}>
            <Clock size={8} aria-hidden />
            {med.time.toUpperCase()}
          </span>
        </p>
      </div>

      {readOnly ? (
        <span className="rounded-full bg-slate-100 px-3 py-1.5 text-[11px] font-semibold text-slate-500">Scheduled</span>
      ) : resolved ? (
        <button
          type="button"
          onClick={() => onChange(med.id, 'pending')}
          className={cn(
            'rounded-full px-3 py-1.5 text-[11px] font-semibold',
            state === 'taken' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-500',
          )}
          aria-label={`Undo ${state} for ${med.name}`}
        >
          {state === 'taken' ? '✓ Taken' : 'Skipped'}
        </button>
      ) : (
        <div className="flex items-center gap-[7px]">
          <button
            type="button"
            onClick={() => onChange(med.id, 'taken')}
            className="h-[26px] w-[45px] rounded-full bg-linear-to-r from-brand-500 to-brand-600 text-[11px] font-semibold text-white shadow-soft transition hover:brightness-110"
          >
            Take
          </button>
          <button
            type="button"
            onClick={() => onChange(med.id, 'skipped')}
            className="h-[26px] w-[45px] rounded-full border border-slate-200 bg-white text-[11px] font-medium text-ink transition hover:bg-slate-50"
          >
            Skip
          </button>
        </div>
      )}
    </li>
  )
}
