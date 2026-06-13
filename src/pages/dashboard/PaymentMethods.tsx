import { useState } from 'react'
import { Smartphone, CreditCard, Plus, Trash2, Check } from 'lucide-react'
import { type PaymentMethod } from '../../data/mock'
import { cn, rwf } from '../../lib/utils'
import { useAccount } from '../../store/account'

export default function PaymentMethods() {
  const { paymentMethods, removePaymentMethod } = useAccount()

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-extrabold text-ink-900">Payment Methods</h1>
          <p className="text-ink-500">Manage how you pay for trips and parcels.</p>
        </div>
        <button className="btn-primary">
          <Plus className="h-4 w-4" /> Add Method
        </button>
      </div>

      {/* Wallet balance */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-ink-900 to-ink-700 p-6 text-white">
        <div className="pointer-events-none absolute -right-8 -top-8 h-40 w-40 rounded-full bg-flame-600/30 blur-2xl" />
        <div className="relative flex items-center justify-between">
          <div>
            <div className="text-sm text-white/60">TapaRide Wallet</div>
            <div className="mt-1 text-3xl font-extrabold">{rwf(12500)}</div>
            <div className="mt-1 text-xs text-white/50">Available balance</div>
          </div>
          <button className="btn bg-white/10 text-white hover:bg-white/20">Top up</button>
        </div>
      </div>

      {paymentMethods.length === 0 ? (
        <div className="card flex flex-col items-center gap-3 p-12 text-center">
          <span className="grid h-14 w-14 place-items-center rounded-2xl bg-ink-50 text-ink-300">
            <CreditCard className="h-6 w-6" />
          </span>
          <div>
            <h3 className="font-bold text-ink-900">No payment methods</h3>
            <p className="mt-1 text-sm text-ink-500">Add a Mobile Money number or card to pay faster.</p>
          </div>
          <button className="btn-primary mt-1">
            <Plus className="h-4 w-4" /> Add Method
          </button>
        </div>
      ) : (
        <div className="grid gap-4">
          {paymentMethods.map((m) => (
            <MethodCard key={m.id} method={m} onRemove={() => removePaymentMethod(m.id)} />
          ))}
        </div>
      )}
    </div>
  )
}

function MethodCard({ method, onRemove }: { method: PaymentMethod; onRemove: () => void }) {
  const Icon = method.kind === 'momo' ? Smartphone : CreditCard
  const [confirming, setConfirming] = useState(false)

  return (
    <div className="card flex items-center gap-4 p-5">
      <span
        className={cn(
          'grid h-12 w-12 place-items-center rounded-xl',
          method.kind === 'momo' ? 'bg-amber-100 text-amber-700' : 'bg-ink-50 text-ink-900',
        )}
      >
        <Icon className="h-5 w-5" />
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-ink-900">{method.label}</span>
          {method.primary && (
            <span className="chip bg-emerald-100 text-emerald-700">
              <Check className="h-3 w-3" /> Primary
            </span>
          )}
        </div>
        <div className="text-sm text-ink-400">{method.detail}</div>
      </div>

      {confirming ? (
        <div className="flex items-center gap-2">
          <span className="hidden text-xs text-ink-500 sm:block">Remove?</span>
          <button
            onClick={onRemove}
            className="rounded-lg bg-flame-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-flame-700"
          >
            Yes, remove
          </button>
          <button
            onClick={() => setConfirming(false)}
            className="rounded-lg px-3 py-1.5 text-xs font-semibold text-ink-500 hover:bg-ink-50"
          >
            Cancel
          </button>
        </div>
      ) : (
        <button
          onClick={() => setConfirming(true)}
          className="grid h-9 w-9 place-items-center rounded-lg text-ink-300 hover:bg-flame-50 hover:text-flame-600"
          aria-label={`Remove ${method.label}`}
        >
          <Trash2 className="h-4 w-4" />
        </button>
      )}
    </div>
  )
}
