import Papa from 'papaparse'
import type { RawStudentRecord } from '@/types/student'

export class CsvParseError extends Error {
  readonly cause?: unknown

  constructor(message: string, cause?: unknown) {
    super(message)
    this.cause = cause
    this.name = 'CsvParseError'
  }
}

export function parseStudentsCsv(csvText: string): RawStudentRecord[] {
  const result = Papa.parse<RawStudentRecord>(csvText, {
    header: true,
    skipEmptyLines: true,
    transform: (value) => value.trim(),
  })

  if (result.errors.length > 0) {
    throw new CsvParseError(
      `Failed to parse students CSV: ${result.errors[0].message}`,
      result.errors
    )
  }

  return result.data
}
