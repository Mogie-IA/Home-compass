import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion, useMotionValue, useSpring } from 'motion/react'
import { useModal } from './ModalContext.jsx'
import { Field, TextInput, TextArea, Select, validateForm } from './FormBits.jsx'
import SubscribeButton from './SubscribeButton.jsx'

/**
 * Overlay form modal (21st.dev "cloud form card" pattern):
 * darkened, blurred backdrop; the panel springs up; Esc, the close
 * button, or a backdrop click dismisses it. Hosts the pilot and
 * waitlist forms so every CTA opens in place instead of navigating.
 */
export default function FormModal() {
  const { modal, closeModal } = useModal()
  const reduce = useReducedMotion()
  const panelRef = useRef(null)

  useEffect(() => {
    if (!modal) return
    const onKey = (e) => e.key === 'Escape' && closeModal()
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    // move focus into the dialog
    requestAnimationFrame(() => panelRef.current?.focus())
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [modal, closeModal])

  const meta = {
    pilot: {
      title: 'Developer Pilot Request',
      sub: 'Share a few details and we’ll follow up.',
    },
    waitlist: {
      title: 'Homeowner Waitlist',
      sub: 'We’ll let you know when Home Compass is available.',
    },
  }

  return (
    <AnimatePresence>
      {modal && (
        <motion.div
          key="backdrop"
          className="fixed inset-0 z-[100] grid place-items-center overflow-y-auto bg-navy/65 p-4 backdrop-blur-sm sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduce ? 0 : 0.2 }}
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) closeModal()
          }}
        >
          <motion.div
            key={modal}
            ref={panelRef}
            tabIndex={-1}
            role="dialog"
            aria-modal="true"
            aria-label={meta[modal].title}
            className="relative my-auto w-full max-w-[680px] overflow-hidden rounded-panel border border-line bg-white shadow-lvl2 outline-none"
            initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.95, y: 18 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.97, y: 10 }}
            transition={reduce ? { duration: 0 } : { type: 'spring', stiffness: 340, damping: 28 }}
          >
            <CloudBand onClose={closeModal} />
            <div className="border-b border-line-soft px-7 pb-5 pt-6 sm:px-9">
              <h2 className="text-[1.35rem] font-bold text-navy">{meta[modal].title}</h2>
              <p className="mt-1 text-[0.93rem]">{meta[modal].sub}</p>
            </div>
            <div className="max-h-[62vh] overflow-y-auto px-7 py-6 sm:px-9">
              {modal === 'pilot' ? <PilotForm /> : <WaitlistForm />}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

/**
 * Decorative sky band at the top of the modal (CloudWatch form
 * pattern): a soft cloud drifts after the cursor wherever it moves,
 * on a lazy spring so it feels like weather, not a pointer.
 */
