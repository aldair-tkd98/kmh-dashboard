import { describe, expect, test } from 'vitest'
import { CsvParseError, parseStudentsCsv } from '@/services/csvParser'

const SAMPLE_CSV = [
  'AfiliadoID,DNI,Nombres,ApellidoPaterno,ApellidoMaterno,Sexo,FechaNacimiento,Edad,Pais,PaisCodigo,Direccion,Telefono,Correo,Institucion,Cinturon,Grado,Estado,Observaciones,FechaRegistro,FechaActualizacion,UsuarioRegistro,FotoURL',
  'AFI-2026-000161,74091417,Carlos Gonzalo,Ortiz,Camones,Masculino,2003-07-26,23,Perú,PER,,,,EO-PNP,,,Activo,,##############,8/4/2026 14:58:52,amrimachi@gmail.com,',
].join('\n')

describe('parseStudentsCsv', () => {
  test('parses CSV text into raw student records using the header row', () => {
    const records = parseStudentsCsv(SAMPLE_CSV)
    expect(records).toHaveLength(1)
    expect(records[0].AfiliadoID).toBe('AFI-2026-000161')
    expect(records[0].Nombres).toBe('Carlos Gonzalo')
  })

  test('trims whitespace from every field', () => {
    const paddedCsv = SAMPLE_CSV.replace('Carlos Gonzalo', '  Carlos Gonzalo  ')
    const records = parseStudentsCsv(paddedCsv)
    expect(records[0].Nombres).toBe('Carlos Gonzalo')
  })

  test('skips blank lines', () => {
    const records = parseStudentsCsv(`${SAMPLE_CSV}\n\n`)
    expect(records).toHaveLength(1)
  })

  test('throws a CsvParseError when the CSV cannot be parsed', () => {
    expect(() => parseStudentsCsv('"unterminated quote')).toThrow(CsvParseError)
  })
})
