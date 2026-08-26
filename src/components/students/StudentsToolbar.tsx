import type { StatusFilterValue } from '@/hooks/useStudentFilters'

interface StudentsToolbarProps {
  searchTerm: string
  statusFilter: StatusFilterValue
  beltFilter: string
  availableBelts: string[]
  resultCount: number
  onSearchTermChange: (value: string) => void
  onStatusFilterChange: (value: StatusFilterValue) => void
  onBeltFilterChange: (value: string) => void
}

export function StudentsToolbar({
  searchTerm,
  statusFilter,
  beltFilter,
  availableBelts,
  resultCount,
  onSearchTermChange,
  onStatusFilterChange,
  onBeltFilterChange,
}: StudentsToolbarProps) {
  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center">
      <div className="relative flex-1">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
          aria-hidden="true"
        >
          <path
            d="m21 21-4.3-4.3M19 11a8 8 0 1 1-16 0 8 8 0 0 1 16 0Z"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <input
          type="search"
          value={searchTerm}
          onChange={(event) => onSearchTermChange(event.target.value)}
          placeholder="Buscar por nombre, DNI o institución…"
          aria-label="Buscar alumnos"
          className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2.5 pl-9 pr-3 text-sm text-slate-800 placeholder:text-slate-400 focus:border-brand-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-100"
        />
      </div>

      <div className="flex gap-3">
        <select
          value={statusFilter}
          onChange={(event) => onStatusFilterChange(event.target.value as StatusFilterValue)}
          aria-label="Filtrar por estado"
          className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-700 focus:border-brand-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-100"
        >
          <option value="todos">Todos los estados</option>
          <option value="Activo">Activos</option>
          <option value="Inactivo">Inactivos</option>
        </select>

        <select
          value={beltFilter}
          onChange={(event) => onBeltFilterChange(event.target.value)}
          aria-label="Filtrar por cinturón"
          className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-700 focus:border-brand-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-100"
        >
          <option value="todos">Todos los cinturones</option>
          <option value="sin-asignar">Sin asignar</option>
          {availableBelts.map((belt) => (
            <option key={belt} value={belt}>
              {belt}
            </option>
          ))}
        </select>
      </div>

      <p className="whitespace-nowrap text-sm text-slate-500 sm:pl-2">
        <span className="font-semibold text-slate-800">{resultCount}</span> alumno{resultCount === 1 ? '' : 's'}
      </p>
    </div>
  )
}
