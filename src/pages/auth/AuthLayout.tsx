import { Link } from 'react-router-dom'
import { ShieldCheck, Bus, Package, Star } from 'lucide-react'
import Logo from '../../components/Logo'

export default function AuthLayout({
  title,
  subtitle,
  children,
  footer,
}: {
  title: string
  subtitle: string
  children: React.ReactNode
  footer?: React.ReactNode
}) {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      {/* Form side */}
      <div className="flex flex-col px-5 py-8 sm:px-10">
        <Logo />
        <div className="flex flex-1 items-center justify-center py-10">
          <div className="w-full max-w-md animate-fade-up">
            <h1 className="text-3xl font-extrabold text-ink-900">{title}</h1>
            <p className="mt-2 text-ink-500">{subtitle}</p>
            <div className="mt-8">{children}</div>
            {footer && <div className="mt-6 text-center text-sm text-ink-500">{footer}</div>}
          </div>
        </div>
        <p className="text-center text-xs text-ink-300">© 2025 TapaRide Rwanda</p>
      </div>

      {/* Brand side */}
      <div className="relative hidden overflow-hidden bg-ink-900 lg:block">
        <div className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full bg-flame-600/30 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-16 h-80 w-80 rounded-full bg-white/10 blur-3xl" />
        <div className="relative flex h-full flex-col justify-center px-14 text-white">
          <div className="mb-3 flex items-center gap-1 text-flame-500">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="h-4 w-4 fill-current" />
            ))}
          </div>
          <h2 className="max-w-md text-4xl font-extrabold leading-tight">
            Travel smart. <span className="text-flame-500">Deliver fast.</span>
          </h2>
          <p className="mt-4 max-w-md text-white/70">
            Join thousands of Rwandans who book buses and send parcels the easy way — secure
            payments, digital tickets, and live tracking.
          </p>
          <div className="mt-10 space-y-4">
            <Feature icon={Bus} title="Premium buses across 15+ cities" />
            <Feature icon={Package} title="Trackable parcel delivery" />
            <Feature icon={ShieldCheck} title="Secure Mobile Money & card payments" />
          </div>
        </div>
      </div>
    </div>
  )
}

function Feature({ icon: Icon, title }: { icon: typeof Bus; title: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="grid h-10 w-10 place-items-center rounded-xl bg-white/10">
        <Icon className="h-5 w-5" />
      </span>
      <span className="text-sm font-medium text-white/90">{title}</span>
    </div>
  )
}

export function AuthLink({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <Link to={to} className="font-semibold text-flame-600 hover:text-flame-700">
      {children}
    </Link>
  )
}
