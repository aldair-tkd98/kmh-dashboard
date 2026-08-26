import { describe, expect, test } from 'vitest'
import { calculateAge, formatDate, parseFlexibleDate } from '@/utils/dateUtils'

describe('parseFlexibleDate', () => {
  test('parses ISO formatted dates (YYYY-MM-DD)', () => {
    const result = parseFlexibleDate('2003-07-26')
    expect(result).toEqual(new Date(2003, 6, 26))
  })

  test('parses Peru-style slash formatted dates with time (D/M/YYYY H:mm:ss)', () => {
    const result = parseFlexibleDate('22/7/2026 20:42:07')
    expect(result).toEqual(new Date(2026, 6, 22))
  })

  test('parses single-digit day and month slash dates (D/M/YYYY)', () => {
    const result = parseFlexibleDate('2/8/2026 18:19:16')
    expect(result).toEqual(new Date(2026, 7, 2))
  })

  test('returns null for malformed values like spreadsheet overflow markers', () => {
    expect(parseFlexibleDate('##############')).toBeNull()
  })

  test('returns null for a day that overflows its month (e.g. day 32)', () => {
    expect(parseFlexibleDate('32/1/2026')).toBeNull()
  })

  test('returns null for empty or nullish input', () => {
    expect(parseFlexibleDate('')).toBeNull()
    expect(parseFlexibleDate(null)).toBeNull()
    expect(parseFlexibleDate(undefined)).toBeNull()
  })
})

describe('calculateAge', () => {
  test('returns the age when the birthday already passed this year', () => {
    const birthDate = new Date(2000, 0, 1)
    const referenceDate = new Date(2026, 5, 15)
    expect(calculateAge(birthDate, referenceDate)).toBe(26)
  })

  test('subtracts one year when the birthday has not happened yet this year', () => {
    const birthDate = new Date(2000, 11, 31)
    const referenceDate = new Date(2026, 0, 1)
    expect(calculateAge(birthDate, referenceDate)).toBe(25)
  })

  test('returns null when birthDate is null', () => {
    expect(calculateAge(null)).toBeNull()
  })
})

describe('formatDate', () => {
  test('returns a placeholder for null dates', () => {
    expect(formatDate(null)).toBe('Sin fecha')
  })

  test('formats a valid date using the given locale', () => {
    const formatted = formatDate(new Date(2026, 0, 15), 'en-US')
    expect(formatted).toContain('2026')
  })
})
