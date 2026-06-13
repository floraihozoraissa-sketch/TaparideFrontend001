import { Link } from 'react-router-dom'
import { Apple, Play } from 'lucide-react'
import Logo from './Logo'

const socials = [
  {
    label: 'X',
    path: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.656l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z',
  },
  {
    label: 'Facebook',
    path: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073Z',
  },
  {
    label: 'Instagram',
    path: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069ZM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0Zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324ZM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881Z',
  },
]

const columns = [
  {
    title: 'Services',
    links: [
      { label: 'Book Bus Tickets', to: '/search' },
      { label: 'Send a Parcel', to: '/send-parcel' },
      { label: 'Track Shipment', to: '/track' },
      { label: 'Corporate Accounts', to: '/support' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About Us', to: '/support' },
      { label: 'Careers', to: '/support' },
      { label: 'Partner with Us', to: '/support' },
      { label: 'Contact Support', to: '/support' },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="bg-ink-950 text-white">
      <div className="container-page grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-4">
          <Logo variant="light" />
          <p className="max-w-xs text-sm leading-relaxed text-white/60">
            Revolutionizing inter-city transport and logistics across Rwanda with smart,
            reliable, and secure digital solutions.
          </p>
          <div className="flex gap-3">
            {socials.map((s) => (
              <a
                key={s.label}
                href="#"
                className="grid h-9 w-9 place-items-center rounded-full bg-white/10 text-white/80 transition hover:bg-flame-600 hover:text-white"
                aria-label={s.label}
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                  <path d={s.path} />
                </svg>
              </a>
            ))}
          </div>
        </div>

        {columns.map((col) => (
          <div key={col.title}>
            <h4 className="mb-4 text-sm font-bold">{col.title}</h4>
            <ul className="space-y-3">
              {col.links.map((l) => (
                <li key={l.label}>
                  <Link to={l.to} className="text-sm text-white/60 transition hover:text-white">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div>
          <h4 className="mb-4 text-sm font-bold">Get the App</h4>
          <p className="mb-4 text-sm text-white/60">
            Book faster and track easily with the TapaRide mobile app.
          </p>
          <div className="space-y-3">
            <a href="#" className="flex items-center gap-3 rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 transition hover:bg-white/10">
              <Apple className="h-6 w-6" />
              <span className="text-left leading-tight">
                <span className="block text-[10px] text-white/50">Download on the</span>
                <span className="block text-sm font-semibold">App Store</span>
              </span>
            </a>
            <a href="#" className="flex items-center gap-3 rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 transition hover:bg-white/10">
              <Play className="h-6 w-6" />
              <span className="text-left leading-tight">
                <span className="block text-[10px] text-white/50">Get it on</span>
                <span className="block text-sm font-semibold">Google Play</span>
              </span>
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page flex flex-col items-center justify-between gap-3 py-5 text-xs text-white/50 sm:flex-row">
          <p>© 2025 TapaRide Rwanda. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
