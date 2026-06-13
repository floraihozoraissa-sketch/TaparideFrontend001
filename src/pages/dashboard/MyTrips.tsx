import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Calendar, MapPin, Download, Bus, Ticket, Navigation } from 'lucide-react'
import { trips, type Trip } from '../../data/mock'
import { cn, rwf } from '../../lib/utils'
import { downloadTicket } from '../../lib/ticket'
import { useAccount } from '../../store/account'

const tabs = ['All', 'Upcoming', 'Completed', 'Cancelled'] as const
const statusStyles: Record<Trip['status'], string> = {
  Upcoming: 'bg-ink-100 text-ink-700',
  Completed: 'bg-emerald-100 text-emerald-700',
  Cancelled: 'bg-flame-100 text-flame-700',
}

export default function MyTrips() {
  const { profile } = useAccount()
  const [tab, setTab] = useState<(typeof tabs)[number]>('All')
  const filtered = tab === 'All' ? trips : trips.filter((t) => t.status === tab)

  const handleDownload = (t: Trip) => {
    const [from, to] = t.route.split('→').map((s) => s.trim())
    const [date, time] = t.date.split('·').map((s) => s.trim())
    downloadTicket({
      bookingRef: t.id,
      passenger: profile.fullName,
      carrier: t.company,
      depTime: time || '',
      depPlace: from || '',
      arrTime: '',
      arrPlace: to || '',
      date: date || t.date,
      seats: t.seat,
      amountPaid: rwf(t.price),
    })
  }

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-extrabold text-ink-900">My Trips</h1>
        <p className="text-ink-500">View and manage all your bus bookings.</p>
      </div>

      <div className="flex flex-wrap gap-2">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={cn(
              'rounded-full px-4 py-2 text-sm font-semibold transition',
              tab === t ? 'bg-ink-900 text-white' : 'bg-white text-ink-500 hover:bg-ink-50',
            )}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {filtered.map((t) => (
          <div key={t.id} className="card p-5">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-ink-100 pb-3">
              <div className="flex items-center gap-2">
                <span className="grid h-9 w-9 place-items-center rounded-lg bg-ink-900 text-white">
                  <Bus className="h-4 w-4" />
                </span>
                <div>
                  <div className="font-bold text-ink-900">{t.route}</div>
                  <div className="text-xs text-ink-400">{t.company} · {t.id}</div>
                </div>
              </div>
              <span className={cn('chip', statusStyles[t.status])}>{t.status}</span>
            </div>
            <div className="flex flex-wrap items-center justify-between gap-4 pt-3">
              <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
                <span className="flex items-center gap-1.5 text-ink-500"><Calendar className="h-4 w-4 text-ink-300" /> {t.date}</span>
                <span className="flex items-center gap-1.5 text-ink-500"><Ticket className="h-4 w-4 text-ink-300" /> Seat {t.seat}</span>
                <span className="flex items-center gap-1.5 text-ink-500"><MapPin className="h-4 w-4 text-ink-300" /> {rwf(t.price)}</span>
              </div>
              <div className="flex gap-2">
                {t.status === 'Upcoming' && (
                  <>
                    <Link to="/journey" className="btn-flame px-4 py-2 text-xs">
                      <Navigation className="h-3.5 w-3.5" /> Track Live
                    </Link>
                    <button onClick={() => handleDownload(t)} className="btn-primary px-4 py-2 text-xs">
                      <Download className="h-3.5 w-3.5" /> Ticket
                    </button>
                  </>
                )}
                <Link to="/search" className="btn-outline px-4 py-2 text-xs">
                  {t.status === 'Completed' ? 'Rebook' : 'Details'}
                </Link>
              </div>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="card p-10 text-center text-ink-400">No {tab.toLowerCase()} trips yet.</div>
        )}
      </div>
    </div>
  )
}
