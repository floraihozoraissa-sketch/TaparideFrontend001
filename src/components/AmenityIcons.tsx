import { Wifi, Snowflake, BatteryCharging, Toilet } from 'lucide-react'
import type { Amenity } from '../data/mock'
import { cn } from '../lib/utils'

const map: Record<Amenity, { icon: typeof Wifi; label: string }> = {
  WiFi: { icon: Wifi, label: 'WiFi on Board' },
  AC: { icon: Snowflake, label: 'Air Conditioning' },
  Charging: { icon: BatteryCharging, label: 'USB Charging' },
  Restroom: { icon: Toilet, label: 'Onboard Restroom' },
}

const all: Amenity[] = ['WiFi', 'AC', 'Charging', 'Restroom']

export default function AmenityIcons({ amenities }: { amenities: Amenity[] }) {
  return (
    <div className="flex flex-col gap-1.5">
      {all.map((a) => {
        const active = amenities.includes(a)
        const { icon: Icon, label } = map[a]
        return (
          <span
            key={a}
            title={label}
            className={cn(
              'inline-flex items-center gap-1.5 text-xs',
              active ? 'text-ink-700' : 'text-ink-200',
            )}
          >
            <Icon className="h-3.5 w-3.5" /> {label}
          </span>
        )
      })}
    </div>
  )
}
