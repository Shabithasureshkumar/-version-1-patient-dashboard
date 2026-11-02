import { useState } from 'react'
import { cn } from '@/lib/cn'

interface AvatarProps {
  name: string
  src?: string
  size?: number
  className?: string
}

const GRADIENTS = [
  'from-brand-400 to-brand-700',
  'from-sky-400 to-indigo-600',
  'from-teal-400 to-emerald-600',
  'from-cyan-400 to-blue-600',
]

const initials = (name: string): string =>
  name
    .replace(/^Dr\.?\s+/i, '')
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('')

/** Photo avatar with a deterministic initials fallback. */
export function Avatar({ name, src, size = 40, className }: AvatarProps) {
  const gradient = GRADIENTS[name.length % GRADIENTS.length]
  const [failedSrc, setFailedSrc] = useState<string>()

  if (src && src !== failedSrc) {
    return (
      <img
        src={src}
        onError={() => setFailedSrc(src)}
        alt={name}
        width={size}
        height={size}
        className={cn('shrink-0 rounded-full object-cover ring-2 ring-white', className)}
        style={{ width: size, height: size }}
      />
    )
  }

  return (
    <span
      role="img"
      aria-label={name}
      className={cn(
        'inline-flex shrink-0 items-center justify-center rounded-full bg-linear-to-br font-bold text-white ring-2 ring-white',
        gradient,
        className,
      )}
      style={{ width: size, height: size, fontSize: size * 0.34 }}
    >
      {initials(name)}
    </span>
  )
}
