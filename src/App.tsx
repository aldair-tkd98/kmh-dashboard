import { useMemo } from 'react'
import { useStudents } from '@/hooks/useStudents'
import { useStudentFilters } from '@/hooks/useStudentFilters'
import { computeStudentsSummary } from '@/utils/studentStats'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { StatsOverview } from '@/components/stats/StatsOverview'
import { StudentsToolbar } from '@/components/students/StudentsToolbar'
import { StudentsGrid } from '@/components/students/StudentsGrid'
import { LoadingState } from '@/components/common/LoadingState'
import { ErrorState } from '@/components/common/ErrorState'
import { EmptyState } from '@/components/common/EmptyState'

function App() {
  const { students, isLoading, error, lastUpdatedAt, refetch } = useStudents()
  const filters = useStudentFilters(students)
  const summary = useMemo(() => computeStudentsSummary(students), [students])

  const hasStudents = students.length > 0
  const hasFilteredResults = filters.filteredStudents.length > 0

  return (
    <div className="min-h-screen bg-slate-50">
      <Header lastUpdatedAt={lastUpdatedAt} isLoading={isLoading} onRefresh={refetch} />

      <main className="mx-auto max-w-6xl space-y-6 px-4 py-8 sm:px-6 lg:px-8">
        {error && !isLoading && <ErrorState message={error} onRetry={refetch} />}

        {isLoading && !hasStudents && <LoadingState />}

        {!error && hasStudents && (
          <>
            <StatsOverview summary={summary} />

            <StudentsToolbar
              searchTerm={filters.searchTerm}
              statusFilter={filters.statusFilter}
              beltFilter={filters.beltFilter}
              availableBelts={filters.availableBelts}
              resultCount={filters.filteredStudents.length}
              onSearchTermChange={filters.setSearchTerm}
              onStatusFilterChange={filters.setStatusFilter}
              onBeltFilterChange={filters.setBeltFilter}
            />

            {hasFilteredResults ? (
              <StudentsGrid students={filters.filteredStudents} />
            ) : (
              <EmptyState onResetFilters={filters.resetFilters} />
            )}
          </>
        )}
      </main>

      <Footer />
    </div>
  )
}

export default App
