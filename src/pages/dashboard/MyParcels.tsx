import { Link } from 'react-router-dom'
import { Package, ArrowRight, Plus } from 'lucide-react'
import { parcels, type Parcel } from '../../data/mock'
import { cn, rwf } from '../../lib/utils'

const statusStyles: Record<Parcel['status'], string> = {
  'In Transit': 'bg-flame-100 text-flame-700',
  Delivered: 'bg-emerald-100 text-emerald-700',
  'Pending Pickup': 'bg-amber-100 text-amber-700',
}

export default function MyParcels() {
  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-extrabold text-ink-900">My Parcels</h1>
          <p className="text-ink-500">Track and manage all your shipments.</p>
        </div>
        <Link to="/send-parcel" className="btn-primary">
          <Plus className="h-4 w-4" /> Send Parcel
        </Link>
      </div>

      <div className="grid gap-4">
        {parcels.map((p) => (
          <div key={p.id} className="card p-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-ink-50 text-ink-900">
                  <Package className="h-5 w-5" />
                </span>
                <div>
                  <div className="font-bold text-ink-900">{p.from} → {p.to}</div>
                  <div className="text-xs text-ink-400">{p.trackingCode}</div>
                </div>
              </div>
              <span className={cn('chip', statusStyles[p.status])}>{p.status}</span>
            </div>
            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-ink-100 pt-3 text-sm">
              <div className="flex flex-wrap gap-x-6 gap-y-1 text-ink-500">
                <span>Date: <strong className="text-ink-900">{p.date}</strong></span>
                <span>Weight: <strong className="text-ink-900">{p.weight}</strong></span>
                <span>Fee: <strong className="text-ink-900">{rwf(p.fee)}</strong></span>
              </div>
              <Link to="/track" className="inline-flex items-center gap-1 text-sm font-semibold text-flame-600 hover:gap-2">
                Track <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
