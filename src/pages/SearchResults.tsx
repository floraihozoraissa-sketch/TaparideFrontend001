import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  SlidersHorizontal,
  ArrowRight,
  Sun,
  Sunset,
  Moon,
  Lightbulb,
  Bus,
  ChevronLeft,
  ChevronRight,
  Calendar,
  Pencil,
  Info,
} from 'lucide-react'
import { busTrips, busCompanies, type BusTrip } from '../data/mock'
import AmenityIcons from '../components/AmenityIcons'
import { cn, rwf } from '../lib/utils'

const departureWindows = [
  { key: 'morning', label: 'Morning', sub: '6am–12pm', icon: Sun },
  { key: 'afternoon', label: 'Afternoon', sub: '12pm–6pm', icon: Sunset },
  { key: 'evening', label: 'Evening', sub: '6pm–10pm', icon: Moon },
]

const amenityFilters = ['WiFi on Board', 'Air Conditioning', 'USB Charging', 'Onboard Restroom']

const tagStyles: Record<NonNullable<BusTrip['tag']>, string> = {
  Fastest: 'bg-ink-100 text-ink-700',
  'Best Value': 'bg-emerald-100 text-emerald-700',
  'Almost Full': 'bg-flame-100 text-flame-700',
}

export default function SearchResults() {
  const [windows, setWindows] = useState<string[]>(['morning'])
  const [companies, setCompanies] = useState<string[]>(['Volcano Express', 'Ritco Express'])
  const [amenities, setAmenities] = useState<string[]>(['WiFi on Board', 'Air Conditioning'])
  const [sort, setSort] = useState('departure')

  const toggle = (
    val: string,
    list: string[],
    setter: (v: string[]) => void,
  ) => setter(list.includes(val) ? list.filter((x) => x !== val) : [...list, val])

  const sorted = useMemo(() => {
    const copy = [...busTrips]
    if (sort === 'price') copy.sort((a, b) => a.price - b.price)
    if (sort === 'duration')
      copy.sort((a, b) => parseFloat(a.duration) - parseFloat(b.duration))
    return copy
  }, [sort])

  return (
    <div className="bg-mist">
      {/* Search summary bar */}
      <div className="border-b border-ink-100 bg-white">
        <div className="container-page flex flex-wrap items-center gap-3 py-4">
          <span className="flex items-center gap-2 rounded-xl border border-ink-100 px-4 py-2 text-sm font-semibold text-ink-900">
            Kigali <ArrowRight className="h-4 w-4 text-flame-600" /> Huye
          </span>
          <span className="flex items-center gap-2 rounded-xl border border-ink-100 px-4 py-2 text-sm text-ink-600">
            <Calendar className="h-4 w-4 text-ink-400" /> Tue, 15 Jul 2025
          </span>
          <span className="rounded-xl border border-ink-100 px-4 py-2 text-sm text-ink-600">
            1 Passenger
          </span>
          <Link to="/" className="btn-primary ml-auto px-4 py-2">
            <Pencil className="h-3.5 w-3.5" /> Edit Search
          </Link>
          <span className="hidden items-center gap-1.5 text-sm text-ink-500 lg:flex">
            <Bus className="h-4 w-4" /> <strong className="text-ink-900">{busTrips.length} buses</strong> found
          </span>
        </div>
      </div>

      <div className="container-page grid gap-6 py-8 lg:grid-cols-[300px_1fr]">
        {/* Filters */}
        <aside className="space-y-5 lg:sticky lg:top-20 lg:self-start">
          <div className="card p-5">
            <div className="flex items-center justify-between">
              <h3 className="flex items-center gap-2 font-bold text-ink-900">
                <SlidersHorizontal className="h-4 w-4" /> Filters
              </h3>
              <button className="text-xs font-semibold text-flame-600">Clear All</button>
            </div>

            <Section title="Departure Time">
              <div className="grid grid-cols-3 gap-2">
                {departureWindows.map((w) => {
                  const active = windows.includes(w.key)
                  return (
                    <button
                      key={w.key}
                      onClick={() => toggle(w.key, windows, setWindows)}
                      className={cn(
                        'flex flex-col items-center gap-1 rounded-xl border px-2 py-3 text-center transition',
                        active
                          ? 'border-ink-900 bg-ink-900 text-white'
                          : 'border-ink-100 text-ink-500 hover:border-ink-200',
                      )}
                    >
                      <w.icon className="h-4 w-4" />
                      <span className="text-xs font-semibold">{w.label}</span>
                      <span className={cn('text-[10px]', active ? 'text-white/70' : 'text-ink-300')}>
                        {w.sub}
                      </span>
                    </button>
                  )
                })}
              </div>
            </Section>

            <Section title="Bus Company">
              <div className="space-y-2.5">
                {busCompanies.map((c) => (
                  <label key={c.name} className="flex cursor-pointer items-center gap-2.5 text-sm">
                    <input
                      type="checkbox"
                      checked={companies.includes(c.name)}
                      onChange={() => toggle(c.name, companies, setCompanies)}
                      className="h-4 w-4 rounded border-ink-200 text-ink-900 focus:ring-ink-900"
                    />
                    <span className="flex-1 text-ink-600">{c.name}</span>
                    <span className="text-xs text-ink-300">{c.count}</span>
                  </label>
                ))}
              </div>
            </Section>

            <Section title="Price Range">
              <input type="range" min={2000} max={6000} defaultValue={4500} className="w-full accent-ink-900" />
              <div className="mt-2 flex justify-between text-xs font-semibold text-ink-600">
                <span>RWF 2,000</span>
                <span>RWF 6,000</span>
              </div>
            </Section>

            <Section title="Amenities" last>
              <div className="space-y-2.5">
                {amenityFilters.map((a) => (
                  <label key={a} className="flex cursor-pointer items-center gap-2.5 text-sm">
                    <input
                      type="checkbox"
                      checked={amenities.includes(a)}
                      onChange={() => toggle(a, amenities, setAmenities)}
                      className="h-4 w-4 rounded border-ink-200 text-ink-900 focus:ring-ink-900"
                    />
                    <span className="text-ink-600">{a}</span>
                  </label>
                ))}
              </div>
            </Section>
          </div>

          <div className="rounded-2xl border border-ink-100 bg-ink-50 p-4">
            <div className="flex items-center gap-2 font-semibold text-ink-900">
              <Lightbulb className="h-4 w-4 text-flame-600" /> Travel Tip
            </div>
            <p className="mt-1.5 text-xs leading-relaxed text-ink-500">
              Booking early secures better seats. The 08:00 AM Volcano Express is the most
              popular bus on this route.
            </p>
          </div>
        </aside>

        {/* Results */}
        <div>
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h1 className="text-2xl font-extrabold text-ink-900">Kigali → Huye</h1>
              <p className="text-sm text-ink-500">Tuesday, 15 July 2025 · 1 Passenger</p>
            </div>
            <label className="flex items-center gap-2 text-sm text-ink-500">
              Sort by
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="rounded-xl border border-ink-100 bg-white px-3 py-2 font-semibold text-ink-900 outline-none"
              >
                <option value="departure">Departure Time</option>
                <option value="price">Lowest Price</option>
                <option value="duration">Shortest Duration</option>
              </select>
            </label>
          </div>

          <div className="space-y-4">
            {sorted.map((t) => (
              <BusCard key={t.id} trip={t} />
            ))}
          </div>

          {/* No more buses */}
          <div className="mt-6 grid gap-4 rounded-2xl border border-ink-100 bg-white p-6 sm:grid-cols-[1fr_auto] sm:items-center">
            <div className="flex items-start gap-3">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-ink-50 text-ink-400">
                <Bus className="h-5 w-5" />
              </span>
              <div>
                <h3 className="font-bold text-ink-900">No more buses for this date</h3>
                <p className="mt-1 text-sm text-ink-500">
                  All available buses for Kigali → Huye on Tuesday, 15 Jul are shown above.
                  Try a different date to find more options.
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <button className="btn-outline px-3 py-2 text-xs">
                    <ChevronLeft className="h-3.5 w-3.5" /> Previous Day
                  </button>
                  <button className="btn-primary px-3 py-2 text-xs">
                    Next Day <ChevronRight className="h-3.5 w-3.5" />
                  </button>
                  <Link to="/no-buses" className="btn-ghost px-3 py-2 text-xs">
                    <Calendar className="h-3.5 w-3.5" /> Pick Another Date
                  </Link>
                </div>
              </div>
            </div>
            <div className="max-w-xs rounded-xl bg-ink-50 p-4">
              <div className="flex items-center gap-1.5 text-sm font-semibold text-ink-900">
                <Info className="h-4 w-4 text-flame-600" /> Did you know?
              </div>
              <p className="mt-1 text-xs text-ink-500">
                Wednesday, 16 Jul has 8 buses available for this route, including an early
                06:30 AM departure.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function Section({
  title,
  children,
  last,
}: {
  title: string
  children: React.ReactNode
  last?: boolean
}) {
  return (
    <div className={cn('border-b border-ink-100 py-4', last && 'border-b-0 pb-0')}>
      <h4 className="mb-3 text-xs font-bold uppercase tracking-wide text-ink-400">{title}</h4>
      {children}
    </div>
  )
}

function BusCard({ trip }: { trip: BusTrip }) {
  return (
    <div
      className={cn(
        'card relative p-5 transition hover:shadow-glow',
        trip.tag === 'Fastest' && 'ring-1 ring-ink-900/10',
      )}
    >
      {trip.tag && (
        <span className={cn('chip absolute -top-2.5 left-5', tagStyles[trip.tag])}>
          {trip.tag}
        </span>
      )}
      <div className="grid items-center gap-4 md:grid-cols-[auto_1fr_auto]">
        <div className="flex items-center gap-3">
          <span
            className={cn(
              'grid h-12 w-12 place-items-center rounded-xl text-sm font-bold text-white',
              trip.iconColor,
            )}
          >
            {trip.initials}
          </span>
          <div className="md:hidden">
            <div className="font-semibold text-ink-900">{trip.company}</div>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-[1fr_auto] sm:items-center">
          <div className="flex items-center gap-4">
            <div>
              <div className="text-xl font-extrabold text-ink-900">{trip.depTime}</div>
              <div className="text-xs text-ink-400">{trip.depCity}</div>
            </div>
            <div className="flex flex-1 flex-col items-center px-2">
              <span className="text-xs font-semibold text-ink-500">{trip.duration}</span>
              <span className="my-1 flex w-full items-center">
                <span className="h-1.5 w-1.5 rounded-full bg-ink-300" />
                <span className="h-px flex-1 bg-ink-200" />
                <span className="h-1.5 w-1.5 rounded-full bg-ink-300" />
              </span>
              <span className="text-[10px] text-ink-400">{trip.stops}</span>
            </div>
            <div>
              <div className="text-xl font-extrabold text-ink-900">{trip.arrTime}</div>
              <div className="text-xs text-ink-400">{trip.arrCity}</div>
            </div>
          </div>
          <div className="hidden sm:block">
            <AmenityIcons amenities={trip.amenities} />
          </div>
        </div>

        <div className="flex items-center justify-between gap-4 border-t border-ink-100 pt-4 md:flex-col md:items-end md:border-l md:border-t-0 md:pl-5 md:pt-0">
          <div className="text-right">
            <div className="hidden text-[10px] uppercase tracking-wide text-ink-300 md:block">
              Per person
            </div>
            <div className="text-2xl font-extrabold text-ink-900">{rwf(trip.price)}</div>
            <div
              className={cn(
                'text-xs font-semibold',
                trip.seatsLeft <= 5 ? 'text-flame-600' : 'text-emerald-600',
              )}
            >
              {trip.seatsLeft} seats left
            </div>
          </div>
          {trip.seatsLeft <= 3 ? (
            <Link to="/waitlist" className="btn-flame whitespace-nowrap px-5 py-2.5">
              Join Waitlist
            </Link>
          ) : (
            <Link to="/booking" className="btn-primary whitespace-nowrap px-5 py-2.5">
              Select Seat
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
