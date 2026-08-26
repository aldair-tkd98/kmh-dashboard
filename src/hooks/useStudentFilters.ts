import { useCallback, useMemo, useState } from 'react'
import type { Student } from '@/types/student'
import { useDebouncedValue } from '@/hooks/useDebouncedValue'
import { normalizeForSearch } from '@/utils/stringUtils'
import { withViewTransition } from '@/utils/viewTransition'

export type StatusFilterValue = 'todos' | 'Activo' | 'Inactivo'

export interface StudentFiltersState {
  searchTerm: string
  statusFilter: StatusFilterValue
  beltFilter: string
}

export interface UseStudentFiltersResult extends StudentFiltersState {
  filteredStudents: Student[]
  availableBelts: string[]
  setSearchTerm: (value: string) => void
  setStatusFilter: (value: StatusFilterValue) => void
  setBeltFilter: (value: string) => void
  resetFilters: () => void
}

const SEARCH_DEBOUNCE_MS = 250
const ALL_BELTS_VALUE = 'todos'

function matchesSearch(student: Student, normalizedSearchTerm: string): boolean {
  if (!normalizedSearchTerm) return true
  const haystack = normalizeForSearch(
    `${student.fullName} ${student.documentId} ${student.institution}`
  )
  return haystack.includes(normalizedSearchTerm)
}

function matchesStatus(student: Student, statusFilter: StatusFilterValue): boolean {
  return statusFilter === 'todos' || student.status === statusFilter
}

function matchesBelt(student: Student, beltFilter: string): boolean {
  if (beltFilter === ALL_BELTS_VALUE) return true
  if (beltFilter === 'sin-asignar') return !student.belt
  return student.belt === beltFilter
}

export function useStudentFilters(students: Student[]): UseStudentFiltersResult {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilterState] = useState<StatusFilterValue>('todos')
  const [beltFilter, setBeltFilterState] = useState(ALL_BELTS_VALUE)

  const debouncedSearchTerm = useDebouncedValue(searchTerm, SEARCH_DEBOUNCE_MS)

  const availableBelts = useMemo(() => {
    const belts = new Set(students.map((student) => student.belt).filter((belt): belt is string => Boolean(belt)))
    return Array.from(belts).sort()
  }, [students])

  const filteredStudents = useMemo(() => {
    const normalizedSearchTerm = normalizeForSearch(debouncedSearchTerm)
    return students.filter(
      (student) =>
        matchesSearch(student, normalizedSearchTerm) &&
        matchesStatus(student, statusFilter) &&
        matchesBelt(student, beltFilter)
    )
  }, [students, debouncedSearchTerm, statusFilter, beltFilter])

  const setStatusFilter = useCallback((value: StatusFilterValue) => {
    withViewTransition(() => setStatusFilterState(value))
  }, [])

  const setBeltFilter = useCallback((value: string) => {
    withViewTransition(() => setBeltFilterState(value))
  }, [])

  const resetFilters = useCallback(() => {
    withViewTransition(() => {
      setSearchTerm('')
      setStatusFilterState('todos')
      setBeltFilterState(ALL_BELTS_VALUE)
    })
  }, [])

  return {
    searchTerm,
    statusFilter,
    beltFilter,
    filteredStudents,
    availableBelts,
    setSearchTerm,
    setStatusFilter,
    setBeltFilter,
    resetFilters,
  }
}
