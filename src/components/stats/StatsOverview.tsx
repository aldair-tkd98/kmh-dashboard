import type { StudentsSummary } from '@/types/student'
import { StatCard } from '@/components/stats/StatCard'

interface StatsOverviewProps {
  summary: StudentsSummary
}

export function StatsOverview({ summary }: StatsOverviewProps) {
  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      <StatCard
        label="Alumnos totales"
        value={summary.total}
        accentClassName="bg-brand-50 text-brand-600"
        icon={
          <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
            <path
              d="M17 20v-1a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v1M23 20v-1a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75M9.5 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        }
      />
      <StatCard
        label="Activos"
        value={summary.active}
        accentClassName="bg-emerald-50 text-emerald-600"
        icon={
          <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
            <path
              d="m9 12 2 2 4-4M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        }
      />
      <StatCard
        label="Inactivos"
        value={summary.inactive}
        accentClassName="bg-slate-100 text-slate-500"
        icon={
          <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
            <path
              d="M10 9v6M14 9v6M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        }
      />
      <StatCard
        label="Edad promedio"
        value={summary.averageAge ?? '—'}
        accentClassName="bg-amber-50 text-amber-600"
        icon={
          <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
            <path
              d="M12 8v4l3 2M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        }
      />
    </div>
  )
}
