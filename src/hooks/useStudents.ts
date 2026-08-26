import { useCallback, useEffect, useRef, useState } from 'react'
import type { Student } from '@/types/student'
import { googleSheetsStudentsRepository, type StudentsRepository } from '@/services/studentsRepository'

export interface UseStudentsResult {
  students: Student[]
  isLoading: boolean
  error: string | null
  lastUpdatedAt: Date | null
  refetch: () => void
}

export function useStudents(
  repository: StudentsRepository = googleSheetsStudentsRepository
): UseStudentsResult {
  const [students, setStudents] = useState<Student[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [lastUpdatedAt, setLastUpdatedAt] = useState<Date | null>(null)
  const [refetchToken, setRefetchToken] = useState(0)
  const abortControllerRef = useRef<AbortController | null>(null)

  useEffect(() => {
    abortControllerRef.current?.abort()
    const controller = new AbortController()
    abortControllerRef.current = controller

    setIsLoading(true)
    setError(null)

    repository
      .fetchAll(controller.signal)
      .then((fetchedStudents) => {
        setStudents(fetchedStudents)
        setLastUpdatedAt(new Date())
      })
      .catch((fetchError: unknown) => {
        if (controller.signal.aborted) return
        const message =
          fetchError instanceof Error
            ? fetchError.message
            : 'Ocurrió un error inesperado al cargar los alumnos.'
        setError(message)
      })
      .finally(() => {
        if (!controller.signal.aborted) {
          setIsLoading(false)
        }
      })

    return () => controller.abort()
  }, [repository, refetchToken])

  const refetch = useCallback(() => {
    setRefetchToken((token) => token + 1)
  }, [])

  return { students, isLoading, error, lastUpdatedAt, refetch }
}
