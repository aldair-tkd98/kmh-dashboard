import { STUDENTS_CSV_URL } from '@/config/sheet'
import type { Student } from '@/types/student'
import { parseStudentsCsv } from '@/services/csvParser'
import { mapRawRecordsToStudents } from '@/services/studentMapper'

export class StudentsFetchError extends Error {
  readonly cause?: unknown

  constructor(message: string, cause?: unknown) {
    super(message)
    this.cause = cause
    this.name = 'StudentsFetchError'
  }
}

export interface StudentsRepository {
  fetchAll(signal?: AbortSignal): Promise<Student[]>
}

async function fetchCsvText(url: string, signal?: AbortSignal): Promise<string> {
  let response: Response
  try {
    response = await fetch(url, { signal, cache: 'no-store' })
  } catch (error) {
    throw new StudentsFetchError('No se pudo conectar con la hoja de cálculo de alumnos.', error)
  }

  if (!response.ok) {
    throw new StudentsFetchError(
      `La hoja de cálculo respondió con un error (HTTP ${response.status}).`
    )
  }

  return response.text()
}

export const googleSheetsStudentsRepository: StudentsRepository = {
  async fetchAll(signal) {
    const csvText = await fetchCsvText(STUDENTS_CSV_URL, signal)
    const rawRecords = parseStudentsCsv(csvText)
    return mapRawRecordsToStudents(rawRecords)
  },
}
