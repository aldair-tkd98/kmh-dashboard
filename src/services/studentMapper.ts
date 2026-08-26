import type { EnrollmentStatus, RawStudentRecord, Sex, Student } from '@/types/student'
import { calculateAge, parseFlexibleDate } from '@/utils/dateUtils'

const VALID_SEX_VALUES: Sex[] = ['Masculino', 'Femenino']
const VALID_STATUS_VALUES: EnrollmentStatus[] = ['Activo', 'Inactivo']

function toSex(rawValue: string): Sex | null {
  return VALID_SEX_VALUES.find((value) => value === rawValue) ?? null
}

function toStatus(rawValue: string): EnrollmentStatus | null {
  return VALID_STATUS_VALUES.find((value) => value === rawValue) ?? null
}

function toNullableString(rawValue: string | undefined): string {
  return rawValue?.trim() ?? ''
}

function toOptionalField(rawValue: string | undefined): string | null {
  const trimmed = rawValue?.trim()
  return trimmed ? trimmed : null
}

function buildFullName(firstName: string, lastNamePaternal: string, lastNameMaternal: string): string {
  return [firstName, lastNamePaternal, lastNameMaternal].filter(Boolean).join(' ')
}

export function mapRawRecordToStudent(record: RawStudentRecord): Student {
  const birthDate = parseFlexibleDate(record.FechaNacimiento)
  const fallbackAge = Number.parseInt(record.Edad, 10)

  const firstName = toNullableString(record.Nombres)
  const lastNamePaternal = toNullableString(record.ApellidoPaterno)
  const lastNameMaternal = toNullableString(record.ApellidoMaterno)

  return {
    id: toNullableString(record.AfiliadoID),
    documentId: toNullableString(record.DNI),
    firstName,
    lastNamePaternal,
    lastNameMaternal,
    fullName: buildFullName(firstName, lastNamePaternal, lastNameMaternal),
    sex: toSex(record.Sexo),
    birthDate,
    age: calculateAge(birthDate) ?? (Number.isNaN(fallbackAge) ? null : fallbackAge),
    country: toNullableString(record.Pais),
    countryCode: toNullableString(record.PaisCodigo),
    address: toNullableString(record.Direccion),
    phone: toNullableString(record.Telefono),
    email: toNullableString(record.Correo),
    institution: toNullableString(record.Institucion),
    belt: toOptionalField(record.Cinturon),
    degree: toNullableString(record.Grado),
    status: toStatus(record.Estado),
    notes: toNullableString(record.Observaciones),
    registeredAt: parseFlexibleDate(record.FechaRegistro),
    updatedAt: parseFlexibleDate(record.FechaActualizacion),
    registeredBy: toNullableString(record.UsuarioRegistro),
    photoUrl: toOptionalField(record.FotoURL),
  }
}

export function mapRawRecordsToStudents(records: RawStudentRecord[]): Student[] {
  return records.filter((record) => record.AfiliadoID).map(mapRawRecordToStudent)
}
