import { Bus } from 'lucide-react'
import { companyBrands } from '../data/mock'
import { cn } from '../lib/utils'

const sizes = {
  sm: { box: 'h-10 w-10 rounded-lg', icon: 'h-5 w-5' },
  md: { box: 'h-12 w-12 rounded-xl', icon: 'h-6 w-6' },
  lg: { box: 'h-14 w-14 rounded-2xl', icon: 'h-7 w-7' },
}

/**
 * Renders a branded logo mark for a bus company. Falls back to the company
 * initials over its brand color when no image asset is configured. Drop a real
 * logo image URL into `companyBrands` (e.g. `logo: '/logos/volcano.png'`) to
 * swap the mark for the official brand artwork.
 */
export default function CompanyLogo({
  company,
  size = 'md',
  className,
}: {
  company: string
  size?: keyof typeof sizes
  className?: string
}) {
  const brand = companyBrands[company]
  const color = brand?.color ?? '#10075C'
  const s = sizes[size]

  return (
    <span
      className={cn('grid shrink-0 place-items-center text-white shadow-soft', s.box, className)}
      style={{ background: `linear-gradient(135deg, ${color}, ${color}cc)` }}
      title={company}
      aria-label={company}
    >
      <Bus className={s.icon} strokeWidth={2.2} />
    </span>
  )
}
