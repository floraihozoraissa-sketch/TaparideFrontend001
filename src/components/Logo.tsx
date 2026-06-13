import { Link } from 'react-router-dom'
import { cn } from '../lib/utils'

interface LogoProps {
  className?: string
  variant?: 'dark' | 'light'
  withText?: boolean
}

export default function Logo({ className, variant = 'dark', withText = true }: LogoProps) {
  const tapa = variant === 'light' ? 'text-white' : 'text-ink-900'
  return (
    <Link to="/" className={cn('inline-flex items-center gap-2', className)}>
      <span
        className={cn(
          'grid h-9 w-9 place-items-center rounded-xl shadow-soft',
          variant === 'light' ? 'bg-white' : 'bg-ink-900',
        )}
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
          <path
            d="M6 5h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2v1.5A1.5 1.5 0 0 1 16.5 20h-.5A1.5 1.5 0 0 1 14.5 18.5V17h-5v1.5A1.5 1.5 0 0 1 8 20h-.5A1.5 1.5 0 0 1 6 18.5V17a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z"
            fill={variant === 'light' ? '#10075C' : '#fff'}
          />
          <rect x="7" y="8" width="10" height="4.5" rx="1" fill={variant === 'light' ? '#fff' : '#10075C'} />
          <circle cx="8.5" cy="15" r="1.1" fill="#EA580C" />
          <circle cx="15.5" cy="15" r="1.1" fill="#EA580C" />
        </svg>
      </span>
      {withText && (
        <span className="text-xl font-extrabold tracking-tight">
          <span className={tapa}>Tapa</span>
          <span className="text-flame-600">Ride</span>
        </span>
      )}
    </Link>
  )
}
