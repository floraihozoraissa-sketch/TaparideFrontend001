import { useState } from 'react'
import { Search, Package, CheckCircle2, Circle, MapPin, Phone, Truck } from 'lucide-react'
import { parcelTimeline } from '../data/mock'
import { cn } from '../lib/utils'
import MapEmbed from '../components/MapEmbed'

export default function Track() {
  const [code, setCode] = useState('')
  const [shown, setShown] = useState(false)

  return (
    <div className="bg-mist">
      <section className="bg-gradient-to-b from-ink-900 to-ink-800 py-16 text-white">
        <div className="container-page mx-auto max-w-2xl text-center">
          <span className="grid mx-auto mb-4 h-14 w-14 place-items-center rounded-2xl bg-white/10">
            <Package className="h-6 w-6" />
          </span>
          <h1 className="text-3xl font-extrabold sm:text-4xl">Track your parcel</h1>
          <p className="mt-2 text-white/70">
            Enter your tracking code to see your parcel's live location and status.
          </p>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              setShown(true)
            }}
            className="mt-7 flex flex-col gap-3 sm:flex-row"
          >
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-ink-300" />
              <input
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="e.g. TR-9K2L-88X"
                className="w-full rounded-xl border border-transparent bg-white py-4 pl-12 pr-4 text-ink-900 outline-none placeholder:text-ink-300"
              />
            </div>
            <button type="submit" className="btn-flame px-7 py-4 text-base">
              Track
            </button>
          </form>
        </div>
      </section>

      <div className="container-page py-12">
        {shown ? (
          <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-[1fr_340px]">
            <div className="card p-6">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-ink-100 pb-5">
                <div>
                  <div className="text-sm text-ink-400">Tracking code</div>
                  <div className="text-lg font-extrabold text-ink-900">{code || 'TR-9K2L-88X'}</div>
                </div>
                <span className="chip bg-flame-100 text-flame-700">In Transit</span>
              </div>

              <div className="mt-6 space-y-0">
                {parcelTimeline.map((step, i) => (
                  <div key={step.label} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      {step.done ? (
                        <CheckCircle2 className="h-6 w-6 text-flame-600" />
                      ) : (
                        <Circle className="h-6 w-6 text-ink-200" />
                      )}
                      {i < parcelTimeline.length - 1 && (
                        <span className={cn('w-px flex-1', step.done ? 'bg-flame-300' : 'bg-ink-100')} />
                      )}
                    </div>
                    <div className={cn('pb-7', !step.done && 'opacity-60')}>
                      <div className="font-semibold text-ink-900">{step.label}</div>
                      <div className="text-sm text-ink-500">{step.place}</div>
                      <div className="text-xs text-ink-400">{step.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <aside className="space-y-4">
              <div className="card overflow-hidden">
                <div className="h-44">
                  <MapEmbed from="Kigali, Rwanda" to="Huye, Rwanda" zoom={9} title="Parcel route: Kigali to Huye" />
                </div>
                <div className="flex items-center gap-2 px-5 py-3 text-xs font-medium text-ink-500">
                  <MapPin className="h-3.5 w-3.5 text-flame-600" /> Live location · en route to Huye
                </div>
              </div>
              <div className="card p-5">
                <h3 className="font-bold text-ink-900">Shipment details</h3>
                <dl className="mt-3 space-y-2.5 text-sm">
                  <Detail icon={MapPin} label="From" value="Kigali — Nyabugogo" />
                  <Detail icon={MapPin} label="To" value="Huye — Main Station" />
                  <Detail icon={Truck} label="Carrier" value="Volcano Express" />
                  <Detail icon={Package} label="Weight" value="5 kg · Box" />
                </dl>
              </div>
              <div className="card p-5">
                <h3 className="font-bold text-ink-900">Need help?</h3>
                <p className="mt-1 text-sm text-ink-500">Contact our support team for any delivery questions.</p>
                <a href="tel:+250788000000" className="btn-outline mt-3 w-full">
                  <Phone className="h-4 w-4" /> Call Support
                </a>
              </div>
            </aside>
          </div>
        ) : (
          <div className="mx-auto max-w-md text-center text-ink-400">
            <Package className="mx-auto h-10 w-10 text-ink-200" />
            <p className="mt-3 text-sm">
              Enter a tracking code above to view your parcel status. Try
              <button onClick={() => { setCode('TR-9K2L-88X'); setShown(true) }} className="mx-1 font-semibold text-flame-600">
                TR-9K2L-88X
              </button>
              for a demo.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

function Detail({ icon: Icon, label, value }: { icon: typeof MapPin; label: string; value: string }) {
  return (
    <div className="flex items-center gap-2.5">
      <Icon className="h-4 w-4 text-ink-300" />
      <span className="flex-1 text-ink-400">{label}</span>
      <span className="font-semibold text-ink-900">{value}</span>
    </div>
  )
}
