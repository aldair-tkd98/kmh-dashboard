import type { ReactNode } from 'react'

export type BadgeTone = 'neutral' | 'success' | 'danger' | 'brand'

interface BadgeProps {
  children: ReactNode
  tone?: BadgeTone
  dotClassName?: string
}

const TONE_CLASSES: Record<BadgeTone, string> = {
  neutral: 'bg-slate-100 text-slate-700',
  success: 'bg-emerald-100 text-emerald-800',
  danger: 'bg-rose-100 text-rose-800',
  brand: 'bg-brand-100 text-brand-700',
}

export function Badge({ children, tone = 'neutral', dotClassName }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${TONE_CLASSES[tone]}`}
    >
      {dotClassName && <span className={`h-2 w-2 rounded-full ${dotClassName}`} aria-hidden="true" />}
      {children}
    </span>
  )
}
