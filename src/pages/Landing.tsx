import { Link } from 'react-router-dom'
import {
  ArrowRight,
  Smartphone,
  Bus,
  Package,
  Search,
  ShieldCheck,
  Navigation,
  Star,
} from 'lucide-react'
import SearchWidget from '../components/SearchWidget'
import { destinations } from '../data/mock'

const services = [
  {
    icon: Bus,
    title: 'Book a Bus',
    blurb:
      'Travel comfortably across Rwanda with our network of premium buses. Real-time availability, secure payments, and digital tickets.',
    cta: 'Find Routes',
    to: '/search',
    image:
      'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=900&q=70',
  },
  {
    icon: Package,
    title: 'Send a Parcel',
    blurb:
      'Fast, reliable, and trackable parcel delivery between major cities. From small envelopes to large cargo, we handle it with care.',
    cta: 'Get a Quote',
    to: '/send-parcel',
    image:
      'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=900&q=70',
  },
]

const steps = [
  {
    icon: Search,
    title: 'Search & Compare',
    blurb:
      'Enter your route details to find available buses or calculate parcel delivery rates instantly.',
  },
  {
    icon: ShieldCheck,
    title: 'Book Securely',
    blurb:
      'Select your preferred seats and pay securely using Mobile Money or Card in just a few taps.',
  },
  {
    icon: Navigation,
    title: 'Travel or Track',
    blurb:
      "Board with your digital ticket, or track your parcel's journey in real time until delivery.",
  },
]

const stats = [
  { value: '120K+', label: 'Trips booked' },
  { value: '15+', label: 'Cities connected' },
  { value: '8', label: 'Partner carriers' },
  { value: '4.8★', label: 'Average rating' },
]

