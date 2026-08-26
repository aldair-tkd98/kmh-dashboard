import { render, screen } from '@testing-library/react'
import { describe, expect, test } from 'vitest'
import type { Student } from '@/types/student'
import { StudentCard } from '@/components/students/StudentCard'

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

describe('StudentCard', () => {
  test('renders the student name, document id, institution, and belt', () => {
    render(<StudentCard student={buildStudent()} />)

    expect(screen.getByText('Ana Mozo Tairo')).toBeInTheDocument()
    expect(screen.getByText('DNI 11111111')).toBeInTheDocument()
    expect(screen.getByText('EO-PNP')).toBeInTheDocument()
    expect(screen.getByText('Cinturón Amarillo')).toBeInTheDocument()
  })

  test('shows an "unassigned belt" message when the student has no belt', () => {
    render(<StudentCard student={buildStudent({ belt: null })} />)
    expect(screen.getByText('Cinturón sin asignar')).toBeInTheDocument()
  })

  test('shows the inactive status badge for inactive students', () => {
    render(<StudentCard student={buildStudent({ status: 'Inactivo' })} />)
    expect(screen.getByText('Inactivo')).toBeInTheDocument()
  })

  test('shows the full compound belt name (base + tip) for half-ranks like "Blanco Punta Amarilla"', () => {
    render(<StudentCard student={buildStudent({ belt: 'Blanco Punta Amarilla' })} />)
    expect(screen.getByText('Cinturón Blanco Punta Amarilla')).toBeInTheDocument()
  })
})
