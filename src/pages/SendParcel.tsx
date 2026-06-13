import { useNavigate } from 'react-router-dom'
import {
  User,
  UserCheck,
  Package,
  MapPin,
  ArrowRight,
  Navigation,
  Truck,
  ShieldCheck,
} from 'lucide-react'
import Stepper from '../components/Stepper'
import { cities } from '../data/mock'
import { rwf } from '../lib/utils'

const BASE = 1500
const SURCHARGE = 750
const HANDLING = 250

export default function SendParcel() {
  const navigate = useNavigate()
  const total = BASE + SURCHARGE + HANDLING

  return (
    <div className="bg-mist pb-16">
      <div className="border-b border-ink-100 bg-white py-5">
        <div className="container-page">
          <Stepper steps={['Route', 'Details', 'Payment']} current={1} />
        </div>
      </div>

      <div className="container-page py-8">
        <div className="mb-6">
          <span className="eyebrow">Step 2 of 3 · Parcel Details &amp; Summary</span>
          <h1 className="mt-1 text-2xl font-extrabold text-ink-900">Send a Parcel</h1>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
          <div className="space-y-6">
            <Card icon={User} title="Sender Details" subtitle="Who is sending this parcel?">
              <div className="grid gap-3 md:grid-cols-2">
                <Field label="Full name" placeholder="e.g. Jean Paul Habimana" />
                <Field label="Phone number" placeholder="+250 7XX XXX XXX" />
              </div>
            </Card>

            <Card icon={UserCheck} title="Receiver Details" subtitle="Who will receive this parcel?">
              <div className="grid gap-3 md:grid-cols-2">
                <Field label="Full name" placeholder="e.g. Alice Uwimana" />
                <Field label="Phone number" placeholder="+250 7XX XXX XXX" />
                <div className="md:col-span-2">
                  <label className="label">Destination city</label>
                  <select className="input">
                    {cities.slice(1).map((c) => (
                      <option key={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>
            </Card>

            <Card icon={Package} title="Parcel Information" subtitle="Describe what you're sending.">
              <div className="grid gap-3 md:grid-cols-2">
                <div>
                  <label className="label">Parcel type</label>
                  <select className="input">
                    <option>Box</option>
                    <option>Envelope</option>
                    <option>Bag</option>
                    <option>Electronics</option>
                    <option>Documents</option>
                  </select>
                </div>
                <Field label="Weight (kg)" placeholder="0.0" />
                <div className="md:col-span-2">
                  <label className="label">Description (optional)</label>
                  <textarea className="input min-h-[88px] resize-none" placeholder="Briefly describe the contents of your parcel..." />
                </div>
              </div>
            </Card>

            <Card icon={MapPin} title="Pickup & Dropoff Station" subtitle="Select the bus terminal for your parcel.">
              <div className="grid gap-3 md:grid-cols-2">
                <div>
                  <label className="label">Pickup station</label>
                  <select className="input">
                    <option>Nyabugogo Terminal, Kigali</option>
                    <option>Downtown Terminal, Kigali</option>
                  </select>
                </div>
                <div>
                  <label className="label">Dropoff station (destination)</label>
                  <select className="input">
                    <option>Huye Main Terminal</option>
                    <option>Musanze Central Station</option>
                  </select>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between rounded-xl bg-ink-900 px-4 py-3 text-white">
                <span className="flex items-center gap-2 text-sm font-semibold">
                  <Navigation className="h-4 w-4" /> Kigali → Huye Terminal
                </span>
                <span className="text-right text-xs text-white/70">
                  Est. distance ~130 km · Southern Province
                </span>
              </div>
            </Card>
          </div>

          {/* Shipment summary */}
          <aside className="space-y-4 lg:sticky lg:top-20 lg:self-start">
            <div className="card overflow-hidden">
              <div className="flex items-center justify-between bg-ink-900 p-5 text-white">
                <span className="font-bold">Shipment Summary</span>
                <Truck className="h-5 w-5 text-white/70" />
              </div>
              <div className="space-y-4 p-5">
                <div>
                  <div className="label">Route</div>
                  <div className="space-y-2">
                    <Leg city="Kigali" place="Nyabugogo Terminal" />
                    <Leg city="Huye" place="Huye Main Terminal" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 border-y border-ink-100 py-3 text-sm">
                  <Meta label="Date" value="May 28, 2025" />
                  <Meta label="Est. arrival" value="~4–5 hours" />
                  <Meta label="Parcel type" value="Box" />
                  <Meta label="Weight" value="5 kg" />
                  <Meta label="Carrier" value="Volcano Express" />
                </div>

                <div className="space-y-2 text-sm">
                  <div className="label">Cost breakdown</div>
                  <Row label="Base price" value={rwf(BASE)} />
                  <Row label="Weight surcharge (5 kg)" value={rwf(SURCHARGE)} />
                  <Row label="Handling fee" value={rwf(HANDLING)} />
                </div>

                <div className="flex items-end justify-between border-t border-ink-100 pt-3">
                  <div>
                    <div className="label mb-0">Total amount</div>
                    <span className="chip mt-1 bg-ink-50 text-ink-700">Standard Delivery</span>
                  </div>
                  <span className="text-2xl font-extrabold text-ink-900">{rwf(total)}</span>
                </div>

                <button
                  onClick={() => navigate('/parcel/confirmation')}
                  className="btn-primary w-full py-3.5"
                >
                  Confirm and Pay <ArrowRight className="h-4 w-4" />
                </button>
                <p className="text-center text-[11px] text-ink-400">
                  By proceeding, you agree to TapaRide's Terms &amp; Conditions.
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-ink-100 bg-ink-50 p-4">
              <div className="flex items-center gap-2 font-semibold text-ink-900">
                <ShieldCheck className="h-4 w-4 text-flame-600" /> Real-Time Tracking
              </div>
              <p className="mt-1.5 text-xs leading-relaxed text-ink-500">
                Once confirmed, you'll receive a tracking code via SMS. Monitor your parcel's
                live location from pickup to delivery, every step of the way.
              </p>
              <p className="mt-2 text-xs font-semibold text-flame-600">
                Live GPS tracking enabled on all routes
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}

function Card({
  icon: Icon,
  title,
  subtitle,
  children,
}: {
  icon: typeof User
  title: string
  subtitle: string
  children: React.ReactNode
}) {
  return (
    <div className="card p-6">
      <div className="mb-4 flex items-center gap-3">
        <span className="grid h-9 w-9 place-items-center rounded-lg bg-ink-50 text-ink-900">
          <Icon className="h-4 w-4" />
        </span>
        <div>
          <h2 className="font-bold text-ink-900">{title}</h2>
          <p className="text-xs text-ink-400">{subtitle}</p>
        </div>
      </div>
      {children}
    </div>
  )
}

function Field({ label, placeholder }: { label: string; placeholder: string }) {
  return (
    <div>
      <label className="label">{label}</label>
      <input className="input" placeholder={placeholder} />
    </div>
  )
}

function Leg({ city, place }: { city: string; place: string }) {
  return (
    <div className="flex items-start gap-2">
      <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-flame-600" />
      <div>
        <div className="text-sm font-semibold text-ink-900">{city}</div>
        <div className="text-xs text-ink-400">{place}</div>
      </div>
    </div>
  )
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-[10px] uppercase tracking-wide text-ink-300">{label}</div>
      <div className="font-semibold text-ink-900">{value}</div>
    </div>
  )
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-ink-500">{label}</span>
      <span className="font-semibold text-ink-900">{value}</span>
    </div>
  )
}
