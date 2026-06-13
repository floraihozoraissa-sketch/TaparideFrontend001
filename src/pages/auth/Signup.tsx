import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { User, Mail, Phone, Lock } from 'lucide-react'
import AuthLayout, { AuthLink } from './AuthLayout'

export default function Signup() {
  const navigate = useNavigate()
  const [agreed, setAgreed] = useState(false)
  const [attempted, setAttempted] = useState(false)
  const [email, setEmail] = useState('')

  return (
    <AuthLayout
      title="Create your account"
      subtitle="Sign up to book buses and send parcels in minutes."
      footer={<>Already have an account? <AuthLink to="/login">Log in</AuthLink></>}
    >
      <form
        onSubmit={(e) => {
          e.preventDefault()
          if (!agreed) {
            setAttempted(true)
            return
          }
          navigate('/verify-otp', { state: { email } })
        }}
        className="space-y-4"
        noValidate
      >
        <div>
          <label className="label">Full name</label>
          <div className="relative">
            <User className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
            <input className="input pl-9" placeholder="Amina Uwimana" />
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="label">Email</label>
            <div className="relative">
              <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input pl-9"
                placeholder="you@email.com"
              />
            </div>
          </div>
          <div>
            <label className="label">Phone</label>
            <div className="relative">
              <Phone className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
              <input className="input pl-9" placeholder="+250 7XX XXX XXX" />
            </div>
          </div>
        </div>
        <div>
          <label className="label">Password</label>
          <div className="relative">
            <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
            <input type="password" className="input pl-9" placeholder="Create a strong password" />
          </div>
          <p className="mt-1.5 text-xs text-ink-400">Use 8+ characters with a mix of letters and numbers.</p>
        </div>

        <label className="flex items-start gap-2.5 text-sm text-ink-600">
          <input
            type="checkbox"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            className="mt-0.5 h-4 w-4 rounded border-ink-200 text-ink-900 focus:ring-ink-900"
          />
          I agree to TapaRide's <span className="font-semibold text-flame-600">Terms</span> and <span className="font-semibold text-flame-600">Privacy Policy</span>.
        </label>
        {attempted && !agreed && (
          <p className="-mt-2 text-xs font-medium text-flame-600">
            Please agree to the Terms and Privacy Policy to create your account.
          </p>
        )}

        <button type="submit" disabled={!agreed} className="btn-primary w-full py-3.5 disabled:cursor-not-allowed disabled:opacity-50">
          Create Account
        </button>
      </form>
    </AuthLayout>
  )
}
