import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

type Tone = 'success' | 'warning' | 'brand' | 'neutral'

const TONES: Record<Tone, string> = {
  success: 'bg-emerald-50 text-emerald-600',
  warning: 'bg-amber-50 text-amber-600',
  brand: 'bg-brand-50 text-brand-600',
  neutral: 'bg-slate-100 text-slate-600',
}

interface BadgeProps {
  tone?: Tone
  className?: string
  children: ReactNode
}

export function Badge({ tone = 'success', className, children }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-3 py-1 text-[11px] font-semibold leading-none',
        TONES[tone],
        className,
      )}
    >
      {children}
    </span>
  )
}
