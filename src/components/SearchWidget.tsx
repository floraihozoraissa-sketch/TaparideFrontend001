import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { MapPin, Calendar, Users, ArrowLeftRight, Bus, Package, Search } from 'lucide-react'
import { cities } from '../data/mock'
import { cn } from '../lib/utils'

export default function SearchWidget() {
  const navigate = useNavigate()
  const [tab, setTab] = useState<'bus' | 'parcel'>('bus')
  const [from, setFrom] = useState(cities[0])
  const [to, setTo] = useState(cities[1])

  const swap = () => {
    setFrom(to)
    setTo(from)
  }

  return (
    <div className="card w-full p-5 sm:p-6">
      <div className="mb-5 grid grid-cols-2 gap-2 rounded-xl bg-ink-50 p-1">
        <button
          type="button"
          onClick={() => setTab('bus')}
          className={cn(
            'flex items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-semibold transition',
            tab === 'bus' ? 'bg-white text-ink-900 shadow-soft' : 'text-ink-400',
          )}
        >
          <Bus className="h-4 w-4" /> Bus Tickets
        </button>
        <button
          type="button"
          onClick={() => setTab('parcel')}
          className={cn(
            'flex items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-semibold transition',
            tab === 'parcel' ? 'bg-white text-ink-900 shadow-soft' : 'text-ink-400',
          )}
        >
          <Package className="h-4 w-4" /> Send Parcel
        </button>
      </div>

      <div className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="label">From</label>
            <div className="relative">
              <MapPin className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-flame-600" />
              <select
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                className="input appearance-none pl-9"
              >
                {cities.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <label className="label flex items-center justify-between">
              To
              <button
                type="button"
                onClick={swap}
                className="text-ink-400 transition hover:text-ink-900"
                aria-label="swap cities"
              >
                <ArrowLeftRight className="h-3.5 w-3.5" />
              </button>
            </label>
            <div className="relative">
              <MapPin className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
              <select
                value={to}
                onChange={(e) => setTo(e.target.value)}
                className="input appearance-none pl-9"
              >
                {cities.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="label">Date</label>
            <div className="relative">
              <Calendar className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
              <input type="date" className="input pl-9" />
            </div>
          </div>
          <div>
            <label className="label">{tab === 'bus' ? 'Passengers' : 'Parcel weight'}</label>
            <div className="relative">
              {tab === 'bus' ? (
                <Users className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
              ) : (
                <Package className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
              )}
              {tab === 'bus' ? (
                <select className="input appearance-none pl-9">
                  <option>1 Passenger</option>
                  <option>2 Passengers</option>
                  <option>3 Passengers</option>
                  <option>4 Passengers</option>
                </select>
              ) : (
                <input className="input pl-9" placeholder="e.g. 5 kg" />
              )}
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={() => navigate(tab === 'bus' ? '/search' : '/send-parcel')}
          className="btn-primary w-full py-3.5 text-base"
        >
          <Search className="h-4 w-4" />
          {tab === 'bus' ? 'Search Buses' : 'Get a Quote'}
        </button>
      </div>
    </div>
  )
}
