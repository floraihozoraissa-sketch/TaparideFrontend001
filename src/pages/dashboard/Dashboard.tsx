import { Link } from 'react-router-dom'
import { Ticket, Package, Wallet, ArrowRight, MapPin, Calendar, Plus } from 'lucide-react'
import { trips, parcels } from '../../data/mock'
import { cn, rwf } from '../../lib/utils'

const statusStyles: Record<string, string> = {
  Upcoming: 'bg-ink-100 text-ink-700',
  Completed: 'bg-emerald-100 text-emerald-700',
  Cancelled: 'bg-flame-100 text-flame-700',
  'In Transit': 'bg-flame-100 text-flame-700',
  Delivered: 'bg-emerald-100 text-emerald-700',
  'Pending Pickup': 'bg-amber-100 text-amber-700',
}

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Welcome banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-ink-900 to-ink-700 p-6 text-white sm:p-8">
        <div className="pointer-events-none absolute -right-10 -top-10 h-48 w-48 rounded-full bg-flame-600/30 blur-3xl" />
        <div className="relative">
          <h1 className="text-2xl font-extrabold sm:text-3xl">Welcome back, Amina 👋</h1>
          <p className="mt-1 max-w-md text-white/70">
            You have 1 upcoming trip and 1 parcel in transit. Ready for your next journey?
          </p>
          <Link to="/search" className="btn mt-5 bg-white text-ink-900 hover:bg-white/90">
            <Plus className="h-4 w-4" /> Book a Trip
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Stat icon={Ticket} label="Total Trips" value="14" hint="+2 this month" />
        <Stat icon={Package} label="Parcels Sent" value="6" hint="1 in transit" />
        <Stat icon={Wallet} label="Total Spent" value={rwf(86400)} hint="Lifetime" />
      </div>

      {/* Upcoming trips */}
      <Section title="Recent Trips" to="/dashboard/trips">
        <div className="divide-y divide-ink-100">
          {trips.slice(0, 3).map((t) => (
            <div key={t.id} className="flex flex-wrap items-center gap-3 py-3">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-ink-50 text-ink-900">
                <MapPin className="h-4 w-4" />
              </span>
              <div className="min-w-0 flex-1">
                <div className="font-semibold text-ink-900">{t.route}</div>
                <div className="flex items-center gap-1.5 text-xs text-ink-400">
                  <Calendar className="h-3 w-3" /> {t.date}
                </div>
              </div>
              <span className="text-sm font-semibold text-ink-900">{rwf(t.price)}</span>
              <span className={cn('chip', statusStyles[t.status])}>{t.status}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* Parcels */}
      <Section title="Recent Parcels" to="/dashboard/parcels">
        <div className="divide-y divide-ink-100">
          {parcels.map((p) => (
            <div key={p.id} className="flex flex-wrap items-center gap-3 py-3">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-ink-50 text-ink-900">
                <Package className="h-4 w-4" />
              </span>
              <div className="min-w-0 flex-1">
                <div className="font-semibold text-ink-900">{p.from} → {p.to}</div>
                <div className="text-xs text-ink-400">{p.trackingCode} · {p.weight}</div>
              </div>
              <span className="text-sm font-semibold text-ink-900">{rwf(p.fee)}</span>
              <span className={cn('chip', statusStyles[p.status])}>{p.status}</span>
            </div>
          ))}
        </div>
      </Section>
    </div>
  )
}

function Stat({
  icon: Icon,
  label,
  value,
  hint,
}: {
  icon: typeof Ticket
  label: string
  value: string
  hint: string
}) {
  return (
    <div className="card flex items-center gap-4 p-5">
      <span className="grid h-12 w-12 place-items-center rounded-xl bg-ink-900 text-white">
        <Icon className="h-5 w-5" />
      </span>
      <div>
        <div className="text-2xl font-extrabold text-ink-900">{value}</div>
        <div className="text-sm text-ink-500">{label}</div>
        <div className="text-xs text-flame-600">{hint}</div>
      </div>
    </div>
  )
}

function Section({
  title,
  to,
  children,
}: {
  title: string
  to: string
  children: React.ReactNode
}) {
  return (
    <div className="card p-5 sm:p-6">
      <div className="mb-2 flex items-center justify-between">
        <h2 className="font-bold text-ink-900">{title}</h2>
        <Link to={to} className="inline-flex items-center gap-1 text-sm font-semibold text-flame-600 hover:gap-2">
          View all <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
      {children}
    </div>
  )
}
