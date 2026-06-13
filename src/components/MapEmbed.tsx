import { cn } from '../lib/utils'

/**
 * Keyless Google Maps embed. Pass `from` + `to` to render a route, or `query`
 * to drop a single pin. No API key required; swap to the Google Maps Embed API
 * (with a key) for richer styling when ready.
 */
export default function MapEmbed({
  from,
  to,
  query,
  zoom = 8,
  title = 'Google map',
  className,
}: {
  from?: string
  to?: string
  query?: string
  zoom?: number
  title?: string
  className?: string
}) {
  const src =
    from && to
      ? `https://maps.google.com/maps?saddr=${encodeURIComponent(from)}&daddr=${encodeURIComponent(
          to,
        )}&z=${zoom}&output=embed`
      : `https://maps.google.com/maps?q=${encodeURIComponent(query ?? 'Rwanda')}&z=${zoom}&output=embed`

  return (
    <iframe
      title={title}
      src={src}
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      className={cn('h-full w-full border-0', className)}
    />
  )
}
