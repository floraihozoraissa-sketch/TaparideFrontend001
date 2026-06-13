import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Camera,
  UploadCloud,
  ShieldCheck,
  Wallet,
  Bus,
  Package,
  Clock,
  CheckCircle2,
  FileText,
  Plus,
  ArrowRight,
} from 'lucide-react'
import Logo from '../components/Logo'
import Stepper from '../components/Stepper'
import { cn } from '../lib/utils'

const steps = ['Complete Profile', 'Agency Verification', 'RURA Registration']

export default function Onboarding() {
  const [step, setStep] = useState(0)
  const navigate = useNavigate()

  const next = () => (step < steps.length - 1 ? setStep((s) => s + 1) : navigate('/dashboard'))

  return (
    <div className="min-h-screen bg-mist">
      <header className="border-b border-ink-100 bg-white">
        <div className="container-page flex items-center justify-between py-4">
          <Logo />
          <span className="eyebrow">Onboarding & Verification</span>
        </div>
      </header>

      <div className="border-b border-ink-100 bg-white py-5">
        <div className="container-page">
          <Stepper steps={steps} current={step} />
        </div>
      </div>

      <div className="container-page py-10">
        <div className="mx-auto max-w-xl">
          {step === 0 && <CompleteProfile />}
          {step === 1 && <AgencyVerification />}
          {step === 2 && <RuraRegistration />}

          <div className="mt-6 flex items-center justify-between">
            {step > 0 ? (
              <button onClick={() => setStep((s) => s - 1)} className="btn-ghost">
                Back
              </button>
            ) : (
              <span />
            )}
            <button onClick={next} className="btn-primary">
              {step === steps.length - 1 ? 'Submit Application' : 'Save & Continue'}
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          <div className="mt-4 text-center">
            <button onClick={() => navigate('/dashboard')} className="text-sm font-semibold text-ink-400 hover:text-ink-900">
              Skip for now
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function CompleteProfile() {
  return (
    <div className="card p-6 sm:p-8">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-extrabold text-ink-900">Complete Profile</h1>
        <span className="chip bg-ink-50 text-ink-500">65% done</span>
      </div>

      <div className="mt-6 flex flex-col items-center">
        <div className="relative">
          <div className="grid h-24 w-24 place-items-center rounded-full bg-ink-50 text-ink-300">
            <Camera className="h-8 w-8" />
          </div>
          <span className="absolute bottom-0 right-0 grid h-8 w-8 place-items-center rounded-full bg-ink-900 text-white">
            <Camera className="h-4 w-4" />
          </span>
        </div>
        <p className="mt-2 text-xs text-ink-400">Upload profile photo</p>
      </div>

      <div className="mt-6 grid gap-4">
        <div>
          <label className="label">Date of birth</label>
          <input type="date" className="input" />
        </div>
        <div>
          <label className="label">National ID / Passport number</label>
          <input className="input" placeholder="1 1990 8 0054321 0 54" />
        </div>
      </div>

      <div className="mt-6 rounded-2xl bg-gradient-to-br from-ink-900 to-ink-700 p-5 text-white">
        <div className="text-xs font-bold uppercase tracking-wide text-white/60">Unlock features</div>
        <div className="mt-3 grid grid-cols-3 gap-3 text-center text-xs">
          {[
            { icon: Wallet, label: 'Wallet' },
            { icon: Bus, label: 'Booking' },
            { icon: Package, label: 'Parcels' },
          ].map((f) => (
            <div key={f.label} className="rounded-xl bg-white/10 p-3">
              <f.icon className="mx-auto h-5 w-5" />
              <div className="mt-1.5 font-semibold">{f.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function AgencyVerification() {
  return (
    <div className="card p-6 sm:p-8">
      <h1 className="flex items-center gap-2 text-xl font-extrabold text-ink-900">
        <ShieldCheck className="h-5 w-5 text-ink-700" /> Agency Verification
      </h1>
      <p className="mt-1 text-sm text-ink-500">
        Please upload a clear scan of your Agency Operating License to enable fleet management.
      </p>

      <button className="mt-6 flex w-full flex-col items-center gap-2 rounded-2xl border-2 border-dashed border-ink-200 bg-ink-50/40 p-8 text-center transition hover:border-ink-400">
        <span className="grid h-12 w-12 place-items-center rounded-full bg-ink-900 text-white">
          <UploadCloud className="h-5 w-5" />
        </span>
        <span className="font-semibold text-ink-900">Click to upload document</span>
        <span className="text-xs text-ink-400">PDF, JPG or PNG (max. 10MB)</span>
      </button>

      <div className="mt-4 flex items-center gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4">
        <Clock className="h-5 w-5 text-amber-500" />
        <div>
          <div className="text-sm font-semibold text-ink-900">Verification Pending</div>
          <div className="text-xs text-ink-400">Usually takes 24 hours</div>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-2 rounded-xl bg-emerald-50 p-3 text-xs font-medium text-emerald-700">
        <ShieldCheck className="h-4 w-4" /> Documents are encrypted and stored securely.
      </div>
    </div>
  )
}

function RuraRegistration() {
  return (
    <div className="card p-6 sm:p-8">
      <h1 className="text-xl font-extrabold text-ink-900">RURA Registration</h1>

      <div className="mt-4 rounded-xl bg-ink-900 p-4 text-sm text-white/80">
        The <span className="font-semibold text-white">RURA Transport Code</span> is issued by the Rwanda
        Utilities Regulatory Authority. It is required for all legal transport operations.
      </div>

      <div className="mt-5">
        <label className="label">Enter RURA code</label>
        <input className="input" placeholder="REG-10293847" />
      </div>

      <div className="mt-6">
        <div className="label">Required license documents</div>
        <div className="space-y-3">
          <DocRow name="Transport_License.pdf" meta="2.4 MB · Uploaded" uploaded />
          <DocRow name="Insurance Certificate" meta="Tap to upload" />
        </div>
      </div>
    </div>
  )
}

function DocRow({ name, meta, uploaded }: { name: string; meta: string; uploaded?: boolean }) {
  return (
    <div
      className={cn(
        'flex items-center gap-3 rounded-xl border p-3',
        uploaded ? 'border-ink-100 bg-white' : 'border-dashed border-ink-200 bg-ink-50/40',
      )}
    >
      <span className="grid h-9 w-9 place-items-center rounded-lg bg-flame-50 text-flame-600">
        <FileText className="h-4 w-4" />
      </span>
      <div className="min-w-0 flex-1">
        <div className="truncate text-sm font-semibold text-ink-900">{name}</div>
        <div className="text-xs text-ink-400">{meta}</div>
      </div>
      {uploaded ? (
        <CheckCircle2 className="h-5 w-5 text-emerald-500" />
      ) : (
        <Plus className="h-5 w-5 text-ink-400" />
      )}
    </div>
  )
}
