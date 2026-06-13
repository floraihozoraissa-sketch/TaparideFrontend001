import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import { AccountProvider } from './store/account'

import SiteLayout from './components/SiteLayout'
import Landing from './pages/Landing'
import SearchResults from './pages/SearchResults'
import Booking from './pages/Booking'
import SendParcel from './pages/SendParcel'
import Track from './pages/Track'
import Confirmation from './pages/Confirmation'
import ParcelConfirmation from './pages/ParcelConfirmation'
import Support from './pages/Support'
import NotFound from './pages/NotFound'
import Onboarding from './pages/Onboarding'
import Journey from './pages/Journey'
import Waitlist from './pages/Waitlist'
import NoBuses from './pages/booking/NoBuses'
import PaymentProcessing from './pages/booking/PaymentProcessing'
import PaymentFailed from './pages/booking/PaymentFailed'

import Login from './pages/auth/Login'
import Signup from './pages/auth/Signup'
import Otp from './pages/auth/Otp'
import ForgotPassword from './pages/auth/ForgotPassword'

import DashboardLayout from './pages/dashboard/DashboardLayout'
import Dashboard from './pages/dashboard/Dashboard'
import MyTrips from './pages/dashboard/MyTrips'
import MyParcels from './pages/dashboard/MyParcels'
import Notifications from './pages/dashboard/Notifications'
import PaymentMethods from './pages/dashboard/PaymentMethods'
import Settings from './pages/dashboard/Settings'

const router = createBrowserRouter([
  {
    element: <SiteLayout />,
    children: [
      { path: '/', element: <Landing /> },
      { path: '/search', element: <SearchResults /> },
      { path: '/booking', element: <Booking /> },
      { path: '/booking/processing', element: <PaymentProcessing /> },
      { path: '/booking/failed', element: <PaymentFailed /> },
      { path: '/booking/confirmation', element: <Confirmation /> },
      { path: '/no-buses', element: <NoBuses /> },
      { path: '/journey', element: <Journey /> },
      { path: '/waitlist', element: <Waitlist /> },
      { path: '/send-parcel', element: <SendParcel /> },
      { path: '/parcel/confirmation', element: <ParcelConfirmation /> },
      { path: '/track', element: <Track /> },
      { path: '/support', element: <Support /> },
    ],
  },
  { path: '/login', element: <Login /> },
  { path: '/signup', element: <Signup /> },
  { path: '/verify-otp', element: <Otp /> },
  { path: '/forgot-password', element: <ForgotPassword /> },
  { path: '/onboarding', element: <Onboarding /> },
  {
    path: '/dashboard',
    element: <DashboardLayout />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: 'trips', element: <MyTrips /> },
      { path: 'parcels', element: <MyParcels /> },
      { path: 'notifications', element: <Notifications /> },
      { path: 'payments', element: <PaymentMethods /> },
      { path: 'settings', element: <Settings /> },
    ],
  },
  { path: '*', element: <NotFound /> },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AccountProvider>
      <RouterProvider router={router} />
    </AccountProvider>
  </StrictMode>,
)
