import { describe, expect, test } from 'vitest'
import type { Student } from '@/types/student'
import { computeStudentsSummary } from '@/utils/studentStats'

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

describe('computeStudentsSummary', () => {
  test('counts totals and status breakdown', () => {
    const summary = computeStudentsSummary([
      buildStudent({ status: 'Activo' }),
      buildStudent({ status: 'Activo' }),
      buildStudent({ status: 'Inactivo' }),
    ])
    expect(summary.total).toBe(3)
    expect(summary.active).toBe(2)
    expect(summary.inactive).toBe(1)
  })

  test('groups students by sex and belt, using "Sin asignar" for missing belts', () => {
    const summary = computeStudentsSummary([
      buildStudent({ sex: 'Femenino', belt: 'Amarillo' }),
      buildStudent({ sex: 'Masculino', belt: null }),
    ])
    expect(summary.bySex).toEqual({ Femenino: 1, Masculino: 1 })
    expect(summary.byBelt).toEqual({ Amarillo: 1, 'Sin asignar': 1 })
  })

  test('computes the average age rounded to one decimal, ignoring unknown ages', () => {
    const summary = computeStudentsSummary([
      buildStudent({ age: 20 }),
      buildStudent({ age: 21 }),
      buildStudent({ age: null }),
    ])
    expect(summary.averageAge).toBe(20.5)
  })

  test('returns null average age when no student has a known age', () => {
    const summary = computeStudentsSummary([buildStudent({ age: null })])
    expect(summary.averageAge).toBeNull()
  })

  test('returns zeroed summary for an empty list', () => {
    const summary = computeStudentsSummary([])
    expect(summary.total).toBe(0)
    expect(summary.averageAge).toBeNull()
  })
})
