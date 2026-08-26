import { renderHook, waitFor } from '@testing-library/react'
import { describe, expect, test, vi } from 'vitest'
import type { Student } from '@/types/student'
import type { StudentsRepository } from '@/services/studentsRepository'
import { useStudents } from '@/hooks/useStudents'

const SAMPLE_STUDENT: Student = {
  id: 'AFI-1',
  documentId: '11111111',
  firstName: 'Ana',
  lastNamePaternal: 'Mozo',
  lastNameMaternal: 'Tairo',
  fullName: 'Ana Mozo Tairo',
  sex: 'Femenino',
  birthDate: null,
  age: 20,
  country: 'Perú',
  countryCode: 'PER',
  address: '',
  phone: '',
  email: '',
  institution: 'EO-PNP',
  belt: 'Amarillo',
  degree: '',
  status: 'Activo',
  notes: '',
  registeredAt: null,
  updatedAt: null,
  registeredBy: '',
  photoUrl: null,
}

function buildRepository(overrides: Partial<StudentsRepository> = {}): StudentsRepository {
  return {
    fetchAll: vi.fn().mockResolvedValue([SAMPLE_STUDENT]),
    ...overrides,
  }
}

describe('useStudents', () => {
  test('starts in a loading state with no students', () => {
    const { result } = renderHook(() => useStudents(buildRepository()))
    expect(result.current.isLoading).toBe(true)
    expect(result.current.students).toEqual([])
  })

  test('loads students from the repository and clears the loading state', async () => {
    const { result } = renderHook(() => useStudents(buildRepository()))

    await waitFor(() => expect(result.current.isLoading).toBe(false))

    expect(result.current.students).toEqual([SAMPLE_STUDENT])
    expect(result.current.error).toBeNull()
    expect(result.current.lastUpdatedAt).toBeInstanceOf(Date)
  })

  test('exposes the error message when the repository rejects', async () => {
    const repository = buildRepository({
      fetchAll: vi.fn().mockRejectedValue(new Error('La hoja de cálculo respondió con un error (HTTP 500).')),
    })
    const { result } = renderHook(() => useStudents(repository))

    await waitFor(() => expect(result.current.isLoading).toBe(false))

    expect(result.current.error).toBe('La hoja de cálculo respondió con un error (HTTP 500).')
    expect(result.current.students).toEqual([])
  })

  test('refetch triggers another repository call', async () => {
    const repository = buildRepository()
    const { result } = renderHook(() => useStudents(repository))
    await waitFor(() => expect(result.current.isLoading).toBe(false))

    result.current.refetch()

    await waitFor(() => expect(repository.fetchAll).toHaveBeenCalledTimes(2))
  })
})
