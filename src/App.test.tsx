import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, test, vi } from 'vitest'
import type { Student } from '@/types/student'
import { useStudents } from '@/hooks/useStudents'
import App from '@/App'

vi.mock('@/hooks/useStudents')

const mockedUseStudents = vi.mocked(useStudents)

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

describe('App', () => {
  beforeEach(() => {
    mockedUseStudents.mockReset()
  })

  test('shows the loading skeleton while students are being fetched for the first time', () => {
    mockedUseStudents.mockReturnValue({
      students: [],
      isLoading: true,
      error: null,
      lastUpdatedAt: null,
      refetch: vi.fn(),
    })

    render(<App />)
    expect(screen.getByRole('status')).toBeInTheDocument()
  })

  test('shows an error state with a retry action when loading fails', async () => {
    const refetch = vi.fn()
    mockedUseStudents.mockReturnValue({
      students: [],
      isLoading: false,
      error: 'No se pudo conectar con la hoja de cálculo de alumnos.',
      lastUpdatedAt: null,
      refetch,
    })

    render(<App />)
    expect(screen.getByRole('alert')).toHaveTextContent('No se pudo conectar')

    await userEvent.click(screen.getByRole('button', { name: 'Reintentar' }))
    expect(refetch).toHaveBeenCalledTimes(1)
  })

  test('renders stats and student cards once students are loaded', () => {
    mockedUseStudents.mockReturnValue({
      students: [buildStudent()],
      isLoading: false,
      error: null,
      lastUpdatedAt: new Date(),
      refetch: vi.fn(),
    })

    render(<App />)
    expect(screen.getByText('Ana Mozo Tairo')).toBeInTheDocument()
    expect(screen.getByLabelText('Buscar alumnos')).toBeInTheDocument()
  })

  test('shows the empty state when filters exclude every student', async () => {
    mockedUseStudents.mockReturnValue({
      students: [buildStudent({ fullName: 'Ana Mozo Tairo' })],
      isLoading: false,
      error: null,
      lastUpdatedAt: new Date(),
      refetch: vi.fn(),
    })

    render(<App />)
    await userEvent.type(screen.getByLabelText('Buscar alumnos'), 'nombre inexistente')

    expect(await screen.findByText('Sin resultados')).toBeInTheDocument()
  })
})
