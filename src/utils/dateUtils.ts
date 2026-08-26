function buildValidatedDate(year: number, month: number, day: number): Date | null {
  const date = new Date(year, month - 1, day)
  const isValid =
    !Number.isNaN(date.getTime()) &&
    date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day
  return isValid ? date : null
}

export function parseFlexibleDate(rawValue: string | null | undefined): Date | null {
  if (!rawValue) return null

  const isoMatch = rawValue.match(/^(\d{4})-(\d{2})-(\d{2})/)
  if (isoMatch) {
    const [, year, month, day] = isoMatch
    return buildValidatedDate(Number(year), Number(month), Number(day))
  }

  // Sheet dates use Peru's D/M/YYYY convention, not US M/D/YYYY.
  const slashMatch = rawValue.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})/)
  if (slashMatch) {
    const [, day, month, year] = slashMatch
    return buildValidatedDate(Number(year), Number(month), Number(day))
  }

  return null
}

export function calculateAge(birthDate: Date | null, referenceDate: Date = new Date()): number | null {
  if (!birthDate) return null

  let age = referenceDate.getFullYear() - birthDate.getFullYear()
  const hasNotHadBirthdayThisYear =
    referenceDate.getMonth() < birthDate.getMonth() ||
    (referenceDate.getMonth() === birthDate.getMonth() && referenceDate.getDate() < birthDate.getDate())

  if (hasNotHadBirthdayThisYear) {
    age -= 1
  }

  return age >= 0 ? age : null
}

export function formatDate(date: Date | null, locale = 'es-PE'): string {
  if (!date) return 'Sin fecha'
  return new Intl.DateTimeFormat(locale, { day: '2-digit', month: 'short', year: 'numeric' }).format(date)
}
