import { useState } from 'react'
import { NavLink, Outlet, Link, useLocation, ScrollRestoration } from 'react-router-dom'
import {
  LayoutDashboard,
  Ticket,
  Package,
  CreditCard,
  Settings as SettingsIcon,
  Bell,
  LogOut,
  Menu,
  X,
  Plus,
} from 'lucide-react'
import Logo from '../../components/Logo'
import { cn } from '../../lib/utils'

const nav = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/dashboard/trips', label: 'My Trips', icon: Ticket },
  { to: '/dashboard/parcels', label: 'My Parcels', icon: Package },
  { to: '/dashboard/notifications', label: 'Notifications', icon: Bell },
  { to: '/dashboard/payments', label: 'Payment Methods', icon: CreditCard },
  { to: '/dashboard/settings', label: 'Settings', icon: SettingsIcon },
]

export default function DashboardLayout() {
  const [open, setOpen] = useState(false)
  const location = useLocation()

  return (
    <div className="min-h-screen bg-mist">
      {/* Top bar */}
      <header className="sticky top-0 z-40 border-b border-ink-100 bg-white">
        <div className="flex h-16 items-center justify-between px-5 sm:px-8">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setOpen((v) => !v)}
              className="grid h-10 w-10 place-items-center rounded-xl border border-ink-100 lg:hidden"
              aria-label="menu"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
            <Logo />
          </div>
          <div className="flex items-center gap-3">
            <Link
              to="/dashboard/notifications"
              className="relative grid h-10 w-10 place-items-center rounded-xl border border-ink-100 text-ink-600 hover:bg-ink-50"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-flame-600" />
            </Link>
            <div className="flex items-center gap-2">
              <img
                src="https://i.pravatar.cc/80?img=47"
                alt="avatar"
                className="h-9 w-9 rounded-full object-cover"
              />
              <div className="hidden text-sm leading-tight sm:block">
                <div className="font-semibold text-ink-900">Amina Uwimana</div>
                <div className="text-xs text-ink-400">amina.u@email.com</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto flex max-w-7xl gap-6 px-5 py-6 sm:px-8">
        {/* Sidebar */}
        <aside
          className={cn(
            'fixed inset-y-16 left-0 z-30 w-64 shrink-0 border-r border-ink-100 bg-white p-4 transition-transform lg:static lg:inset-auto lg:rounded-2xl lg:border lg:shadow-card',
            open ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
          )}
        >
          <div className="mb-4 rounded-2xl bg-gradient-to-br from-ink-900 to-ink-800 p-4 text-white">
            <div className="text-sm font-semibold">Complete your profile</div>
            <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-white/20">
              <div className="h-full w-3/4 rounded-full bg-flame-500" />
            </div>
            <div className="mt-1.5 text-xs text-white/60">75% complete</div>
          </div>

          <nav className="space-y-1">
            {nav.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  cn(
                    'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition',
                    isActive ? 'bg-ink-900 text-white shadow-soft' : 'text-ink-500 hover:bg-ink-50',
                  )
                }
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </NavLink>
            ))}
          </nav>

          <Link
            to="/search"
            className="btn-flame mt-4 w-full"
          >
            <Plus className="h-4 w-4" /> New Booking
          </Link>

          <Link
            to="/"
            className="mt-2 flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-flame-600 hover:bg-flame-50"
          >
            <LogOut className="h-4 w-4" /> Log Out
          </Link>
        </aside>

        {open && (
          <div
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-20 bg-ink-950/30 lg:hidden"
          />
        )}

        <main className="min-w-0 flex-1" key={location.pathname}>
          <Outlet />
        </main>
      </div>
      <ScrollRestoration />
    </div>
  )
}