function CloudBand({ onClose }) {
  const reduce = useReducedMotion()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 34, damping: 16, mass: 1.2 })
  const sy = useSpring(y, { stiffness: 34, damping: 16, mass: 1.2 })

  useEffect(() => {
    if (reduce) return
    const onMove = (e) => {
      x.set((e.clientX / window.innerWidth - 0.5) * 360)
      y.set((e.clientY / window.innerHeight - 0.5) * 26)
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [reduce, x, y])

  return (
    <div className="relative h-28 overflow-hidden bg-[radial-gradient(140%_120%_at_50%_-40%,#0b3fa8_0%,#062a72_55%,#010f2e_100%)]">
      {/* faint horizon ring */}
      <div aria-hidden="true" className="absolute left-1/2 top-10 h-[420px] w-[420px] -translate-x-1/2 rounded-full border border-white/[0.08]" />
      {/* back cloud — drifts less, reads as distance */}
      <motion.div aria-hidden="true" className="absolute left-[18%] top-9" style={reduce ? {} : { x: sy, y: 0 }}>
        <Cloud className="w-20 opacity-30" />
      </motion.div>
      {/* main cloud — follows the mouse */}
      <motion.div aria-hidden="true" className="absolute left-1/2 top-6 -ml-16" style={reduce ? {} : { x: sx, y: sy }}>
        <motion.div
          animate={reduce ? {} : { y: [0, -5, 0] }}
          transition={reduce ? {} : { duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Cloud className="w-32 opacity-90" />
        </motion.div>
      </motion.div>
      <button
        type="button"
        onClick={onClose}
        aria-label="Close dialog"
        className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full text-white/80 transition-colors hover:bg-white/10 hover:text-white"
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M18 6 6 18M6 6l12 12" />
        </svg>
      </button>
    </div>
  )
}

function Cloud({ className = '' }) {
  return (
    <svg viewBox="0 0 120 60" className={className} fill="none" aria-hidden="true">
      <path
        d="M28 50h64a16 16 0 0 0 3.8-31.5A24 24 0 0 0 50 12.6 18 18 0 0 0 17 26a14 14 0 0 0 11 24z"
        fill="white"
        fillOpacity="0.92"
      />
      <ellipse cx="46" cy="46" rx="34" ry="9" fill="white" fillOpacity="0.35" />
    </svg>
  )
}

function useSubmitFlow(required) {
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | loading | success
  const [done, setDone] = useState(false)

  const onSubmit = (e) => {
    e.preventDefault()
    const { errors: errs } = validateForm(e.currentTarget, required)
    setErrors(errs)
    if (Object.keys(errs).length) return
    setStatus('loading')
    setTimeout(() => {
      setStatus('success')
      setTimeout(() => setDone(true), 900)
    }, 800)
  }

  const clearError = (name) => setErrors((prev) => (prev[name] ? { ...prev, [name]: undefined } : prev))

  return { errors, status, done, onSubmit, clearError }
}

function SuccessNote({ title, body }) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      className="py-10 text-center"
      initial={reduce ? false : { opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.25 }}
      role="status"
    >
      <span className="mx-auto mb-5 grid h-14 w-14 place-items-center rounded-full bg-brand-100 text-brand">
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 6 9 17l-5-5" />
        </svg>
      </span>
      <h3 className="mb-2 text-[1.3rem] font-bold text-navy">{title}</h3>
      <p className="mx-auto max-w-[400px]">{body}</p>
    </motion.div>
  )
}

export function PilotForm() {
  const required = ['name', 'email', 'company', 'role', 'company_type', 'pilot_scope', 'homes', 'digital_packs', 'problem']
  const { errors, status, done, onSubmit, clearError } = useSubmitFlow(required)

  if (done) {
    return (
      <SuccessNote
        title="Thank you."
        body="Your pilot request has been received. We’ll review your details and get back to you shortly."
      />
    )
  }

  return (
    <form onSubmit={onSubmit} noValidate onInput={(e) => clearError(e.target.name)} className="grid gap-5 sm:grid-cols-2">
      <Field label="Full name" error={errors.name}>
        <TextInput name="name" placeholder="Your full name" autoComplete="name" error={errors.name} />
      </Field>
      <Field label="Work email" error={errors.email}>
        <TextInput name="email" type="email" placeholder="name@company.com" autoComplete="email" error={errors.email} />
      </Field>
      <Field label="Company name" error={errors.company}>
        <TextInput name="company" placeholder="Your company or development business" autoComplete="organization" error={errors.company} />
      </Field>
      <Field label="Role" error={errors.role}>
        <Select
          name="role"
          placeholder="Select your role"
          error={errors.role}
          options={['Sales / Marketing', 'Customer Care / Aftercare', 'Operations', 'Development / Project Team', 'Founder / Director', 'Other']}
        />
      </Field>
      <Field label="Company type" error={errors.company_type}>
        <Select
          name="company_type"
          placeholder="Select company type"
          error={errors.company_type}
          options={['Residential developer', 'Estate developer', 'Property management company', 'Construction company', 'Real estate agency', 'Other']}
        />
      </Field>
      <Field label="Where would you like to pilot?" error={errors.pilot_scope}>
        <Select
          name="pilot_scope"
          placeholder="Select an option"
          error={errors.pilot_scope}
          options={['One development', 'One building', 'A small group of homes', 'A full development phase', 'Not sure yet']}
        />
      </Field>
      <Field label="Approximate number of homes" error={errors.homes}>
        <Select
          name="homes"
          placeholder="Select a range"
          error={errors.homes}
          options={['1–10', '11–50', '51–100', '100+', 'Not sure yet']}
        />
      </Field>
      <Field label="Digital handover packs today?" error={errors.digital_packs}>
        <Select
          name="digital_packs"
          placeholder="Select an option"
          error={errors.digital_packs}
          options={['Yes', 'No', 'Partly', 'Not sure']}
        />
      </Field>
      <Field label="What problem are you trying to solve?" error={errors.problem} full>
        <TextArea name="problem" placeholder="Tell us about your current handover or aftercare process." error={errors.problem} />
      </Field>
      <Field label="Anything else we should know?" optional full>
        <TextArea name="notes" placeholder="Share any useful context." />
      </Field>
      <div className="sm:col-span-2">
        <SubscribeButton status={status} idleLabel="Request Pilot" successLabel="Request received" className="w-full sm:w-auto" />
      </div>
    </form>
  )
}

export function WaitlistForm() {
  const required = ['name', 'email', 'who', 'use', 'property']
  const { errors, status, done, onSubmit, clearError } = useSubmitFlow(required)

  if (done) {
    return (
      <SuccessNote
        title="You’re on the list."
        body="We’ll keep you updated as Home Compass becomes available."
      />
    )
  }

  return (
    <form onSubmit={onSubmit} noValidate onInput={(e) => clearError(e.target.name)} className="grid gap-5 sm:grid-cols-2">
      <Field label="Full name" error={errors.name}>
        <TextInput name="name" placeholder="Your full name" autoComplete="name" error={errors.name} />
      </Field>
      <Field label="Email address" error={errors.email}>
        <TextInput name="email" type="email" placeholder="your@email.com" autoComplete="email" error={errors.email} />
      </Field>
      <Field label="Are you a homeowner or buyer?" error={errors.who}>
        <Select
          name="who"
          placeholder="Select an option"
          error={errors.who}
          options={['Current homeowner', 'New-build buyer', 'Planning to buy soon', 'Renter', 'Other']}
        />
      </Field>
      <Field label="What would you use it for most?" error={errors.use}>
        <Select
          name="use"
          placeholder="Select an option"
          error={errors.use}
          options={['Finding documents', 'Tracking warranties', 'Managing repairs', 'Setting reminders', 'Preparing for resale or rental', 'Not sure yet']}
        />
      </Field>
      <Field label="What kind of property?" error={errors.property} full>
        <Select
          name="property"
          placeholder="Select property type"
          error={errors.property}
          options={['House', 'Apartment', 'New-build home', 'Existing home', 'Other']}
        />
      </Field>
      <Field label="Optional message" optional full>
        <TextArea name="message" placeholder="Tell us what would make managing your home easier." />
      </Field>
      <div className="sm:col-span-2">
        <SubscribeButton status={status} idleLabel="Join Waitlist" successLabel="You’re on the list" className="w-full sm:w-auto" />
      </div>
    </form>
  )
}
