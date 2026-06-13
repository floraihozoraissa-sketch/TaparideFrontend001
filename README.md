# TapaRide Frontend

Frontend for **TapaRide** — a smart inter-city bus booking and parcel delivery platform for Rwanda. Built from the [Figma design](https://www.figma.com/design/tlTjTPKIiHa9t9nMJwxzwa/tapa-ride) as a single-page React application.

## Tech stack

- **React 19** + **TypeScript**
- **Vite** (dev server & build)
- **Tailwind CSS** (custom `ink` / `flame` theme)
- **React Router v7** (client-side routing)
- **lucide-react** (icons)

## Getting started

```bash
npm install
npm run dev      # start dev server (http://localhost:5173)
npm run build    # type-check + production build to dist/
npm run lint     # run ESLint
npm run preview  # preview the production build
```

## Pages & routes

| Area | Route(s) |
|------|----------|
| Landing | `/` |
| Search results (buses) | `/search` |
| Booking & seat selection | `/booking` |
| Booking states | `/booking/processing`, `/booking/failed`, `/booking/confirmation`, `/no-buses` |
| Journey & waitlist | `/journey`, `/waitlist` |
| Parcel delivery | `/send-parcel`, `/parcel/confirmation`, `/track` |
| Onboarding & verification | `/onboarding` |
| Authentication | `/login`, `/signup`, `/verify-otp`, `/forgot-password` |
| Dashboard | `/dashboard`, `/dashboard/trips`, `/dashboard/parcels`, `/dashboard/notifications`, `/dashboard/payments`, `/dashboard/settings` |
| Support / 404 | `/support`, `*` |

## Project structure

```
src/
  components/   shared UI (Navbar, Footer, SiteLayout, Stepper, SearchWidget, ...)
  pages/        route components (Landing, SearchResults, Booking, Journey, ...)
    auth/       login / signup / OTP / forgot password
    booking/    booking-state screens (processing / failed / no-buses)
    dashboard/  authenticated dashboard pages
  data/         mock data used to render realistic UI
  lib/          helpers (cn, currency formatting)
```

## Design system

- **Ink** (`#10075C`) — primary deep indigo
- **Flame** (`#EA580C`) — accent orange
- **Mist / Haze** — light page backgrounds
- Type: Plus Jakarta Sans (display) + Inter (body)
