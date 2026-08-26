import { afterEach, describe, expect, test, vi } from 'vitest'
import { googleSheetsStudentsRepository, StudentsFetchError } from '@/services/studentsRepository'

const SAMPLE_CSV = [
  'AfiliadoID,DNI,Nombres,ApellidoPaterno,ApellidoMaterno,Sexo,FechaNacimiento,Edad,Pais,PaisCodigo,Direccion,Telefono,Correo,Institucion,Cinturon,Grado,Estado,Observaciones,FechaRegistro,FechaActualizacion,UsuarioRegistro,FotoURL',
  'AFI-2026-000161,74091417,Carlos Gonzalo,Ortiz,Camones,Masculino,2003-07-26,23,Perú,PER,,,,EO-PNP,,,Activo,,##############,8/4/2026 14:58:52,amrimachi@gmail.com,',
].join('\n')

describe('googleSheetsStudentsRepository', () => {
  afterEach(() => {
    vi.unstubAllGlobals()
  })

  test('fetches, parses, and maps CSV rows into students', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        status: 200,
        text: () => Promise.resolve(SAMPLE_CSV),
      })
    )

    const students = await googleSheetsStudentsRepository.fetchAll()

    expect(students).toHaveLength(1)
    expect(students[0].fullName).toBe('Carlos Gonzalo Ortiz Camones')
  })

  test('throws StudentsFetchError when the response is not ok', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({ ok: false, status: 500, text: () => Promise.resolve('') })
    )

    await expect(googleSheetsStudentsRepository.fetchAll()).rejects.toBeInstanceOf(StudentsFetchError)
  })

  test('throws StudentsFetchError when the network request fails', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new TypeError('Failed to fetch')))

    await expect(googleSheetsStudentsRepository.fetchAll()).rejects.toBeInstanceOf(StudentsFetchError)
  })
})
