import { Link } from 'react-router-dom'
import { BusFront, Search } from 'lucide-react'

const dates = ['Oct 25 (Fri)', 'Oct 26 (Sat)', 'Oct 27 (Sun)']

export default function NoBuses() {
  return (
    <div className="bg-mist py-12">
      <div className="container-page">
        <div className="mx-auto max-w-md card p-8 text-center">
          <span className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-ink-50 text-ink-300">
            <BusFront className="h-9 w-9" />
          </span>
          <h1 className="mt-5 text-2xl font-extrabold text-ink-900">No buses available for this date</h1>
          <p className="mt-2 text-sm text-ink-500">
            We couldn't find any trips for the selected route today. Try checking nearby dates.
          </p>

          <div className="mt-6">
            <div className="label">Suggested dates</div>
            <div className="flex flex-wrap justify-center gap-2">
              {dates.map((d, i) => (
                <button
                  key={d}
                  className={
                    'rounded-full px-4 py-2 text-sm font-semibold transition ' +
                    (i === 1 ? 'bg-ink-100 text-ink-700' : 'bg-white text-ink-500 ring-1 ring-ink-100 hover:bg-ink-50')
                  }
                >
                  {d}
                </button>
              ))}
            </div>
          </div>

          <Link to="/search" className="btn-primary mt-7 w-full">
            <Search className="h-4 w-4" /> Modify Search
          </Link>
        </div>
      </div>
    </div>
  )
}
