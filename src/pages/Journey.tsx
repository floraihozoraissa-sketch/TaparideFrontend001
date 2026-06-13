import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  MapPin,
  Navigation,
  Phone,
  Star,
  Home,
  RotateCcw,
  Bus,
  Clock,
  ChevronRight,
} from 'lucide-react'
import { cn } from '../lib/utils'

const stops = [
  { name: 'Kigali (Nyabugogo)', time: '08:00 AM', state: 'done' },
  { name: 'Muhanga', time: '08:50 AM', state: 'current' },
  { name: 'Nyanza', time: '10:10 AM', state: 'upcoming' },
  { name: 'Huye (Main Station)', time: '11:30 AM', state: 'upcoming' },
] as const

export default function Journey() {
  const [arrived, setArrived] = useState(false)

  return (
    <div className="bg-mist py-10">
      <div className="container-page">
        <div className="mx-auto max-w-md">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h1 className="flex items-center gap-2 text-xl font-extrabold text-ink-900">
                <Navigation className="h-5 w-5 text-flame-600" /> Live Journey
              </h1>
              <p className="text-sm text-ink-500">Real-time tracking & waitlist status</p>
            </div>
            <span className="chip bg-emerald-100 text-emerald-700">
              <span className="h-2 w-2 rounded-full bg-emerald-500" /> Live
            </span>
          </div>

          {arrived ? <Arrived onReset={() => setArrived(false)} /> : <LiveTracking onArrive={() => setArrived(true)} />}
        </div>
      </div>
    </div>
  )
}

function LiveTracking({ onArrive }: { onArrive: () => void }) {
  return (
    <div className="card overflow-hidden">
      {/* Map */}
      <div className="relative h-56 bg-[radial-gradient(circle_at_30%_30%,#E7E5F7,#F5F4FF)]">
        <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
          <path d="M40 200 C 120 120, 200 160, 320 60" stroke="#10075C" strokeWidth="3" strokeDasharray="2 8" strokeLinecap="round" fill="none" />
        </svg>
        <span className="absolute left-8 bottom-12 grid h-6 w-6 -translate-x-1/2 translate-y-1/2 place-items-center rounded-full bg-white shadow-card">
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
        </span>
        <span className="absolute right-10 top-10 grid h-6 w-6 place-items-center rounded-full bg-white shadow-card">
          <MapPin className="h-3.5 w-3.5 text-flame-600" />
        </span>
        <span className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center gap-1.5 rounded-full bg-ink-900 px-3 py-1.5 text-xs font-semibold text-white shadow-glow">
          <Bus className="h-3.5 w-3.5" /> 45 min left
        </span>
      </div>

      <div className="p-5">
        <div className="flex items-center gap-3 rounded-xl bg-ink-50 p-4">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-emerald-100 text-emerald-600">
            <MapPin className="h-5 w-5" />
          </span>
          <div className="flex-1">
            <div className="font-bold text-ink-900">Next Stop: Muhanga</div>
            <div className="text-xs text-ink-400">Arriving in 12 minutes</div>
          </div>
          <span className="chip bg-white text-ink-500">Stop #2</span>
        </div>

        {/* Route timeline */}
        <div className="mt-5">
          <div className="label">Route details</div>
          <ol className="relative ml-2 border-l border-dashed border-ink-200">
            {stops.map((s) => (
              <li key={s.name} className="mb-4 ml-5 last:mb-0">
                <span
                  className={cn(
                    'absolute -left-[7px] grid h-3.5 w-3.5 place-items-center rounded-full ring-4 ring-mist',
                    s.state === 'done' && 'bg-emerald-500',
                    s.state === 'current' && 'bg-flame-600',
                    s.state === 'upcoming' && 'bg-ink-200',
                  )}
                />
                <div className="flex items-center justify-between">
                  <span className={cn('text-sm', s.state === 'upcoming' ? 'text-ink-400' : 'font-semibold text-ink-900')}>
                    {s.name}
                  </span>
                  <span className="text-xs text-ink-400">{s.time}</span>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-5 flex gap-3">
          <button className="btn-outline flex-1">
            <Phone className="h-4 w-4" /> Call driver
          </button>
          <button onClick={onArrive} className="btn-primary flex-1">
            Simulate arrival <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  )
}

function Arrived({ onReset }: { onReset: () => void }) {
  const [rating, setRating] = useState(5)
  return (
    <div className="card p-6 text-center">
      <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-emerald-100 text-emerald-600">
        <Navigation className="h-7 w-7" />
      </span>
      <h2 className="mt-4 text-2xl font-extrabold text-ink-900">You have arrived!</h2>
      <p className="mt-1 text-sm text-ink-500">We hope you had a pleasant journey from Kigali to Huye.</p>

      <div className="mt-5 rounded-2xl bg-ink-50 p-5">
        <div className="text-xs font-bold uppercase tracking-wide text-ink-400">Rate your experience</div>
        <div className="mt-3 flex justify-center gap-1">
          {[1, 2, 3, 4, 5].map((n) => (
            <button key={n} onClick={() => setRating(n)} aria-label={`${n} star`}>
              <Star className={cn('h-8 w-8 transition', n <= rating ? 'fill-flame-500 text-flame-500' : 'text-ink-200')} />
            </button>
          ))}
        </div>
        <div className="mt-2 text-xs text-ink-400">Driver: Paul B.</div>
      </div>

      <div className="mt-5 flex flex-col gap-3">
        <Link to="/search" className="btn-primary">
          <RotateCcw className="h-4 w-4" /> Book Return Trip
        </Link>
        <Link to="/dashboard" className="btn-ghost">
          <Home className="h-4 w-4" /> Go to Dashboard
        </Link>
        <button onClick={onReset} className="text-xs font-semibold text-ink-400 hover:text-ink-900">
          <Clock className="mr-1 inline h-3 w-3" /> Replay live tracking
        </button>
      </div>
    </div>
  )
}
