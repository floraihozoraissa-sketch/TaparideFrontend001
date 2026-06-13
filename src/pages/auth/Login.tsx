import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Mail, Lock, Eye, EyeOff } from 'lucide-react'
import AuthLayout, { AuthLink } from './AuthLayout'

export default function Login() {
  const navigate = useNavigate()
  const [show, setShow] = useState(false)

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Log in to manage your trips and parcels."
      footer={<>Don't have an account? <AuthLink to="/signup">Sign up</AuthLink></>}
    >
      <form
        onSubmit={(e) => {
          e.preventDefault()
          navigate('/dashboard')
        }}
        className="space-y-4"
      >
        <div>
          <label className="label">Email or phone</label>
          <div className="relative">
            <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
            <input className="input pl-9" placeholder="you@email.com" defaultValue="amina.u@email.com" />
          </div>
        </div>
        <div>
          <div className="flex items-center justify-between">
            <label className="label">Password</label>
            <Link to="/forgot-password" className="mb-1.5 text-xs font-semibold text-flame-600">
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
            <input
              type={show ? 'text' : 'password'}
              className="input px-9"
              placeholder="••••••••"
              defaultValue="password"
            />
            <button
              type="button"
              onClick={() => setShow((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-400 hover:text-ink-900"
              aria-label="toggle password"
            >
              {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>

        <label className="flex items-center gap-2.5 text-sm text-ink-600">
          <input type="checkbox" className="h-4 w-4 rounded border-ink-200 text-ink-900 focus:ring-ink-900" />
          Keep me signed in
        </label>

        <button type="submit" className="btn-primary w-full py-3.5">
          Log In
        </button>

        <div className="flex items-center gap-3 py-1 text-xs text-ink-300">
          <span className="h-px flex-1 bg-ink-100" /> or continue with <span className="h-px flex-1 bg-ink-100" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <button type="button" className="btn-outline">Google</button>
          <button type="button" className="btn-outline">Apple</button>
        </div>
      </form>
    </AuthLayout>
  )
}
