import clsx, { type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/** Conditional class-name helper that resolves conflicting Tailwind utilities. */
export const cn = (...inputs: ClassValue[]): string => twMerge(clsx(inputs))
