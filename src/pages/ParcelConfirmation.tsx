import { Link } from 'react-router-dom'
import { CheckCircle2, Copy, MapPin, Package, ArrowRight, Bell } from 'lucide-react'
import Stepper from '../components/Stepper'
import { rwf } from '../lib/utils'

export default function ParcelConfirmation() {
  const code = 'TR-9K2L-88X'
  return (
    <div className="bg-mist pb-16">
      <div className="border-b border-ink-100 bg-white py-5">
        <div className="container-page">
          <Stepper steps={['Route', 'Details', 'Payment']} current={3} />
        </div>
      </div>

      <div className="container-page py-12">
        <div className="mx-auto max-w-lg text-center">
          <span className="mx-auto grid h-16 w-16 animate-fade-in place-items-center rounded-full bg-emerald-100 text-emerald-600">
            <CheckCircle2 className="h-8 w-8" />
          </span>
          <h1 className="mt-5 text-3xl font-extrabold text-ink-900">Parcel booked!</h1>
          <p className="mt-2 text-ink-500">
            Drop your parcel at the pickup station. Use the tracking code below to follow its journey.
          </p>
        </div>

        <div className="mx-auto mt-8 max-w-lg space-y-4">
          <div className="card p-6 text-center">
            <div className="text-xs uppercase tracking-wide text-ink-400">Your tracking code</div>
            <div className="mt-2 flex items-center justify-center gap-3">
              <span className="text-2xl font-extrabold tracking-wider text-ink-900">{code}</span>
              <button className="grid h-9 w-9 place-items-center rounded-lg bg-ink-50 text-ink-600 hover:bg-ink-100" aria-label="copy">
                <Copy className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="card p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 font-bold text-ink-900">
                <Package className="h-5 w-5" /> Box · 5 kg
              </div>
              <span className="font-extrabold text-ink-900">{rwf(2500)}</span>
            </div>
            <div className="mt-4 flex items-center justify-between text-sm">
              <Leg city="Kigali" place="Nyabugogo" />
              <ArrowRight className="h-5 w-5 text-flame-600" />
              <Leg city="Huye" place="Main Terminal" right />
            </div>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <Link to="/track" className="btn-primary flex-1">
                Track Parcel <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/dashboard/parcels" className="btn-outline flex-1">
                My Parcels
              </Link>
            </div>
          </div>

          <div className="flex items-start gap-3 rounded-2xl border border-ink-100 bg-white p-4">
            <Bell className="mt-0.5 h-5 w-5 text-flame-600" />
            <p className="text-sm text-ink-500">
              You'll get SMS updates at every step — from pickup to delivery — including live GPS location.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

function Leg({ city, place, right }: { city: string; place: string; right?: boolean }) {
  return (
    <div className={right ? 'text-right' : ''}>
      <div className="flex items-center gap-1.5 font-semibold text-ink-900">
        {!right && <MapPin className="h-4 w-4 text-flame-600" />}
        {city}
        {right && <MapPin className="h-4 w-4 text-flame-600" />}
      </div>
      <div className="text-xs text-ink-400">{place}</div>
    </div>
  )
}
