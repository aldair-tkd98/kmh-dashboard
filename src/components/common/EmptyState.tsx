interface EmptyStateProps {
  onResetFilters: () => void
}

export function EmptyState({ onResetFilters }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center gap-4 rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-400">
        <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden="true">
          <path
            d="M11 4a7 7 0 1 0 4.906 12.02l4.037 4.038a1 1 0 0 0 1.414-1.415l-4.037-4.037A7 7 0 0 0 11 4Z"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <div className="space-y-1">
        <p className="font-display text-lg font-semibold text-slate-800">Sin resultados</p>
        <p className="max-w-sm text-sm text-slate-500">
          Ningún alumno coincide con los filtros aplicados. Ajusta la búsqueda o restablece los filtros.
        </p>
      </div>
      <button
        type="button"
        onClick={onResetFilters}
        className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-400"
      >
        Restablecer filtros
      </button>
    </div>
  )
}
