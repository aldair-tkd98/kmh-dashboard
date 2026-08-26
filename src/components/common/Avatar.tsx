import { getInitials } from '@/utils/stringUtils'

interface AvatarProps {
  fullName: string
  photoUrl?: string | null
  sizeClassName?: string
}

export function Avatar({ fullName, photoUrl, sizeClassName = 'h-12 w-12 text-sm' }: AvatarProps) {
  if (photoUrl) {
    return (
      <img
        src={photoUrl}
        alt={fullName}
        className={`${sizeClassName} rounded-full object-cover ring-2 ring-white shadow-sm`}
      />
    )
  }

  return (
    <div
      className={`${sizeClassName} flex items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-brand-700 font-display font-semibold text-white ring-2 ring-white shadow-sm`}
      aria-hidden="true"
    >
      {getInitials(fullName)}
    </div>
  )
}
