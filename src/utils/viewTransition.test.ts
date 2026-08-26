import { afterEach, describe, expect, test, vi } from 'vitest'
import { withViewTransition } from '@/utils/viewTransition'

function stubMatchMedia(prefersReducedMotion: boolean): void {
  vi.stubGlobal(
    'matchMedia',
    vi.fn().mockReturnValue({ matches: prefersReducedMotion })
  )
}

describe('withViewTransition', () => {
  afterEach(() => {
    vi.unstubAllGlobals()
    Reflect.deleteProperty(document, 'startViewTransition')
  })

  test('runs the update directly when the browser has no View Transitions support', () => {
    stubMatchMedia(false)
    Reflect.deleteProperty(document, 'startViewTransition')

    const update = vi.fn()
    withViewTransition(update)

    expect(update).toHaveBeenCalledTimes(1)
  })

  test('runs the update directly, skipping the transition, when the user prefers reduced motion', () => {
    stubMatchMedia(true)
    const startViewTransition = vi.fn()
    Object.defineProperty(document, 'startViewTransition', {
      value: startViewTransition,
      configurable: true,
    })

    const update = vi.fn()
    withViewTransition(update)

    expect(update).toHaveBeenCalledTimes(1)
    expect(startViewTransition).not.toHaveBeenCalled()
  })

  test('runs the update inside startViewTransition when supported and motion is not reduced', () => {
    stubMatchMedia(false)
    const startViewTransition = vi.fn((callback: () => void) => callback())
    Object.defineProperty(document, 'startViewTransition', {
      value: startViewTransition,
      configurable: true,
    })

    const update = vi.fn()
    withViewTransition(update)

    expect(startViewTransition).toHaveBeenCalledTimes(1)
    expect(update).toHaveBeenCalledTimes(1)
  })
})
