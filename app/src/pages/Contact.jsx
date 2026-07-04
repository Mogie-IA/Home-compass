import { useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import Eyebrow from '../components/Eyebrow.jsx'
import AmbientRings from '../components/AmbientRings.jsx'
import SubscribeButton from '../components/SubscribeButton.jsx'
import { Field, TextInput, TextArea, Select, validateForm } from '../components/FormBits.jsx'
import mark from '../assets/img/mark.png'

/**
 * Contact screen following the 21st.dev animated-contact pattern:
 * a full-height scene with large drifting aurora orbs, recolored from
 * the original orange into the brand's blue family.
 */
export default function Contact() {
  const reduce = useReducedMotion()
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle')
  const [done, setDone] = useState(false)

  const onSubmit = (e) => {
    e.preventDefault()
    const { errors: errs } = validateForm(e.currentTarget, ['name', 'email', 'who', 'message'])
    setErrors(errs)
    if (Object.keys(errs).length) return
    setStatus('loading')
    setTimeout(() => {
      setStatus('success')
      setTimeout(() => setDone(true), 900)
    }, 800)
  }

  const drift = (dur, path) =>
    reduce
      ? {}
      : {
          animate: path,
          transition: { duration: dur, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' },
        }

  return (
    <section className="relative min-h-screen overflow-hidden bg-navy-900 pb-24 pt-40">
      {/* Aurora orbs — brand blues in place of the component's orange */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-[-160px] h-[640px] w-[640px] rounded-full opacity-70 blur-[110px]"
        style={{ background: 'radial-gradient(circle at 35% 35%, #0b3fa8, transparent 65%)' }}
        {...drift(22, { x: [0, 90, 20], y: [0, 40, 90] })}
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute right-[-220px] top-[8%] h-[720px] w-[720px] rounded-full opacity-60 blur-[120px]"
        style={{ background: 'radial-gradient(circle at 60% 40%, #0052cc, transparent 62%)' }}
        {...drift(26, { x: [0, -80, -30], y: [0, 70, 10] })}
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[-260px] left-1/3 h-[560px] w-[560px] rounded-full opacity-50 blur-[100px]"
        style={{ background: 'radial-gradient(circle at 50% 50%, #7ea8f5, transparent 60%)' }}
        {...drift(19, { x: [0, 60, -40], y: [0, -50, -10] })}
      />
      {/* compass ring */}
      <AmbientRings variant="contact" />

      <div className="shell relative">
        <div className="grid items-start gap-14 lg:grid-cols-[6fr_6fr] lg:gap-20">
          {/* Left: heading + details */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            <Eyebrow light>Contact</Eyebrow>
            <h1 className="mb-5 text-[clamp(2.5rem,5vw,3.8rem)] font-bold leading-[1.08] tracking-[-0.02em] text-white">
              Talk to us about Home Compass.
            </h1>
            <p className="mb-10 max-w-[460px] text-[1.1rem] leading-relaxed text-[#c3d1e6]">
              A developer interested in a pilot, or a homeowner who wants early access — we&rsquo;d like to hear from you.
            </p>

            <ul className="space-y-5 text-[#c3d1e6]">
              <li className="flex items-center gap-4">
                <span className="grid h-11 w-11 flex-none place-items-center rounded-[11px] bg-white/[0.08]">
                  <svg viewBox="0 0 24 24" className="h-5 w-5 text-skyline" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><path d="m22 6-10 7L2 6" /></svg>
                </span>
                hello@homecompass.co
              </li>
              <li className="flex items-center gap-4">
                <span className="grid h-11 w-11 flex-none place-items-center rounded-[11px] bg-white/[0.08]">
                  <svg viewBox="0 0 24 24" className="h-5 w-5 text-skyline" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 3" /></svg>
                </span>
                We reply within one working day.
              </li>
              <li className="flex items-center gap-4">
                <span className="grid h-11 w-11 flex-none place-items-center rounded-[11px] bg-white p-1.5">
                  <img src={mark} alt="" className="h-full w-full" />
                </span>
                Built for developers, estate teams, and homeowners.
              </li>
            </ul>
          </motion.div>

          {/* Right: form card */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="rounded-panel border border-white/10 bg-white/[0.06] p-2 backdrop-blur-md"
          >
            <div className="rounded-[18px] bg-white p-7 shadow-lvl2 sm:p-9">
              {done ? (
                <motion.div
                  className="py-12 text-center"
                  initial={reduce ? false : { opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  role="status"
                >
                  <span className="mx-auto mb-5 grid h-14 w-14 place-items-center rounded-full bg-brand-100 text-brand">
                    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
                  </span>
                  <h2 className="mb-2 text-[1.3rem] font-bold text-navy">Thanks for reaching out.</h2>
                  <p>We&rsquo;ll respond as soon as possible.</p>
                </motion.div>
              ) : (
                <>
                  <h2 className="mb-6 text-[1.35rem] font-bold text-navy">Send us a message</h2>
                  <form onSubmit={onSubmit} noValidate onInput={(e) => setErrors((p) => (p[e.target.name] ? { ...p, [e.target.name]: undefined } : p))} className="grid gap-5 sm:grid-cols-2">
                    <Field label="Name" error={errors.name}>
                      <TextInput name="name" placeholder="Your full name" autoComplete="name" error={errors.name} />
                    </Field>
                    <Field label="Email" error={errors.email}>
                      <TextInput name="email" type="email" placeholder="your@email.com" autoComplete="email" error={errors.email} />
                    </Field>
                    <Field label="I am a:" error={errors.who} full>
                      <Select
                        name="who"
                        placeholder="Select an option"
                        error={errors.who}
                        options={['Developer', 'Homeowner', 'Property professional', 'Investor / partner', 'Other']}
                      />
                    </Field>
                    <Field label="Message" error={errors.message} full>
                      <TextArea name="message" placeholder="How can we help?" error={errors.message} />
                    </Field>
                    <div className="sm:col-span-2">
                      <SubscribeButton status={status} idleLabel="Send Message" successLabel="Message sent" className="w-full" />
                    </div>
                  </form>
                </>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
