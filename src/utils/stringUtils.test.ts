import { describe, expect, test } from 'vitest'
import { getInitials, normalizeForSearch } from '@/utils/stringUtils'

describe('normalizeForSearch', () => {
  test('lowercases and trims the value', () => {
    expect(normalizeForSearch('  Carlos GONZALO  ')).toBe('carlos gonzalo')
  })

  test('strips accents so search is diacritic-insensitive', () => {
    expect(normalizeForSearch('Perú')).toBe('peru')
    expect(normalizeForSearch('José Andrés')).toBe('jose andres')
  })
})

describe('getInitials', () => {
  test('returns first and last name initials', () => {
    expect(getInitials('Carlos Gonzalo Ortiz Camones')).toBe('CC')
  })

  test('returns a single initial for a one-word name', () => {
    expect(getInitials('Madonna')).toBe('M')
  })

  test('returns a placeholder for empty input', () => {
    expect(getInitials('')).toBe('?')
    expect(getInitials('   ')).toBe('?')
  })
})
