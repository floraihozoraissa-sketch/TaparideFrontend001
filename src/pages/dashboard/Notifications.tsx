import { Bus, Package, CreditCard, Tag, Check } from 'lucide-react'
import { notifications, type NotificationItem } from '../../data/mock'
import { cn } from '../../lib/utils'

const iconMap: Record<NotificationItem['type'], { icon: typeof Bus; color: string }> = {
  trip: { icon: Bus, color: 'bg-ink-900 text-white' },
  parcel: { icon: Package, color: 'bg-flame-600 text-white' },
  payment: { icon: CreditCard, color: 'bg-emerald-600 text-white' },
  promo: { icon: Tag, color: 'bg-amber-500 text-white' },
}

export default function Notifications() {
  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-extrabold text-ink-900">Notifications</h1>
          <p className="text-ink-500">Stay updated on your trips, parcels and payments.</p>
        </div>
        <button className="btn-outline">
          <Check className="h-4 w-4" /> Mark all as read
        </button>
      </div>

      <div className="card divide-y divide-ink-100">
        {notifications.map((n) => {
          const { icon: Icon, color } = iconMap[n.type]
          return (
            <div
              key={n.id}
              className={cn('flex gap-4 p-5', n.unread && 'bg-ink-50/50')}
            >
              <span className={cn('grid h-10 w-10 shrink-0 place-items-center rounded-xl', color)}>
                <Icon className="h-4 w-4" />
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-ink-900">{n.title}</h3>
                  {n.unread && <span className="h-2 w-2 rounded-full bg-flame-600" />}
                </div>
                <p className="mt-0.5 text-sm text-ink-500">{n.body}</p>
                <div className="mt-1 text-xs text-ink-400">{n.time}</div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
