interface HeaderProps {
  lastUpdatedAt: Date | null
  isLoading: boolean
  onRefresh: () => void
}

function formatUpdatedAt(date: Date | null): string {
  if (!date) return 'Sin datos aún'
  return new Intl.DateTimeFormat('es-PE', { hour: '2-digit', minute: '2-digit' }).format(date)
}

export function Header({ lastUpdatedAt, isLoading, onRefresh }: HeaderProps) {
  return (
    <header className="bg-gradient-to-br from-slate-900 via-slate-900 to-brand-900">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-600/90 shadow-lg shadow-brand-900/40">
            <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6 text-white" aria-hidden="true">
              <path
                d="m12 2 2.4 5.5L20 8.6l-4.2 4 1.2 6.1L12 15.9 6.9 18.7l1.2-6.1L4 8.6l5.6-1.1L12 2Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div>
            <p className="font-display text-xl font-bold tracking-tight text-white sm:text-2xl">
              Registro de Alumnos
            </p>
            <p className="text-sm text-slate-300">Academia Kumiho · Panel de afiliados</p>
          </div>
        </div>

        <div className="flex items-center gap-3 self-start sm:self-auto">
          <p className="text-xs text-slate-300">
            Actualizado <span className="font-medium text-slate-100">{formatUpdatedAt(lastUpdatedAt)}</span>
          </p>
          <button
            type="button"
            onClick={onRefresh}
            disabled={isLoading}
            className="inline-flex items-center gap-2 rounded-lg bg-white/10 px-3 py-2 text-sm font-medium text-white transition hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white disabled:cursor-not-allowed disabled:opacity-60"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`}
              aria-hidden="true"
            >
              <path
                d="M4 4v5h5M20 20v-5h-5M4.5 9a7.5 7.5 0 0 1 13-4.5L20 7M19.5 15a7.5 7.5 0 0 1-13 4.5L4 17"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Actualizar
          </button>
        </div>
      </div>
    </header>
  )
}
