import { Link } from 'react-router-dom'
import { XCircle, Smartphone, RotateCcw, CreditCard } from 'lucide-react'

export default function PaymentFailed() {
  return (
    <div className="bg-mist py-12">
      <div className="container-page">
        <div className="mx-auto max-w-md card p-8 text-center">
          <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-flame-100 text-flame-600">
            <XCircle className="h-8 w-8" />
          </span>
          <h1 className="mt-5 text-2xl font-extrabold text-ink-900">Payment Failed</h1>
          <div className="mt-3 rounded-xl bg-flame-50 p-3 text-sm font-medium text-flame-700">
            Insufficient funds in MoMo wallet
          </div>

          <div className="mt-5 flex items-center gap-3 rounded-xl border border-ink-100 p-4 text-left">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-amber-100 text-amber-700">
              <Smartphone className="h-5 w-5" />
            </span>
            <div>
              <div className="font-semibold text-ink-900">MTN MoMo</div>
              <div className="text-xs text-ink-400">•••• 4521</div>
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-3">
            <Link to="/booking/processing" className="btn-primary">
              <RotateCcw className="h-4 w-4" /> Retry Transaction
            </Link>
            <Link to="/booking" className="btn-outline">
              <CreditCard className="h-4 w-4" /> Try another method
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
