import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Users, Zap, BellRing, Ticket, AlertTriangle, ChevronRight } from 'lucide-react'

export default function Waitlist() {
  const [joined, setJoined] = useState(false)
  const [seatOpen, setSeatOpen] = useState(false)

  return (
    <div className="bg-mist py-10">
      <div className="container-page">
        <div className="mx-auto max-w-md">
          <h1 className="mb-4 flex items-center gap-2 text-xl font-extrabold text-ink-900">
            <Users className="h-5 w-5 text-flame-600" /> Journey Waitlist
          </h1>

          {seatOpen ? (
            <SeatOpened />
          ) : (
            <BusFull joined={joined} onJoin={() => setJoined(true)} onSeatOpen={() => setSeatOpen(true)} />
          )}
        </div>
      </div>
    </div>
  )
}

function BusFull({ joined, onJoin, onSeatOpen }: { joined: boolean; onJoin: () => void; onSeatOpen: () => void }) {
  return (
    <div className="card overflow-hidden">
      <div className="bg-flame-50 p-6 text-center">
        <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-flame-100 text-flame-600">
          <Users className="h-6 w-6" />
        </span>
        <h2 className="mt-3 text-xl font-extrabold text-ink-900">Bus is full</h2>
        <p className="mt-1 text-sm text-ink-500">
          All 32 seats have been booked for the 14:00 PM Kigali → Huye bus.
        </p>
        <span className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1 text-xs font-semibold text-ink-700">
          <BellRing className="h-3.5 w-3.5" /> 8 people on waitlist
        </span>
      </div>

      <div className="p-6">
        <div className="label">Waitlist benefits</div>
        <ul className="space-y-3">
          <Benefit icon={Zap} title="Instant notification" body="Be the first to know when a seat frees up." />
          <Benefit icon={Ticket} title="Auto-book option" body="We can secure & pay for the seat automatically." />
        </ul>

        {joined ? (
          <div className="mt-6 space-y-3">
            <div className="rounded-xl bg-emerald-50 p-4 text-center text-sm font-semibold text-emerald-700">
              You're #3 on the waitlist
            </div>
            <button onClick={onSeatOpen} className="btn-primary w-full">
              Simulate seat opening <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <button onClick={onJoin} className="btn-primary mt-6 w-full">
            Join Waitlist
          </button>
        )}
      </div>
    </div>
  )
}

function SeatOpened() {
  const [secs, setSecs] = useState(118)
  useEffect(() => {
    if (secs <= 0) return
    const t = setTimeout(() => setSecs((s) => s - 1), 1000)
    return () => clearTimeout(t)
  }, [secs])
  const mm = String(Math.floor(secs / 60)).padStart(2, '0')
  const ss = String(secs % 60).padStart(2, '0')

  return (
    <div className="card p-6 text-center">
      <span className="mx-auto inline-flex items-center gap-1 rounded-full bg-flame-600 px-3 py-1 text-xs font-bold text-white">
        <AlertTriangle className="h-3.5 w-3.5" /> URGENT
      </span>
      <div className="relative mx-auto mt-5 grid h-32 w-32 place-items-center">
        <svg className="absolute inset-0 -rotate-90" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="44" fill="none" stroke="#E7E5F7" strokeWidth="6" />
          <circle
            cx="50"
            cy="50"
            r="44"
            fill="none"
            stroke="#059669"
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={2 * Math.PI * 44}
            strokeDashoffset={(1 - secs / 120) * 2 * Math.PI * 44}
          />
        </svg>
        <div>
          <div className="text-3xl font-extrabold text-ink-900">{mm}:{ss}</div>
          <div className="text-[10px] uppercase tracking-wide text-ink-400">Minutes</div>
        </div>
      </div>

      <h2 className="mt-5 text-2xl font-extrabold text-ink-900">A seat just opened!</h2>
      <p className="mt-1 text-sm text-ink-500">
        A seat on the 14:00 PM Kigali → Huye bus is available. Claim it before the timer runs out.
      </p>

      <div className="mt-5 flex items-center justify-between rounded-xl bg-ink-50 p-4 text-left text-sm">
        <div>
          <div className="text-xs text-ink-400">Seat</div>
          <div className="font-bold text-ink-900">B4 · Row B</div>
        </div>
        <div className="text-right">
          <div className="text-xs text-ink-400">Fare</div>
          <div className="font-bold text-ink-900">RWF 3,000</div>
        </div>
      </div>

      <Link to="/booking" className="btn-primary mt-5 w-full">
        Claim Seat
      </Link>
      <button className="mt-2 text-xs font-semibold text-ink-400 hover:text-ink-900">Pass to next person</button>
    </div>
  )
}

function Benefit({ icon: Icon, title, body }: { icon: typeof Zap; title: string; body: string }) {
  return (
    <li className="flex gap-3">
      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-ink-50 text-ink-900">
        <Icon className="h-4 w-4" />
      </span>
      <div>
        <div className="text-sm font-semibold text-ink-900">{title}</div>
        <div className="text-xs text-ink-400">{body}</div>
      </div>
    </li>
  )
}
