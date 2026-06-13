import { useRef, useState } from 'react'
import { User, Bell, Globe, Shield, CheckCircle2, Lock } from 'lucide-react'
import { cn, readFileAsDataURL } from '../../lib/utils'
import { useAccount, type Profile } from '../../store/account'

export default function Settings() {
  const { profile, updateProfile, changePassword } = useAccount()

  const [form, setForm] = useState({
    fullName: profile.fullName,
    email: profile.email,
    phone: profile.phone,
    city: profile.city,
  })
  const [saved, setSaved] = useState(false)
  const photoRef = useRef<HTMLInputElement>(null)

  const setField = (key: keyof typeof form) => (value: string) => {
    setForm((f) => ({ ...f, [key]: value }))
    setSaved(false)
  }

  const onPhoto = async (file?: File) => {
    if (!file || !file.type.startsWith('image/')) return
    const dataUrl = await readFileAsDataURL(file)
    updateProfile({ avatar: dataUrl })
  }

  const save = () => {
    updateProfile(form as Partial<Profile>)
    setSaved(true)
  }

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-extrabold text-ink-900">Settings</h1>
        <p className="text-ink-500">Manage your profile, preferences and security.</p>
      </div>

      {/* Profile */}
      <div className="card p-6">
        <SectionTitle icon={User} title="Profile" />
        <div className="mt-4 flex items-center gap-4">
          <img src={profile.avatar} alt="avatar" className="h-16 w-16 rounded-full object-cover ring-2 ring-ink-100" />
          <button className="btn-outline" onClick={() => photoRef.current?.click()}>
            Change photo
          </button>
          <input
            ref={photoRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => onPhoto(e.target.files?.[0])}
          />
        </div>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <Field label="Full name" value={form.fullName} onChange={setField('fullName')} />
          <Field label="Email" value={form.email} onChange={setField('email')} type="email" />
          <Field label="Phone" value={form.phone} onChange={setField('phone')} />
          <Field label="City" value={form.city} onChange={setField('city')} />
        </div>
        <div className="mt-5 flex items-center gap-3">
          <button className="btn-primary" onClick={save}>Save changes</button>
          {saved && (
            <span className="flex items-center gap-1.5 text-sm font-medium text-emerald-600">
              <CheckCircle2 className="h-4 w-4" /> Profile updated
            </span>
          )}
        </div>
      </div>

      {/* Notifications */}
      <div className="card p-6">
        <SectionTitle icon={Bell} title="Notifications" />
        <div className="mt-4 space-y-1">
          <Toggle label="Trip reminders & updates" defaultOn />
          <Toggle label="Parcel tracking alerts" defaultOn />
          <Toggle label="Promotions & offers" />
          <Toggle label="Email newsletter" defaultOn />
        </div>
      </div>

      {/* Preferences */}
      <div className="card p-6">
        <SectionTitle icon={Globe} title="Preferences" />
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <label className="label">Language</label>
            <select className="input">
              <option>English</option>
              <option>Kinyarwanda</option>
              <option>Français</option>
            </select>
          </div>
          <div>
            <label className="label">Currency</label>
            <select className="input">
              <option>RWF — Rwandan Franc</option>
              <option>USD — US Dollar</option>
            </select>
          </div>
        </div>
      </div>

      {/* Security */}
      <div className="card p-6">
        <SectionTitle icon={Shield} title="Security" />
        <ChangePassword changePassword={changePassword} />
      </div>
    </div>
  )
}

function ChangePassword({
  changePassword,
}: {
  changePassword: (current: string, next: string) => { ok: boolean; error?: string }
}) {
  const [open, setOpen] = useState(false)
  const [current, setCurrent] = useState('')
  const [next, setNext] = useState('')
  const [confirm, setConfirm] = useState('')
  const [status, setStatus] = useState<{ ok: boolean; msg: string } | null>(null)

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    if (next !== confirm) {
      setStatus({ ok: false, msg: 'New password and confirmation do not match.' })
      return
    }
    const res = changePassword(current, next)
    if (res.ok) {
      setStatus({ ok: true, msg: 'Password changed successfully.' })
      setCurrent('')
      setNext('')
      setConfirm('')
      setOpen(false)
    } else {
      setStatus({ ok: false, msg: res.error || 'Could not change password.' })
    }
  }

  return (
    <div className="mt-4">
      {!open ? (
        <div className="flex flex-col gap-3 sm:flex-row">
          <button className="btn-outline flex-1" onClick={() => { setOpen(true); setStatus(null) }}>
            <Lock className="h-4 w-4" /> Change password
          </button>
          <button className="btn-outline flex-1">Enable two-factor authentication</button>
        </div>
      ) : (
        <form onSubmit={submit} className="grid gap-4">
          <PasswordField label="Current password" value={current} onChange={setCurrent} />
          <div className="grid gap-4 sm:grid-cols-2">
            <PasswordField label="New password" value={next} onChange={setNext} />
            <PasswordField label="Confirm new password" value={confirm} onChange={setConfirm} />
          </div>
          <p className="-mt-1 text-xs text-ink-400">Use 8+ characters. (Demo current password: taparide123)</p>
          <div className="flex gap-3">
            <button type="submit" className="btn-primary">Update password</button>
            <button type="button" className="btn-ghost" onClick={() => { setOpen(false); setStatus(null) }}>
              Cancel
            </button>
          </div>
        </form>
      )}

      {status && (
        <p
          className={cn(
            'mt-3 flex items-center gap-1.5 text-sm font-medium',
            status.ok ? 'text-emerald-600' : 'text-flame-600',
          )}
        >
          {status.ok && <CheckCircle2 className="h-4 w-4" />}
          {status.msg}
        </p>
      )}
    </div>
  )
}

function PasswordField({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <label className="label">{label}</label>
      <input type="password" className="input" value={value} onChange={(e) => onChange(e.target.value)} placeholder="••••••••" />
    </div>
  )
}

function SectionTitle({ icon: Icon, title }: { icon: typeof User; title: string }) {
  return (
    <h2 className="flex items-center gap-2 font-bold text-ink-900">
      <span className="grid h-8 w-8 place-items-center rounded-lg bg-ink-50 text-ink-900">
        <Icon className="h-4 w-4" />
      </span>
      {title}
    </h2>
  )
}

function Field({
  label,
  value,
  onChange,
  type = 'text',
}: {
  label: string
  value: string
  onChange: (v: string) => void
  type?: string
}) {
  return (
    <div>
      <label className="label">{label}</label>
      <input className="input" type={type} value={value} onChange={(e) => onChange(e.target.value)} />
    </div>
  )
}

function Toggle({ label, defaultOn }: { label: string; defaultOn?: boolean }) {
  const [on, setOn] = useState(!!defaultOn)
  return (
    <button
      onClick={() => setOn((v) => !v)}
      className="flex w-full items-center justify-between py-2.5 text-left"
    >
      <span className="text-sm text-ink-700">{label}</span>
      <span className={cn('relative h-6 w-11 rounded-full transition', on ? 'bg-ink-900' : 'bg-ink-200')}>
        <span
          className={cn(
            'absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition',
            on ? 'left-[22px]' : 'left-0.5',
          )}
        />
      </span>
    </button>
  )
}
