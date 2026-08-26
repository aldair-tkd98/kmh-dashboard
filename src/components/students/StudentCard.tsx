import type { CSSProperties } from 'react'
import type { Student } from '@/types/student'
import { Avatar } from '@/components/common/Avatar'
import { Badge } from '@/components/common/Badge'
import { resolveBelt } from '@/constants/belts'
import { BeltSwatch } from '@/components/students/BeltSwatch'

interface StudentCardProps {
  student: Student
}

interface ViewTransitionStyle extends CSSProperties {
  viewTransitionName?: string
}

export function StudentCard({ student }: StudentCardProps) {
  const belt = resolveBelt(student.belt)
  const cardStyle: ViewTransitionStyle = { viewTransitionName: `student-card-${student.id}` }

  return (
    <article
      style={cardStyle}
      className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
    >
      <div className="flex items-start gap-3">
        <Avatar fullName={student.fullName} photoUrl={student.photoUrl} />
        <div className="min-w-0 flex-1">
          <p className="truncate font-display font-semibold text-slate-900">{student.fullName || 'Sin nombre'}</p>
          <p className="text-xs text-slate-500">DNI {student.documentId || '—'}</p>
        </div>
        <Badge tone={student.status === 'Activo' ? 'success' : 'neutral'}>
          {student.status ?? 'Sin estado'}
        </Badge>
      </div>

      <dl className="grid grid-cols-2 gap-y-2 text-sm">
        <dt className="text-slate-400">Institución</dt>
        <dd className="truncate text-right text-slate-700">{student.institution || '—'}</dd>

        <dt className="text-slate-400">Edad</dt>
        <dd className="text-right text-slate-700">{student.age ?? '—'} años</dd>

        <dt className="text-slate-400">Sexo</dt>
        <dd className="text-right text-slate-700">{student.sex ?? '—'}</dd>
      </dl>

      <div className="flex items-center justify-between gap-3 border-t border-slate-100 pt-3">
        {belt ? (
          <span className="inline-flex min-w-0 items-center gap-2 text-sm font-medium text-slate-700">
            <BeltSwatch base={belt.base} tip={belt.tip} />
            <span className="truncate">Cinturón {belt.label}</span>
          </span>
        ) : (
          <span className="text-sm text-slate-400">Cinturón sin asignar</span>
        )}
        {student.degree && <span className="shrink-0 text-xs text-slate-400">{student.degree}</span>}
      </div>
    </article>
  )
}
