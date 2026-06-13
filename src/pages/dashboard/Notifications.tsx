import { Bus, Package, CreditCard, Tag, Check, CheckCheck, BellOff } from 'lucide-react'
import { type NotificationItem } from '../../data/mock'
import { cn } from '../../lib/utils'
import { useAccount } from '../../store/account'

const iconMap: Record<NotificationItem['type'], { icon: typeof Bus; color: string }> = {
  trip: { icon: Bus, color: 'bg-ink-900 text-white' },
  parcel: { icon: Package, color: 'bg-flame-600 text-white' },
  payment: { icon: CreditCard, color: 'bg-emerald-600 text-white' },
  promo: { icon: Tag, color: 'bg-amber-500 text-white' },
}

export default function Notifications() {
  const { notifications, dismissNotification, clearAllNotifications } = useAccount()
  const unreadCount = notifications.filter((n) => n.unread).length

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-extrabold text-ink-900">Notifications</h1>
          <p className="text-ink-500">
            {notifications.length === 0
              ? "You're all caught up."
              : `${unreadCount} unread · ${notifications.length} total`}
          </p>
        </div>
        {notifications.length > 0 && (
          <button className="btn-outline" onClick={clearAllNotifications}>
            <CheckCheck className="h-4 w-4" /> Mark all as read
          </button>
        )}
      </div>

      {notifications.length === 0 ? (
        <div className="card flex flex-col items-center gap-3 p-12 text-center">
          <span className="grid h-14 w-14 place-items-center rounded-2xl bg-ink-50 text-ink-300">
            <BellOff className="h-6 w-6" />
          </span>
          <div>
            <h3 className="font-bold text-ink-900">No notifications</h3>
            <p className="mt-1 text-sm text-ink-500">
              When you mark notifications as read, they're cleared from this list.
            </p>
          </div>
        </div>
      ) : (
        <div className="card divide-y divide-ink-100">
          {notifications.map((n) => {
            const { icon: Icon, color } = iconMap[n.type]
            return (
              <div key={n.id} className={cn('flex gap-4 p-5', n.unread && 'bg-ink-50/50')}>
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
                <button
                  onClick={() => dismissNotification(n.id)}
                  className="flex h-8 shrink-0 items-center gap-1.5 self-start rounded-lg px-2.5 text-xs font-semibold text-ink-400 transition hover:bg-emerald-50 hover:text-emerald-600"
                >
                  <Check className="h-3.5 w-3.5" /> Mark as read
                </button>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
