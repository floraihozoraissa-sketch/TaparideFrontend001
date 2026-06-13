import { useNavigate } from 'react-router-dom'
import { User, Mail, Phone, Lock } from 'lucide-react'
import AuthLayout, { AuthLink } from './AuthLayout'

export default function Signup() {
  const navigate = useNavigate()
  return (
    <AuthLayout
      title="Create your account"
      subtitle="Sign up to book buses and send parcels in minutes."
      footer={<>Already have an account? <AuthLink to="/login">Log in</AuthLink></>}
    >
      <form
        onSubmit={(e) => {
          e.preventDefault()
          navigate('/verify-otp')
        }}
        className="space-y-4"
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
              <input className="input pl-9" placeholder="you@email.com" />
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
          <input type="checkbox" className="mt-0.5 h-4 w-4 rounded border-ink-200 text-ink-900 focus:ring-ink-900" />
          I agree to TapaRide's <span className="font-semibold text-flame-600">Terms</span> and <span className="font-semibold text-flame-600">Privacy Policy</span>.
        </label>

        <button type="submit" className="btn-primary w-full py-3.5">
          Create Account
        </button>
      </form>
    </AuthLayout>
  )
}
