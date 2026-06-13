import { Link } from 'react-router-dom'
import { CheckCircle2, Download, Calendar, MapPin, Ticket, ArrowRight } from 'lucide-react'
import Stepper from '../components/Stepper'
import { rwf } from '../lib/utils'

export default function Confirmation() {
  return (
    <div className="bg-mist pb-16">
      <div className="border-b border-ink-100 bg-white py-5">
        <div className="container-page">
          <Stepper steps={['Select Bus', 'Select Seat', 'Payment', 'Confirmation']} current={3} />
        </div>
      </div>

      <div className="container-page py-12">
        <div className="mx-auto max-w-lg text-center">
          <span className="mx-auto grid h-16 w-16 animate-fade-in place-items-center rounded-full bg-emerald-100 text-emerald-600">
            <CheckCircle2 className="h-8 w-8" />
          </span>
          <h1 className="mt-5 text-3xl font-extrabold text-ink-900">Booking confirmed!</h1>
          <p className="mt-2 text-ink-500">
            Your seats are reserved. We've sent your e-ticket and trip details to your phone and email.
          </p>
        </div>

        <div className="mx-auto mt-8 max-w-lg">
          <div className="card overflow-hidden">
            <div className="flex items-center justify-between bg-ink-900 p-5 text-white">
              <div className="flex items-center gap-2">
                <Ticket className="h-5 w-5" />
                <span className="font-bold">E-Ticket</span>
              </div>
              <span className="chip bg-white/10 text-white">TR-8841</span>
            </div>
            <div className="space-y-4 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-extrabold text-ink-900">08:00 AM</div>
                  <div className="text-xs text-ink-400">Kigali · Nyabugogo</div>
                </div>
                <ArrowRight className="h-5 w-5 text-flame-600" />
                <div className="text-right">
                  <div className="text-2xl font-extrabold text-ink-900">11:30 AM</div>
                  <div className="text-xs text-ink-400">Huye · Main Station</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 border-y border-dashed border-ink-200 py-4 text-sm">
                <Meta icon={Calendar} label="Date" value="Tue, 15 Jul 2025" />
                <Meta icon={MapPin} label="Carrier" value="Volcano Express" />
                <Meta icon={Ticket} label="Seats" value="A2, B2" />
                <Meta icon={CheckCircle2} label="Paid" value={rwf(7100)} />
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <button className="btn-primary flex-1">
                  <Download className="h-4 w-4" /> Download Ticket
                </button>
                <Link to="/dashboard/trips" className="btn-outline flex-1">
                  View My Trips
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-6 text-center">
            <Link to="/" className="text-sm font-semibold text-ink-500 hover:text-ink-900">
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

function Meta({ icon: Icon, label, value }: { icon: typeof Calendar; label: string; value: string }) {
  return (
    <div className="flex items-center gap-2.5">
      <span className="grid h-8 w-8 place-items-center rounded-lg bg-ink-50 text-ink-500">
        <Icon className="h-4 w-4" />
      </span>
      <div>
        <div className="text-[10px] uppercase tracking-wide text-ink-300">{label}</div>
        <div className="font-semibold text-ink-900">{value}</div>
      </div>
    </div>
  )
}
