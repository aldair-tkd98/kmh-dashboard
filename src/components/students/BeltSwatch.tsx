import type { BeltDefinition } from '@/constants/belts'

interface BeltSwatchProps {
  base: BeltDefinition
  tip: BeltDefinition | null
}

export function BeltSwatch({ base, tip }: BeltSwatchProps) {
  return (
    <span className="relative inline-block h-3.5 w-3.5 shrink-0 overflow-hidden rounded-full" aria-hidden="true">
      <span className={`absolute inset-0 ${base.swatchClass}`} />
      {tip && (
        <span
          className={`absolute inset-0 ${tip.swatchClass}`}
          style={{ clipPath: 'polygon(100% 0, 100% 100%, 0 100%)' }}
        />
      )}
    </span>
  )
}
