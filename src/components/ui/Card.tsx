import type { ComponentPropsWithoutRef, ElementType } from 'react'
import { cn } from '@/lib/cn'

type CardProps<T extends ElementType> = {
  as?: T
} & ComponentPropsWithoutRef<T>

/** White rounded surface used by every dashboard widget. */
export function Card<T extends ElementType = 'div'>({ as, className, ...rest }: CardProps<T>) {
  const Tag: ElementType = as ?? 'div'
  return <Tag className={cn('rounded-[28px] bg-white shadow-card', className)} {...rest} />
}
