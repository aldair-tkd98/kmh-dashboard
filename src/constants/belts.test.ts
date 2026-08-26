import { describe, expect, test } from 'vitest'
import { resolveBelt } from '@/constants/belts'

describe('resolveBelt', () => {
  test('resolves a single solid belt color', () => {
    const belt = resolveBelt('Amarillo')
    expect(belt?.base.key).toBe('amarillo')
    expect(belt?.tip).toBeNull()
    expect(belt?.label).toBe('Amarillo')
  })

  test('is case-insensitive and accent-insensitive for the base color', () => {
    expect(resolveBelt('MARRÓN')?.base.key).toBe('marron')
  })

  test('resolves a compound "punta" belt with base and tip colors, preserving the full label', () => {
    const belt = resolveBelt('Blanco Punta Amarilla')
    expect(belt?.base.key).toBe('blanco')
    expect(belt?.tip?.key).toBe('amarillo')
    expect(belt?.label).toBe('Blanco Punta Amarilla')
  })

  test('picks the base and tip colors in the order they appear in the text', () => {
    const belt = resolveBelt('Azul Punta Roja 1er Acumulativo')
    expect(belt?.base.key).toBe('azul')
    expect(belt?.tip?.key).toBe('rojo')
    expect(belt?.label).toBe('Azul Punta Roja 1er Acumulativo')
  })

  test('preserves rank qualifiers like "Acumulativo" in the label even without a tip color', () => {
    const belt = resolveBelt('Rojo 2do Acumulativo')
    expect(belt?.base.key).toBe('rojo')
    expect(belt?.tip).toBeNull()
    expect(belt?.label).toBe('Rojo 2do Acumulativo')
  })

  test('matches a belt name embedded in a longer string (e.g. "Cinturón Negro 1er Dan")', () => {
    expect(resolveBelt('Cinturón Negro 1er Dan')?.base.key).toBe('negro')
  })

  test('returns null for empty, nullish, or unrecognized values', () => {
    expect(resolveBelt('')).toBeNull()
    expect(resolveBelt('   ')).toBeNull()
    expect(resolveBelt(null)).toBeNull()
    expect(resolveBelt(undefined)).toBeNull()
    expect(resolveBelt('Fucsia')).toBeNull()
  })
})
