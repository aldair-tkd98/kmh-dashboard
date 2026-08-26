import { act, renderHook, waitFor } from '@testing-library/react'
import { describe, expect, test } from 'vitest'
import type { Student } from '@/types/student'
import { useStudentFilters } from '@/hooks/useStudentFilters'

function buildStudent(overrides: Partial<Student> = {}): Student {
  return {
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
    ...overrides,
  }
}

const STUDENTS: Student[] = [
  buildStudent({ id: 'AFI-1', fullName: 'Ana Mozo Tairo', status: 'Activo', belt: 'Amarillo', institution: 'EO-PNP', documentId: '11111111' }),
  buildStudent({ id: 'AFI-2', fullName: 'Carlos Ortiz Camones', status: 'Inactivo', belt: 'Negro', institution: 'Colegio San José', documentId: '22222222' }),
  buildStudent({ id: 'AFI-3', fullName: 'Billy Gomez Salvador', status: 'Activo', belt: null, institution: 'EO-PNP', documentId: '33333333' }),
]

describe('useStudentFilters', () => {
  test('returns all students when no filters are applied', () => {
    const { result } = renderHook(() => useStudentFilters(STUDENTS))
    expect(result.current.filteredStudents).toHaveLength(3)
  })

  test('filters by status', () => {
    const { result } = renderHook(() => useStudentFilters(STUDENTS))
    act(() => result.current.setStatusFilter('Inactivo'))
    expect(result.current.filteredStudents.map((s) => s.id)).toEqual(['AFI-2'])
  })

  test('filters students with no belt assigned via the "sin-asignar" option', () => {
    const { result } = renderHook(() => useStudentFilters(STUDENTS))
    act(() => result.current.setBeltFilter('sin-asignar'))
    expect(result.current.filteredStudents.map((s) => s.id)).toEqual(['AFI-3'])
  })

  test('search matches name, document id, and institution, ignoring accents and case (debounced)', async () => {
    const { result } = renderHook(() => useStudentFilters(STUDENTS))
    act(() => result.current.setSearchTerm('jose'))
    await waitFor(() => {
      expect(result.current.filteredStudents.map((s) => s.id)).toEqual(['AFI-2'])
    })
  })

  test('combines search, status, and belt filters', async () => {
    const { result } = renderHook(() => useStudentFilters(STUDENTS))
    act(() => {
      result.current.setStatusFilter('Activo')
      result.current.setSearchTerm('EO-PNP')
    })
    await waitFor(() => {
      expect(result.current.filteredStudents.map((s) => s.id).sort()).toEqual(['AFI-1', 'AFI-3'])
    })
  })

  test('resetFilters clears search, status, and belt filters', async () => {
    const { result } = renderHook(() => useStudentFilters(STUDENTS))
    act(() => {
      result.current.setStatusFilter('Inactivo')
      result.current.setSearchTerm('carlos')
    })
    await waitFor(() => expect(result.current.filteredStudents).toHaveLength(1))

    act(() => result.current.resetFilters())
    await waitFor(() => expect(result.current.filteredStudents).toHaveLength(3))
    expect(result.current.statusFilter).toBe('todos')
    expect(result.current.beltFilter).toBe('todos')
  })

  test('availableBelts lists unique assigned belts', () => {
    const { result } = renderHook(() => useStudentFilters(STUDENTS))
    expect(result.current.availableBelts).toEqual(['Amarillo', 'Negro'])
  })
})
