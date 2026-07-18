import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence, useReducedMotion } from 'motion/react'
import AuthShell from '../components/auth/AuthShell.jsx'
import AuthField from '../components/auth/AuthField.jsx'
import OtpInput from '../components/auth/OtpInput.jsx'
import ShineButton from '../components/ShineButton.jsx'
import { useAuth } from '../auth/AuthContext.jsx'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const ROLES = [
  {
    id: 'developer',
    title: 'As a developer',
    body: 'Manage estates, handovers, documents and aftercare.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21h18" /><path d="M5 21V7l7-4 7 4v14" /><path d="M9 9h.01M9 13h.01M9 17h.01M15 9h.01M15 13h.01M15 17h.01" /></svg>
    ),
  },
  {
    id: 'homeowner',
    title: 'As a homeowner',
    body: 'Keep your documents, warranties, repairs and reminders.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 10.5 12 3l9 7.5" /><path d="M5 9.5V21h14V9.5" /><path d="M9.5 21v-6h5v6" /></svg>
    ),
  },
]

export default function Signup() {
  const reduce = useReducedMotion()
  const navigate = useNavigate()
  const { authenticate } = useAuth()

  const [step, setStep] = useState('role') // role | email | code
  const [role, setRole] = useState('developer')
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [code, setCode] = useState('')
  const [sending, setSending] = useState(false)

  const sendCode = (e) => {
    e.preventDefault()
    if (!EMAIL_RE.test(email.trim())) {
      setError('Enter a valid work email.')
      return
    }
    setError('')
    setSending(true)
    setTimeout(() => {
      setSending(false)
      setStep('code')
    }, 650)
  }

  const verify = (value) => {
    const entered = (value ?? code).trim()
    if (entered.length < 6) {
      setError('Enter the 6-digit code.')
      return
    }
    authenticate(email.trim(), role)
    navigate('/app', { replace: true })
  }

  const slide = {
    initial: reduce ? { opacity: 0 } : { opacity: 0, x: 24 },
    animate: { opacity: 1, x: 0 },
    exit: reduce ? { opacity: 0 } : { opacity: 0, x: -24 },
    transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1] },
  }

  return (
    <AuthShell
      footer={
        step !== 'code' ? (
          <>
            Already have an account?{' '}
            <Link to="/login" className="font-semibold text-brand hover:text-brand-deep">
              Log in
            </Link>
          </>
        ) : null
      }
    >
      <AnimatePresence mode="wait" initial={false}>
        {step === 'role' && (
          <motion.div key="role" {...slide}>
            <h1 className="text-[1.7rem] font-bold tracking-[-0.01em] text-navy">Create your account</h1>
            <p className="mt-1.5 mb-6 text-[0.98rem] text-slateBody">How will you be using Home Compass?</p>
            <div className="flex flex-col gap-3">
              {ROLES.map((r) => {
                const active = role === r.id
                return (
                  <button
                    key={r.id}
                    type="button"
                    onClick={() => setRole(r.id)}
                    aria-pressed={active}
                    className={[
                      'group flex items-center gap-4 rounded-2xl border p-4 text-left transition-all duration-200',
                      active
                        ? 'border-brand bg-brand-50 shadow-[0_0_0_3px_rgb(0_82_204/0.12)]'
                        : 'border-line bg-white hover:border-brand/40 hover:bg-brand-50/40',
                    ].join(' ')}
                  >
                    <span
                      className={[
                        'grid h-11 w-11 flex-none place-items-center rounded-xl transition-colors',
                        active ? 'bg-brand text-white' : 'bg-brand-100 text-brand',
                      ].join(' ')}
                    >
                      <span className="h-5 w-5">{r.icon}</span>
                    </span>
                    <span className="flex-1">
                      <span className="block text-[1.02rem] font-semibold text-navy">{r.title}</span>
                      <span className="block text-[0.88rem] leading-snug text-slateBody">{r.body}</span>
                    </span>
                    <span
                      className={[
                        'grid h-5 w-5 flex-none place-items-center rounded-full border-2 transition-colors',
                        active ? 'border-brand bg-brand' : 'border-line',
                      ].join(' ')}
                    >
                      {active && <span className="h-2 w-2 rounded-full bg-white" />}
                    </span>
                  </button>
                )
              })}
            </div>
            <ShineButton size="lg" className="mt-6 w-full" onClick={() => setStep('email')}>
              Continue
            </ShineButton>
          </motion.div>
        )}

        {step === 'email' && (
          <motion.div key="email" {...slide}>
            <button
              type="button"
              onClick={() => { setStep('role'); setError('') }}
              className="mb-5 inline-flex items-center gap-1.5 text-[0.88rem] font-medium text-slateBody transition-colors hover:text-navy"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
              Back
            </button>
            <h1 className="text-[1.7rem] font-bold tracking-[-0.01em] text-navy">
              Sign up {role === 'developer' ? 'as a developer' : 'as a homeowner'}
            </h1>
            <p className="mt-1.5 mb-7 text-[0.98rem] text-slateBody">Use your work email to get started.</p>
            <form onSubmit={sendCode} noValidate>
              <AuthField
                label="Work email"
                type="email"
                name="email"
                autoComplete="email"
                placeholder="name@company.com"
                value={email}
                onChange={(e) => { setEmail(e.target.value); if (error) setError('') }}
                error={error}
                icon={
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 5h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1z" />
                    <path d="m3.5 6.5 8.5 6 8.5-6" />
                  </svg>
                }
              />
              <ShineButton type="submit" size="lg" className="mt-6 w-full" disabled={sending}>
                {sending ? 'Sending code…' : 'Continue with email'}
              </ShineButton>
            </form>
          </motion.div>
        )}

        {step === 'code' && (
          <motion.div key="code" {...slide}>
            <button
              type="button"
              onClick={() => { setStep('email'); setCode(''); setError('') }}
              className="mb-5 inline-flex items-center gap-1.5 text-[0.88rem] font-medium text-slateBody transition-colors hover:text-navy"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
              Back
            </button>
            <h1 className="text-[1.7rem] font-bold tracking-[-0.01em] text-navy">Verify your email</h1>
            <p className="mt-1.5 mb-7 text-[0.98rem] text-slateBody">
              We sent a 6-digit code to <span className="font-semibold text-navy">{email}</span>.
            </p>
            <OtpInput value={code} onChange={(v) => { setCode(v); if (error) setError('') }} onComplete={(v) => verify(v)} />
            {error && <p className="mt-3 text-[0.82rem] text-rose-600">{error}</p>}
            <ShineButton size="lg" className="mt-6 w-full" onClick={() => verify()}>
              Create account
            </ShineButton>
            <p className="mt-5 text-center text-[0.85rem] text-slateSoft">
              Testing mode — any 6 digits will work.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </AuthShell>
  )
}
