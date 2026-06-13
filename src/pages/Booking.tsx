import { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  ChevronLeft,
  Bus,
  Star,
  MapPin,
  Calendar,
  Wifi,
  Snowflake,
  BatteryCharging,
  Tag,
  ArrowRight,
  User,
} from 'lucide-react'
import Stepper from '../components/Stepper'
import { cn, rwf } from '../lib/utils'

const PRICE = 3500
const SERVICE_FEE = 200
const DISCOUNT = 100

// A1..D4 style layout; some seats pre-booked
const booked = new Set(['A3', 'B4', 'C1', 'C2', 'D4', 'E2'])
const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G']

export default function Booking() {
  const navigate = useNavigate()
  const [selected, setSelected] = useState<string[]>(['A2', 'B2'])

  const toggleSeat = (seat: string) => {
    if (booked.has(seat)) return
    setSelected((prev) =>
      prev.includes(seat) ? prev.filter((s) => s !== seat) : [...prev, seat],
    )
  }

  const total = useMemo(
    () => selected.length * PRICE + (selected.length ? SERVICE_FEE - DISCOUNT : 0),
    [selected.length],
  )

  return (
    <div className="bg-mist pb-16">
      {/* Stepper */}
      <div className="border-b border-ink-100 bg-white py-5">
        <div className="container-page">
          <Stepper steps={['Select Bus', 'Select Seat', 'Payment', 'Confirmation']} current={1} />
        </div>
      </div>

      {/* Trip context bar */}
      <div className="bg-ink-900 text-white">
        <div className="container-page flex flex-wrap items-center gap-x-4 gap-y-2 py-3 text-sm">
          <Link to="/search" className="flex items-center gap-1.5 font-semibold text-white/80 hover:text-white">
            <ChevronLeft className="h-4 w-4" /> Back to Results
          </Link>
          <span className="hidden h-4 w-px bg-white/20 sm:block" />
          <span className="flex items-center gap-2 font-semibold">
            <Bus className="h-4 w-4" /> Volcano Express
          </span>
          <span className="text-white/70">Kigali → Huye · Tue, 15 Jul 2025 · 08:00 AM</span>
          <span className="ml-auto chip bg-white/10 text-white">Select up to 4 seats per booking</span>
        </div>
      </div>

      <div className="container-page grid gap-6 py-8 lg:grid-cols-[1fr_380px]">
        <div className="space-y-6">
          {/* Seat map */}
          <div className="card p-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-lg font-bold text-ink-900">Choose Your Seats</h2>
                <p className="text-sm text-ink-500">Click on available seats to select them.</p>
              </div>
              <div className="flex items-center gap-4 text-xs">
                <Legend className="border border-ink-200 bg-white" label="Available" />
                <Legend className="bg-ink-900" label="Selected" />
                <Legend className="bg-ink-100" label="Booked" />
              </div>
            </div>

            <div className="mt-6 rounded-2xl border border-ink-100 bg-ink-50/50 p-6">
              <div className="mb-4 flex items-center justify-end gap-2 text-xs text-ink-400">
                <Bus className="h-4 w-4" /> Front of bus
              </div>
              <div className="mx-auto max-w-md space-y-3">
                {rows.map((r) => (
                  <div key={r} className="flex items-center justify-center gap-3">
                    <span className="w-4 text-xs font-semibold text-ink-300">{r}</span>
                    <div className="flex gap-2">
                      {[1, 2].map((n) => (
                        <Seat key={n} id={`${r}${n}`} booked={booked.has(`${r}${n}`)} selected={selected.includes(`${r}${n}`)} onClick={toggleSeat} />
                      ))}
                    </div>
                    <span className="w-8 text-center text-[10px] text-ink-300">aisle</span>
                    <div className="flex gap-2">
                      {[3, 4].map((n) => (
                        <Seat key={n} id={`${r}${n}`} booked={booked.has(`${r}${n}`)} selected={selected.includes(`${r}${n}`)} onClick={toggleSeat} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 flex items-center justify-center gap-2 rounded-xl bg-ink-50 py-3 text-sm font-semibold text-ink-900">
              {selected.length} seat{selected.length === 1 ? '' : 's'} selected
              {selected.length > 0 && <span className="text-ink-500">· {selected.join(', ')}</span>}
            </div>
          </div>

          {/* Passenger details */}
          <div className="card p-6">
            <div className="flex items-center gap-2">
              <span className="grid h-9 w-9 place-items-center rounded-lg bg-ink-900 text-white">
                <User className="h-4 w-4" />
              </span>
              <div>
                <h2 className="text-lg font-bold text-ink-900">Passenger Details</h2>
                <p className="text-sm text-ink-500">Fill in details for each selected seat.</p>
              </div>
            </div>

            <div className="mt-5 space-y-5">
              {(selected.length ? selected : ['—']).map((seat, i) => (
                <div key={seat} className="rounded-2xl border border-ink-100 p-4">
                  <div className="mb-3 flex items-center justify-between">
                    <span className="flex items-center gap-2 font-semibold text-ink-900">
                      <span className="grid h-6 w-6 place-items-center rounded-full bg-ink-100 text-xs">
                        {i + 1}
                      </span>
                      Passenger {i + 1}
                    </span>
                    <span className="chip bg-ink-50 text-ink-700">Seat {seat}</span>
                  </div>
                  <div className="grid gap-3 md:grid-cols-3">
                    <div>
                      <label className="label">Full name</label>
                      <input className="input" placeholder="e.g. Amina Uwimana" defaultValue={i === 0 ? 'Amina Uwimana' : ''} />
                    </div>
                    <div>
                      <label className="label">Phone number</label>
                      <input className="input" placeholder="+250 788 123 456" defaultValue={i === 0 ? '+250 788 123 456' : ''} />
                    </div>
                    <div>
                      <label className="label">Email address</label>
                      <input className="input" placeholder="you@email.com" defaultValue={i === 0 ? 'amina.u@email.com' : ''} />
                    </div>
                  </div>
                </div>
              ))}

              <label className="flex items-center gap-2.5 text-sm text-ink-600">
                <input type="checkbox" defaultChecked className="h-4 w-4 rounded border-ink-200 text-ink-900 focus:ring-ink-900" />
                Receive booking confirmation and trip updates via SMS
              </label>
            </div>
          </div>
        </div>

        {/* Booking summary */}
        <aside className="lg:sticky lg:top-20 lg:self-start">
          <div className="card overflow-hidden">
            <div className="bg-ink-900 p-5 text-white">
              <div className="flex items-center justify-between">
                <span className="font-bold">Booking Summary</span>
                <Bus className="h-5 w-5 text-white/70" />
              </div>
              <div className="mt-3 flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-lg bg-white/10 text-sm font-bold">
                  VE
                </span>
                <div>
                  <div className="font-semibold">Volcano Express</div>
                  <div className="flex items-center gap-1 text-xs text-white/60">
                    Bus KGL-0274 · Economy
                    <Star className="ml-1 h-3 w-3 fill-flame-500 text-flame-500" /> 4.8
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4 p-5">
              <div className="space-y-3">
                <Leg time="08:00 AM" city="Kigali" place="Nyabugogo Terminal" />
                <div className="flex items-center gap-2 pl-1 text-xs text-ink-400">
                  <span className="ml-[3px] h-6 w-px bg-ink-200" />
                  3h 30m · Direct
                </div>
                <Leg time="11:30 AM" city="Huye" place="Huye Main Station" />
              </div>

              <div className="flex items-center gap-2 rounded-xl bg-ink-50 px-3 py-2 text-sm text-ink-600">
                <Calendar className="h-4 w-4 text-ink-400" /> Tuesday, 15 July 2025
              </div>

              <div>
                <div className="label">Selected seats</div>
                <div className="flex flex-wrap gap-2">
                  {selected.length ? (
                    selected.map((s) => (
                      <span key={s} className="chip bg-ink-900 text-white">{s}</span>
                    ))
                  ) : (
                    <span className="text-sm text-ink-400">No seats selected</span>
                  )}
                </div>
              </div>

              <div className="flex gap-4 border-y border-ink-100 py-3 text-ink-500">
                <span className="flex items-center gap-1.5 text-xs"><Wifi className="h-3.5 w-3.5" /> WiFi</span>
                <span className="flex items-center gap-1.5 text-xs"><Snowflake className="h-3.5 w-3.5" /> AC</span>
                <span className="flex items-center gap-1.5 text-xs"><BatteryCharging className="h-3.5 w-3.5" /> Charging</span>
              </div>

              <div className="space-y-2 text-sm">
                <Row label={`Ticket × ${selected.length || 0} passenger${selected.length === 1 ? '' : 's'}`} value={rwf(selected.length * PRICE)} />
                <Row label="Service fee" value={rwf(selected.length ? SERVICE_FEE : 0)} />
                <Row label="Online discount" value={`- ${rwf(selected.length ? DISCOUNT : 0)}`} accent />
                <div className="flex items-center justify-between border-t border-ink-100 pt-2.5">
                  <span className="font-bold text-ink-900">Total Amount</span>
                  <span className="text-xl font-extrabold text-ink-900">{rwf(total)}</span>
                </div>
              </div>

              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
                  <input className="input pl-9" placeholder="Promo code" />
                </div>
                <button className="btn-outline">Apply</button>
              </div>

              <button
                onClick={() => navigate('/booking/processing')}
                disabled={!selected.length}
                className="btn-primary w-full py-3.5"
              >
                Proceed to Payment <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}

function Seat({
  id,
  booked,
  selected,
  onClick,
}: {
  id: string
  booked: boolean
  selected: boolean
  onClick: (id: string) => void
}) {
  return (
    <button
      onClick={() => onClick(id)}
      disabled={booked}
      title={booked ? `${id} · Booked` : id}
      className={cn(
        'grid h-9 w-9 place-items-center rounded-lg border text-[11px] font-semibold transition',
        booked && 'cursor-not-allowed border-ink-100 bg-ink-100 text-ink-300',
        selected && 'border-ink-900 bg-ink-900 text-white',
        !booked && !selected && 'border-ink-200 bg-white text-ink-500 hover:border-ink-900 hover:text-ink-900',
      )}
    >
      {id}
    </button>
  )
}

function Legend({ className, label }: { className: string; label: string }) {
  return (
    <span className="flex items-center gap-1.5 text-ink-500">
      <span className={cn('h-4 w-4 rounded', className)} /> {label}
    </span>
  )
}

function Leg({ time, city, place }: { time: string; city: string; place: string }) {
  return (
    <div className="flex items-start gap-2">
      <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-flame-600" />
      <div>
        <div className="text-sm font-semibold text-ink-900">
          {city} <span className="text-ink-400">· {time}</span>
        </div>
        <div className="text-xs text-ink-400">{place}</div>
      </div>
    </div>
  )
}

function Row({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-ink-500">{label}</span>
      <span className={cn('font-semibold', accent ? 'text-emerald-600' : 'text-ink-900')}>{value}</span>
    </div>
  )
}
