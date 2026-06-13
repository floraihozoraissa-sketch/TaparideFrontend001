/* eslint-disable react-refresh/only-export-components */
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import {
  notifications as seedNotifications,
  paymentMethods as seedPaymentMethods,
  type NotificationItem,
  type PaymentMethod,
} from '../data/mock'

export interface Profile {
  fullName: string
  email: string
  phone: string
  city: string
  /** data URL (uploaded) or remote URL */
  avatar: string
  /** demo-only; in production this lives on the backend */
  password: string
}

const DEFAULT_PROFILE: Profile = {
  fullName: 'Amina Uwimana',
  email: 'amina.u@email.com',
  phone: '+250 788 123 456',
  city: 'Kigali',
  avatar: 'https://i.pravatar.cc/120?img=47',
  password: 'taparide123',
}

interface AccountState {
  profile: Profile
  updateProfile: (patch: Partial<Profile>) => void
  changePassword: (current: string, next: string) => { ok: boolean; error?: string }

  notifications: NotificationItem[]
  markRead: (id: string) => void
  markAllRead: () => void
  dismissNotification: (id: string) => void
  clearAllNotifications: () => void

  paymentMethods: PaymentMethod[]
  removePaymentMethod: (id: string) => void
}

const STORAGE_KEY = 'taparide.account.v1'

const AccountContext = createContext<AccountState | null>(null)

function loadProfile(): Profile {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const parsed = JSON.parse(raw) as { profile?: Partial<Profile> }
      if (parsed.profile) return { ...DEFAULT_PROFILE, ...parsed.profile }
    }
  } catch {
    /* ignore corrupt storage */
  }
  return DEFAULT_PROFILE
}

export function AccountProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<Profile>(loadProfile)
  const [notifications, setNotifications] = useState<NotificationItem[]>(seedNotifications)
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>(seedPaymentMethods)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ profile }))
    } catch {
      /* storage may be unavailable */
    }
  }, [profile])

  const updateProfile = useCallback((patch: Partial<Profile>) => {
    setProfile((prev) => ({ ...prev, ...patch }))
  }, [])

  const changePassword = useCallback(
    (current: string, next: string) => {
      if (current !== profile.password) {
        return { ok: false, error: 'Current password is incorrect.' }
      }
      if (next.length < 8) {
        return { ok: false, error: 'New password must be at least 8 characters.' }
      }
      setProfile((prev) => ({ ...prev, password: next }))
      return { ok: true }
    },
    [profile.password],
  )

  const markRead = useCallback((id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, unread: false } : n)))
  }, [])

  const markAllRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })))
  }, [])

  const dismissNotification = useCallback((id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id))
  }, [])

  const clearAllNotifications = useCallback(() => {
    setNotifications([])
  }, [])

  const removePaymentMethod = useCallback((id: string) => {
    setPaymentMethods((prev) => prev.filter((m) => m.id !== id))
  }, [])

  const value = useMemo<AccountState>(
    () => ({
      profile,
      updateProfile,
      changePassword,
      notifications,
      markRead,
      markAllRead,
      dismissNotification,
      clearAllNotifications,
      paymentMethods,
      removePaymentMethod,
    }),
    [
      profile,
      updateProfile,
      changePassword,
      notifications,
      markRead,
      markAllRead,
      dismissNotification,
      clearAllNotifications,
      paymentMethods,
      removePaymentMethod,
    ],
  )

  return <AccountContext.Provider value={value}>{children}</AccountContext.Provider>
}

export function useAccount(): AccountState {
  const ctx = useContext(AccountContext)
  if (!ctx) throw new Error('useAccount must be used within an AccountProvider')
  return ctx
}
