export type Sex = 'Masculino' | 'Femenino'

export type EnrollmentStatus = 'Activo' | 'Inactivo'

export interface RawStudentRecord {
  AfiliadoID: string
  DNI: string
  Nombres: string
  ApellidoPaterno: string
  ApellidoMaterno: string
  Sexo: string
  FechaNacimiento: string
  Edad: string
  Pais: string
  PaisCodigo: string
  Direccion: string
  Telefono: string
  Correo: string
  Institucion: string
  Cinturon: string
  Grado: string
  Estado: string
  Observaciones: string
  FechaRegistro: string
  FechaActualizacion: string
  UsuarioRegistro: string
  FotoURL: string
}

export interface Student {
  id: string
  documentId: string
  firstName: string
  lastNamePaternal: string
  lastNameMaternal: string
  fullName: string
  sex: Sex | null
  birthDate: Date | null
  age: number | null
  country: string
  countryCode: string
  address: string
  phone: string
  email: string
  institution: string
  belt: string | null
  degree: string
  status: EnrollmentStatus | null
  notes: string
  registeredAt: Date | null
  updatedAt: Date | null
  registeredBy: string
  photoUrl: string | null
}

export interface StudentsSummary {
  total: number
  active: number
  inactive: number
  bySex: Record<string, number>
  byBelt: Record<string, number>
  byInstitution: Record<string, number>
  averageAge: number | null
}
