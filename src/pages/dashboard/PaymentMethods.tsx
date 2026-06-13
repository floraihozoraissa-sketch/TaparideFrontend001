import { Smartphone, CreditCard, Plus, Trash2, Check } from 'lucide-react'
import { paymentMethods, type PaymentMethod } from '../../data/mock'
import { cn, rwf } from '../../lib/utils'

export default function PaymentMethods() {
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

      <div className="grid gap-4">
        {paymentMethods.map((m) => (
          <MethodCard key={m.id} method={m} />
        ))}
      </div>
    </div>
  )
}

function MethodCard({ method }: { method: PaymentMethod }) {
  const Icon = method.kind === 'momo' ? Smartphone : CreditCard
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
      <button className="grid h-9 w-9 place-items-center rounded-lg text-ink-300 hover:bg-flame-50 hover:text-flame-600" aria-label="remove">
        <Trash2 className="h-4 w-4" />
      </button>
    </div>
  )
}
