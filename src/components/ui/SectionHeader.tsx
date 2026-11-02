import { ChevronRight } from 'lucide-react'
import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

interface SectionHeaderProps {
  title: string
  action?: ReactNode
  className?: string
  /** Title font size in px. */
  size?: number
}

/** Title with the teal accent bar used by the lower dashboard cards. */
export function SectionHeader({ title, action, className, size = 15.5 }: SectionHeaderProps) {
  return (
    <div className={cn('flex items-center justify-between gap-3', className)}>
      <h2 className="flex items-center gap-[8px] font-semibold text-ink" style={{ fontSize: size }}>
        <span aria-hidden className="h-[17px] w-[3px] rounded-full bg-brand-600" />
        {title}
      </h2>
      {action}
    </div>
  )
}

interface ViewAllButtonProps {
  label?: string
  onClick?: () => void
  className?: string
}

export function ViewAllButton({ label = 'View All', onClick, className }: ViewAllButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'inline-flex h-[26px] items-center gap-1 rounded-full border border-brand-200 bg-[#e3f3f8] px-[13px] text-[10.5px] font-bold text-brand-700 shadow-[0_2px_6px_-2px_rgb(11_155_182/0.35)]',
        'transition hover:bg-brand-100',
        className,
      )}
    >
      {label}
      <ChevronRight size={10} aria-hidden />
    </button>
  )
}
