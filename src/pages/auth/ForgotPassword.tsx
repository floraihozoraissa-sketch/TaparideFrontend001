import { useState } from 'react'
import { Mail, ArrowLeft, CheckCircle2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import AuthLayout, { AuthLink } from './AuthLayout'

export default function ForgotPassword() {
  const [sent, setSent] = useState(false)

  return (
    <AuthLayout
      title={sent ? 'Check your inbox' : 'Reset your password'}
      subtitle={
        sent
          ? "We've sent a password reset link to your email. It expires in 30 minutes."
          : "Enter your email and we'll send you a link to reset your password."
      }
      footer={<>Remembered it? <AuthLink to="/login">Back to login</AuthLink></>}
    >
      {sent ? (
        <div className="space-y-5">
          <div className="flex items-center gap-3 rounded-2xl border border-emerald-100 bg-emerald-50 p-4 text-emerald-700">
            <CheckCircle2 className="h-6 w-6 shrink-0" />
            <p className="text-sm">Reset link sent successfully. Check your spam folder if you don't see it.</p>
          </div>
          <Link to="/login" className="btn-outline w-full">
            <ArrowLeft className="h-4 w-4" /> Back to login
          </Link>
        </div>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault()
            setSent(true)
          }}
          className="space-y-4"
        >
          <div>
            <label className="label">Email address</label>
            <div className="relative">
              <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
              <input className="input pl-9" placeholder="you@email.com" />
            </div>
          </div>
          <button type="submit" className="btn-primary w-full py-3.5">
            Send Reset Link
          </button>
        </form>
      )}
    </AuthLayout>
  )
}
