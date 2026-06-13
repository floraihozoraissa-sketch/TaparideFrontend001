import { Link } from 'react-router-dom'
import { Bus, Home } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="grid min-h-[70vh] place-items-center bg-mist px-5">
      <div className="text-center">
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-ink-900 text-white">
          <Bus className="h-7 w-7" />
        </div>
        <h1 className="mt-6 text-7xl font-extrabold text-ink-900">404</h1>
        <p className="mt-2 text-lg font-semibold text-ink-900">This route went off the map</p>
        <p className="mt-1 text-ink-500">The page you're looking for doesn't exist or has moved.</p>
        <Link to="/" className="btn-primary mt-6">
          <Home className="h-4 w-4" /> Back to Home
        </Link>
      </div>
    </div>
  )
}
