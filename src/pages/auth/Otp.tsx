import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthLayout, { AuthLink } from './AuthLayout'

export default function Otp() {
  const navigate = useNavigate()
  const [digits, setDigits] = useState(['', '', '', '', '', ''])
  const refs = useRef<(HTMLInputElement | null)[]>([])

  const handle = (i: number, v: string) => {
    if (!/^\d?$/.test(v)) return
    const next = [...digits]
    next[i] = v
    setDigits(next)
    if (v && i < 5) refs.current[i + 1]?.focus()
  }

  return (
    <AuthLayout
      title="Verify your number"
      subtitle="We sent a 6-digit code to +250 788 •••• 456. Enter it below to continue."
      footer={<>Entered the wrong number? <AuthLink to="/signup">Go back</AuthLink></>}
    >
      <form
        onSubmit={(e) => {
          e.preventDefault()
          navigate('/onboarding')
        }}
        className="space-y-6"
      >
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

        <button type="submit" className="btn-primary w-full py-3.5">
          Verify
        </button>

        <p className="text-center text-sm text-ink-500">
          Didn't get the code?{' '}
          <button type="button" className="font-semibold text-flame-600">Resend in 0:42</button>
        </p>
      </form>
    </AuthLayout>
  )
}
