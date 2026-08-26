export interface BeltDefinition {
  key: string
  label: string
  order: number
  swatchClass: string
  textClass: string
}

export interface ResolvedBelt {
  base: BeltDefinition
  tip: BeltDefinition | null
  label: string
}

interface BeltCatalogEntry extends BeltDefinition {
  /** Gender-neutral stem used to match "Amarillo"/"Amarilla", "Rojo"/"Roja", etc. */
  matchStem: string
}

export const BELT_CATALOG: BeltCatalogEntry[] = [
  { key: 'blanco', label: 'Blanco', order: 0, swatchClass: 'bg-white border border-slate-300', textClass: 'text-slate-700', matchStem: 'blanc' },
  { key: 'amarillo', label: 'Amarillo', order: 1, swatchClass: 'bg-yellow-400', textClass: 'text-yellow-900', matchStem: 'amarill' },
  { key: 'naranja', label: 'Naranja', order: 2, swatchClass: 'bg-orange-500', textClass: 'text-orange-950', matchStem: 'naranj' },
  { key: 'verde', label: 'Verde', order: 3, swatchClass: 'bg-green-600', textClass: 'text-green-950', matchStem: 'verd' },
  { key: 'azul', label: 'Azul', order: 4, swatchClass: 'bg-blue-600', textClass: 'text-blue-950', matchStem: 'azul' },
  { key: 'morado', label: 'Morado', order: 5, swatchClass: 'bg-purple-600', textClass: 'text-purple-950', matchStem: 'morad' },
  { key: 'marron', label: 'Marrón', order: 6, swatchClass: 'bg-amber-800', textClass: 'text-amber-950', matchStem: 'marron' },
  { key: 'rojo', label: 'Rojo', order: 7, swatchClass: 'bg-red-600', textClass: 'text-red-950', matchStem: 'roj' },
  { key: 'negro', label: 'Negro', order: 8, swatchClass: 'bg-slate-900', textClass: 'text-slate-50', matchStem: 'negr' },
]

const BELT_BY_KEY = new Map(BELT_CATALOG.map((belt) => [belt.key, belt]))

function normalizeBeltText(rawBelt: string): string {
  return rawBelt
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
    .toLowerCase()
}

function findColorKeysInOrderOfAppearance(normalizedText: string): string[] {
  return BELT_CATALOG.map((belt) => ({ key: belt.key, index: normalizedText.indexOf(belt.matchStem) }))
    .filter((match) => match.index !== -1)
    .sort((a, b) => a.index - b.index)
    .map((match) => match.key)
}

/**
 * Belt names in the roster are free text and may combine a base color with a
 * "tip" color for half-ranks (e.g. "Azul Punta Roja 1er Acumulativo"), where
 * the tip color agrees in gender with "punta" (feminine) rather than
 * "cinturón" (masculine). This resolves the base/tip colors for the swatch
 * via gender-neutral stems, while always preserving the full original text
 * as the display label so no rank detail is lost.
 */
export function resolveBelt(rawBelt: string | null | undefined): ResolvedBelt | null {
  const trimmed = rawBelt?.trim()
  if (!trimmed) return null

  const colorKeys = findColorKeysInOrderOfAppearance(normalizeBeltText(trimmed))
  if (colorKeys.length === 0) return null

  const base = BELT_BY_KEY.get(colorKeys[0])
  if (!base) return null

  const tip = colorKeys.length > 1 ? (BELT_BY_KEY.get(colorKeys[1]) ?? null) : null

  return { base, tip, label: trimmed }
}
