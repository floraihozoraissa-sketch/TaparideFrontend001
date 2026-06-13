import { useState } from 'react'
import {
  LifeBuoy,
  Mail,
  Phone,
  MessageCircle,
  ChevronDown,
  Bus,
  Package,
  CreditCard,
} from 'lucide-react'
import { cn } from '../lib/utils'

const channels = [
  { icon: Phone, title: 'Call us', detail: '+250 788 000 000', note: 'Mon–Sun, 6am–10pm' },
  { icon: Mail, title: 'Email', detail: 'support@taparide.rw', note: 'Replies within 24h' },
  { icon: MessageCircle, title: 'Live chat', detail: 'Start a conversation', note: 'Avg. wait 2 min' },
]

const categories = [
  { icon: Bus, label: 'Bookings & Trips' },
  { icon: Package, label: 'Parcels & Delivery' },
  { icon: CreditCard, label: 'Payments & Refunds' },
]

const faqs = [
  {
    q: 'How do I change or cancel my booking?',
    a: 'Go to My Trips in your dashboard, select the trip, and choose Change or Cancel. Refunds follow our cancellation policy based on how far ahead you cancel.',
  },
  {
    q: 'How can I track my parcel?',
    a: 'Use the tracking code sent to you via SMS on the Track page, or open My Parcels in your dashboard to see live status and location.',
  },
  {
    q: 'Which payment methods are supported?',
    a: 'We support MTN and Airtel Mobile Money, Visa, and Mastercard. You can also top up your TapaRide Wallet for faster checkout.',
  },
  {
    q: 'Can I select my seat in advance?',
    a: 'Yes. After choosing a bus, you can pick available seats on the interactive seat map before paying.',
  },
]

export default function Support() {
  const [open, setOpen] = useState(0)

  return (
    <div className="bg-mist">
      <section className="bg-gradient-to-b from-ink-900 to-ink-800 py-16 text-white">
        <div className="container-page mx-auto max-w-2xl text-center">
          <span className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-white/10">
            <LifeBuoy className="h-6 w-6" />
          </span>
          <h1 className="text-3xl font-extrabold sm:text-4xl">How can we help?</h1>
          <p className="mt-2 text-white/70">
            Search our help center or reach out to our support team directly.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {categories.map((c) => (
              <span key={c.label} className="chip bg-white/10 text-white">
                <c.icon className="h-3.5 w-3.5" /> {c.label}
              </span>
            ))}
          </div>
        </div>
      </section>

      <div className="container-page py-12">
        <div className="grid gap-4 sm:grid-cols-3">
          {channels.map((c) => (
            <div key={c.title} className="card p-6 text-center">
              <span className="mx-auto grid h-12 w-12 place-items-center rounded-xl bg-ink-900 text-white">
                <c.icon className="h-5 w-5" />
              </span>
              <h3 className="mt-3 font-bold text-ink-900">{c.title}</h3>
              <div className="mt-1 font-semibold text-flame-600">{c.detail}</div>
              <div className="text-xs text-ink-400">{c.note}</div>
            </div>
          ))}
        </div>

        <div className="mx-auto mt-12 max-w-3xl">
          <h2 className="text-center text-2xl font-extrabold text-ink-900">
            Frequently asked questions
          </h2>
          <div className="mt-6 space-y-3">
            {faqs.map((f, i) => (
              <div key={f.q} className="card overflow-hidden">
                <button
                  onClick={() => setOpen(open === i ? -1 : i)}
                  className="flex w-full items-center justify-between gap-4 p-5 text-left"
                >
                  <span className="font-semibold text-ink-900">{f.q}</span>
                  <ChevronDown
                    className={cn(
                      'h-5 w-5 shrink-0 text-ink-400 transition',
                      open === i && 'rotate-180',
                    )}
                  />
                </button>
                {open === i && (
                  <p className="px-5 pb-5 text-sm leading-relaxed text-ink-500">{f.a}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
