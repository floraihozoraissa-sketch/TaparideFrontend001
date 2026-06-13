import { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { MailCheck } from 'lucide-react'
import AuthLayout, { AuthLink } from './AuthLayout'

function maskEmail(email: string) {
  const [name, domain] = email.split('@')
  if (!domain) return email
  const shown = name.slice(0, 2)
  return `${shown}${'•'.repeat(Math.max(name.length - 2, 2))}@${domain}`
}

export default function Otp() {
  const navigate = useNavigate()
  const location = useLocation()
  const email = (location.state as { email?: string } | null)?.email || 'your email'
  const display = email.includes('@') ? maskEmail(email) : email

  const [digits, setDigits] = useState(['', '', '', '', '', ''])
  const [seconds, setSeconds] = useState(42)
  const refs = useRef<(HTMLInputElement | null)[]>([])

  useEffect(() => {
    if (seconds <= 0) return
    const t = setTimeout(() => setSeconds((s) => s - 1), 1000)
    return () => clearTimeout(t)
  }, [seconds])

  const handle = (i: number, v: string) => {
    if (!/^\d?$/.test(v)) return
    const next = [...digits]
    next[i] = v
    setDigits(next)
    if (v && i < 5) refs.current[i + 1]?.focus()
  }

  const complete = digits.every((d) => d !== '')

  return (
    <AuthLayout
      title="Verify your email"
      subtitle={
        <>
          We've emailed a 6-digit verification code to <span className="font-semibold text-ink-900">{display}</span>. Enter
          it below to continue.
        </>
      }
      footer={<>Wrong email address? <AuthLink to="/signup">Go back</AuthLink></>}
    >
      <form
        onSubmit={(e) => {
          e.preventDefault()
          navigate('/onboarding')
        }}
        className="space-y-6"
      >
        <div className="flex items-center gap-2 rounded-xl bg-ink-50 px-4 py-3 text-sm text-ink-600">
          <MailCheck className="h-4 w-4 shrink-0 text-emerald-600" />
          Check your inbox (and spam folder) for the code from TapaRide.
        </div>

        <div className="flex justify-between gap-2">
          {digits.map((d, i) => (
            <input
              key={i}
              ref={(el) => { refs.current[i] = el }}
              value={d}
              onChange={(e) => handle(i, e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Backspace' && !digits[i] && i > 0) refs.current[i - 1]?.focus()
              }}
              inputMode="numeric"
              maxLength={1}
              className="h-14 w-12 rounded-xl border border-ink-100 text-center text-2xl font-bold text-ink-900 outline-none focus:border-ink-400 focus:ring-2 focus:ring-ink-900/10"
            />
          ))}
        </div>

        <button type="submit" disabled={!complete} className="btn-primary w-full py-3.5 disabled:cursor-not-allowed disabled:opacity-50">
          Verify
        </button>

        <p className="text-center text-sm text-ink-500">
          Didn't get the email?{' '}
          {seconds > 0 ? (
            <span className="font-semibold text-ink-400">
              Resend in 0:{seconds.toString().padStart(2, '0')}
            </span>
          ) : (
            <button
              type="button"
              onClick={() => setSeconds(42)}
              className="font-semibold text-flame-600"
            >
              Resend code
            </button>
          )}
        </p>
      </form>
    </AuthLayout>
  )
}
