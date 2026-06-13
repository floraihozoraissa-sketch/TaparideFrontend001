import { Check } from 'lucide-react'
import { cn } from '../lib/utils'

interface StepperProps {
  steps: string[]
  current: number
}

export default function Stepper({ steps, current }: StepperProps) {
  return (
    <div className="flex items-center justify-center">
      {steps.map((label, i) => {
        const done = i < current
        const active = i === current
        return (
          <div key={label} className="flex items-center">
            <div className="flex items-center gap-2">
              <span
                className={cn(
                  'grid h-8 w-8 place-items-center rounded-full text-xs font-bold transition',
                  done && 'bg-flame-600 text-white',
                  active && 'bg-ink-900 text-white ring-4 ring-ink-900/10',
                  !done && !active && 'bg-ink-100 text-ink-400',
                )}
              >
                {done ? <Check className="h-4 w-4" /> : i + 1}
              </span>
              <span
                className={cn(
                  'hidden text-sm font-semibold sm:block',
                  active || done ? 'text-ink-900' : 'text-ink-400',
                )}
              >
                {label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <span
                className={cn(
                  'mx-3 h-0.5 w-8 rounded-full sm:w-14',
                  done ? 'bg-flame-600' : 'bg-ink-100',
                )}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}
