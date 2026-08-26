import { describe, expect, test } from 'vitest'
import type { RawStudentRecord } from '@/types/student'
import { mapRawRecordsToStudents, mapRawRecordToStudent } from '@/services/studentMapper'

function buildRawRecord(overrides: Partial<RawStudentRecord> = {}): RawStudentRecord {
  return {
    AfiliadoID: 'AFI-2026-000161',
    DNI: '74091417',
    Nombres: 'Carlos Gonzalo',
    ApellidoPaterno: 'Ortiz',
    ApellidoMaterno: 'Camones',
    Sexo: 'Masculino',
    FechaNacimiento: '2003-07-26',
    Edad: '23',
    Pais: 'Perú',
    PaisCodigo: 'PER',
    Direccion: '',
    Telefono: '',
    Correo: '',
    Institucion: 'EO-PNP',
    Cinturon: '',
    Grado: '',
    Estado: 'Activo',
    Observaciones: '',
    FechaRegistro: '##############',
    FechaActualizacion: '8/4/2026 14:58:52',
    UsuarioRegistro: 'amrimachi@gmail.com',
    FotoURL: '',
    ...overrides,
  }
}

describe('mapRawRecordToStudent', () => {
  test('maps identity, contact, and enrollment fields from the raw CSV row', () => {
    const student = mapRawRecordToStudent(buildRawRecord())

    expect(student.id).toBe('AFI-2026-000161')
    expect(student.documentId).toBe('74091417')
    expect(student.fullName).toBe('Carlos Gonzalo Ortiz Camones')
    expect(student.sex).toBe('Masculino')
    expect(student.institution).toBe('EO-PNP')
    expect(student.status).toBe('Activo')
    expect(student.registeredBy).toBe('amrimachi@gmail.com')
  })

  test('derives age from birth date when available', () => {
    const student = mapRawRecordToStudent(buildRawRecord({ FechaNacimiento: '2003-07-26', Edad: '99' }))
    expect(student.age).not.toBeNull()
    expect(student.age).not.toBe(99)
  })

  test('falls back to the Edad column when birth date cannot be parsed', () => {
    const student = mapRawRecordToStudent(buildRawRecord({ FechaNacimiento: '', Edad: '21' }))
    expect(student.age).toBe(21)
  })

  test('treats blank belt as unassigned rather than an empty string', () => {
    const student = mapRawRecordToStudent(buildRawRecord({ Cinturon: '' }))
    expect(student.belt).toBeNull()
  })

  test('treats an unrecognized status value as null instead of passing it through', () => {
    const student = mapRawRecordToStudent(buildRawRecord({ Estado: 'Suspendido' }))
    expect(student.status).toBeNull()
  })

  test('returns null for a spreadsheet overflow date marker', () => {
    const student = mapRawRecordToStudent(buildRawRecord({ FechaRegistro: '##############' }))
    expect(student.registeredAt).toBeNull()
  })
})

describe('mapRawRecordsToStudents', () => {
  test('filters out rows without an affiliate id', () => {
    const students = mapRawRecordsToStudents([
      buildRawRecord(),
      buildRawRecord({ AfiliadoID: '' }),
    ])
    expect(students).toHaveLength(1)
  })
})
