import { render, screen } from '@testing-library/react'
import { describe, expect, test } from 'vitest'
import type { StudentsSummary } from '@/types/student'
import { StatsOverview } from '@/components/stats/StatsOverview'

const SUMMARY: StudentsSummary = {
  total: 5,
  active: 4,
  inactive: 1,
  bySex: { Masculino: 3, Femenino: 2 },
  byBelt: { Amarillo: 2, 'Sin asignar': 3 },
  byInstitution: { 'EO-PNP': 5 },
  averageAge: 21.5,
}

describe('StatsOverview', () => {
  test('renders total, active, inactive, and average age figures', () => {
    render(<StatsOverview summary={SUMMARY} />)

    expect(screen.getByText('5')).toBeInTheDocument()
    expect(screen.getByText('4')).toBeInTheDocument()
    expect(screen.getByText('1')).toBeInTheDocument()
    expect(screen.getByText('21.5')).toBeInTheDocument()
  })

  test('renders a placeholder when average age is unknown', () => {
    render(<StatsOverview summary={{ ...SUMMARY, averageAge: null }} />)
    expect(screen.getByText('—')).toBeInTheDocument()
  })
})
