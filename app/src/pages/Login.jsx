import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence, useReducedMotion } from 'motion/react'
import AuthShell from '../components/auth/AuthShell.jsx'
import AuthField from '../components/auth/AuthField.jsx'
import OtpInput from '../components/auth/OtpInput.jsx'
import ShineButton from '../components/ShineButton.jsx'
import { useAuth } from '../auth/AuthContext.jsx'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function Login() {
  const reduce = useReducedMotion()
  const navigate = useNavigate()
  const { authenticate } = useAuth()

  const [step, setStep] = useState('email') // email | code
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
    // Mock: any 6-digit code is accepted.
    authenticate(email.trim(), 'developer')
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
        step === 'email' ? (
          <>
            New to Home Compass?{' '}
            <Link to="/signup" className="font-semibold text-brand hover:text-brand-deep">
              Create an account
            </Link>
          </>
        ) : null
      }
    >
      <AnimatePresence mode="wait" initial={false}>
        {step === 'email' ? (
          <motion.div key="email" {...slide}>
            <h1 className="text-[1.7rem] font-bold tracking-[-0.01em] text-navy">Welcome back</h1>
            <p className="mt-1.5 mb-7 text-[0.98rem] text-slateBody">
              Sign in to your Home Compass handover dashboard.
            </p>
            <form onSubmit={sendCode} noValidate>
              <AuthField
                label="Work email"
                type="email"
                name="email"
                autoComplete="email"
                placeholder="name@company.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                  if (error) setError('')
                }}
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
            <p className="mt-5 text-center text-[0.85rem] text-slateSoft">
              We’ll email you a one-time code — no password to remember.
            </p>
          </motion.div>
        ) : (
          <motion.div key="code" {...slide}>
            <button
              type="button"
              onClick={() => { setStep('email'); setCode(''); setError('') }}
              className="mb-5 inline-flex items-center gap-1.5 text-[0.88rem] font-medium text-slateBody transition-colors hover:text-navy"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
              Use a different email
            </button>
            <h1 className="text-[1.7rem] font-bold tracking-[-0.01em] text-navy">Enter your code</h1>
            <p className="mt-1.5 mb-7 text-[0.98rem] text-slateBody">
              We sent a 6-digit code to <span className="font-semibold text-navy">{email}</span>.
            </p>
            <OtpInput value={code} onChange={(v) => { setCode(v); if (error) setError('') }} onComplete={(v) => verify(v)} />
            {error && <p className="mt-3 text-[0.82rem] text-rose-600">{error}</p>}
            <ShineButton size="lg" className="mt-6 w-full" onClick={() => verify()}>
              Verify &amp; sign in
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