export default function Landing() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-mist via-white to-white">
        <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-ink-100/60 blur-3xl" />
        <div className="pointer-events-none absolute -left-24 top-40 h-72 w-72 rounded-full bg-flame-100/50 blur-3xl" />
        <div className="container-page relative grid items-center gap-12 py-16 lg:grid-cols-2 lg:py-24">
          <div className="animate-fade-up">
            <span className="chip bg-ink-50 text-ink-700">
              <span className="h-1.5 w-1.5 rounded-full bg-flame-600" /> Now live across Rwanda
            </span>
            <h1 className="mt-5 text-4xl font-extrabold leading-[1.05] tracking-tight text-ink-900 sm:text-5xl lg:text-6xl">
              Travel smart. <br />
              <span className="text-flame-600">Deliver fast.</span>
            </h1>
            <p className="mt-5 max-w-md text-base leading-relaxed text-ink-500 sm:text-lg">
              Book premium bus tickets or send parcels securely across Rwanda. The
              easiest way to move you and your goods.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/search" className="btn-primary px-6 py-3.5 text-base">
                Get Started <ArrowRight className="h-4 w-4" />
              </Link>
              <a href="#download" className="btn-outline px-6 py-3.5 text-base">
                <Smartphone className="h-4 w-4" /> Download App
              </a>
            </div>
            <div className="mt-10 grid max-w-md grid-cols-4 gap-4">
              {stats.map((s) => (
                <div key={s.label}>
                  <div className="text-xl font-extrabold text-ink-900">{s.value}</div>
                  <div className="text-xs text-ink-400">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="animate-fade-up lg:pl-6">
            <SearchWidget />
          </div>
        </div>
      </section>

      {/* Core services */}
      <section className="container-page py-16 lg:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">What we do</span>
          <h2 className="mt-2 text-3xl font-extrabold text-ink-900 sm:text-4xl">
            Our Core Services
          </h2>
          <p className="mt-3 text-ink-500">
            Seamless logistics solutions tailored for your inter-city travel and
            delivery needs.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {services.map((s) => (
            <div key={s.title} className="card group overflow-hidden">
              <div className="relative h-52 overflow-hidden">
                <img
                  src={s.image}
                  alt={s.title}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-950/40 to-transparent" />
                <span className="absolute bottom-4 left-4 grid h-11 w-11 place-items-center rounded-xl bg-white text-ink-900 shadow-soft">
                  <s.icon className="h-5 w-5" />
                </span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-ink-900">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-500">{s.blurb}</p>
                <Link
                  to={s.to}
                  className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-flame-600 transition hover:gap-2.5"
                >
                  {s.cta} <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Popular destinations */}
      <section className="bg-mist py-16 lg:py-24">
        <div className="container-page">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="eyebrow">Explore</span>
              <h2 className="mt-2 text-3xl font-extrabold text-ink-900 sm:text-4xl">
                Popular Destinations
              </h2>
              <p className="mt-2 text-ink-500">
                Explore Rwanda's most frequently traveled routes.
              </p>
            </div>
            <Link
              to="/search"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink-900 hover:gap-2.5"
            >
              View all routes <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {destinations.map((d) => (
              <Link
                to="/search"
                key={d.city}
                className="group relative h-72 overflow-hidden rounded-2xl shadow-card"
              >
                <img
                  src={d.image}
                  alt={d.city}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-950/85 via-ink-950/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                  <span className="chip bg-white/15 text-white backdrop-blur">
                    {d.province}
                  </span>
                  <h3 className="mt-2 text-xl font-bold">{d.city}</h3>
                  <p className="mt-1 text-sm text-white/75">{d.blurb}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="container-page py-16 lg:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">How it works</span>
          <h2 className="mt-2 text-3xl font-extrabold text-ink-900 sm:text-4xl">
            How TapaRide Works
          </h2>
          <p className="mt-3 text-ink-500">
            Simple, transparent, and designed for your convenience.
          </p>
        </div>

        <div className="relative mt-14 grid gap-10 md:grid-cols-3">
          <div className="absolute left-[16%] right-[16%] top-7 hidden h-0.5 bg-ink-100 md:block" />
          {steps.map((s, i) => (
            <div key={s.title} className="relative text-center">
              <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-ink-900 text-white shadow-soft">
                <s.icon className="h-6 w-6" />
                <span className="absolute -right-1 -top-1 grid h-6 w-6 place-items-center rounded-full bg-flame-600 text-xs font-bold text-white">
                  {i + 1}
                </span>
              </div>
              <h3 className="mt-5 text-lg font-bold text-ink-900">{s.title}</h3>
              <p className="mx-auto mt-2 max-w-xs text-sm leading-relaxed text-ink-500">
                {s.blurb}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA / download */}
      <section id="download" className="container-page pb-20">
        <div className="relative overflow-hidden rounded-3xl bg-ink-900 px-8 py-14 text-white shadow-glow sm:px-14">
          <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-flame-600/30 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -left-10 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
          <div className="relative grid items-center gap-8 lg:grid-cols-2">
            <div>
              <div className="mb-3 flex items-center gap-1 text-flame-500">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
                <span className="ml-2 text-sm text-white/70">Loved by 50,000+ travelers</span>
              </div>
              <h2 className="text-3xl font-extrabold sm:text-4xl">
                Get the TapaRide app
              </h2>
              <p className="mt-3 max-w-md text-white/70">
                Book faster, track parcels live, and never miss a trip. Available on iOS
                and Android.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <a href="#" className="btn bg-white text-ink-900 hover:bg-white/90">
                  App Store
                </a>
                <a href="#" className="btn border border-white/25 text-white hover:bg-white/10">
                  Google Play
                </a>
              </div>
            </div>
            <div className="hidden justify-end lg:flex">
              <div className="w-64 rounded-3xl border border-white/15 bg-white/5 p-5 backdrop-blur">
                <SearchPreview />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

function SearchPreview() {
  return (
    <div className="space-y-3 text-sm">
      <div className="rounded-xl bg-white/10 p-3">
        <div className="text-[10px] uppercase tracking-wide text-white/50">Next trip</div>
        <div className="mt-1 font-semibold">Kigali → Huye</div>
        <div className="text-xs text-white/60">Tue, 15 Jul · 08:00 AM · Seat A2</div>
      </div>
      <div className="rounded-xl bg-white/10 p-3">
        <div className="text-[10px] uppercase tracking-wide text-white/50">Parcel</div>
        <div className="mt-1 font-semibold">TR-9K2L-88X</div>
        <div className="text-xs text-flame-500">In transit · Huye</div>
      </div>
      <div className="rounded-xl bg-flame-600 p-3 text-center font-semibold">
        Open TapaRide
      </div>
    </div>
  )
}
