import type { Student, StudentsSummary } from '@/types/student'

function tallyBy<T extends string>(students: Student[], selector: (student: Student) => T | null): Record<string, number> {
  const tally: Record<string, number> = {}
  for (const student of students) {
    const key = selector(student) ?? 'Sin asignar'
    tally[key] = (tally[key] ?? 0) + 1
  }
  return tally
}

export function computeStudentsSummary(students: Student[]): StudentsSummary {
  const activeCount = students.filter((student) => student.status === 'Activo').length
  const inactiveCount = students.filter((student) => student.status === 'Inactivo').length

  const knownAges = students.map((student) => student.age).filter((age): age is number => age !== null)
  const averageAge = knownAges.length > 0
    ? Math.round((knownAges.reduce((sum, age) => sum + age, 0) / knownAges.length) * 10) / 10
    : null

  return {
    total: students.length,
    active: activeCount,
    inactive: inactiveCount,
    bySex: tallyBy(students, (student) => student.sex),
    byBelt: tallyBy(students, (student) => student.belt),
    byInstitution: tallyBy(students, (student) => student.institution || null),
    averageAge,
  }
}
