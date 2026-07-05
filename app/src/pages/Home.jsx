import { motion, useReducedMotion } from 'motion/react'
import { useModal } from '../components/ModalContext.jsx'
import ShineButton from '../components/ShineButton.jsx'
import ScrollHero from '../components/ScrollHero.jsx'
import FrameShot from '../components/FrameShot.jsx'
import Marquee from '../components/Marquee.jsx'
import Reveal from '../components/Reveal.jsx'
import Eyebrow from '../components/Eyebrow.jsx'
import FaqItem from '../components/FaqItem.jsx'
import ValueCards from '../components/ValueCards.jsx'
import dashDeveloper from '../assets/img/dash-developer.webp'
import dashHomeowner from '../assets/img/dash-homeowner.webp'
import dashEstates from '../assets/img/dash-estates.webp'
import repairDetail from '../assets/img/repair-detail.webp'
import dashDocuments from '../assets/img/dash-documents.webp'
import dashReminders from '../assets/img/dash-reminders.webp'

const FEATURES = [
  { title: 'Handover Documents', body: 'Welcome packs and completion papers.', icon: 'doc' },
  { title: 'Warranties & Certificates', body: 'Cover and compliance, in one place.', icon: 'shield' },
  { title: 'Manuals & Guides', body: 'Every appliance, findable.', icon: 'book' },
  { title: 'Repairs & Maintenance', body: 'A full service history.', icon: 'tool' },
  { title: 'Key Contacts', body: 'Who to call, instantly.', icon: 'people' },
  { title: 'Reminders', body: 'Expiry dates and safety checks.', icon: 'bell' },
  { title: 'Property Timeline', body: 'Every event, in order.', icon: 'timeline' },
  { title: 'Secure Access', body: 'Always available, never scattered.', icon: 'lock' },
]

const FAQS = [
  {
    q: 'What is Home Compass?',
    a: 'A digital home record platform: developers deliver handover information through it, and homeowners keep using it for documents, warranties, repairs, and reminders.',
  },
  {
    q: 'Who is it for?',
    a: 'Residential developers, estate teams, aftercare teams, and homeowners.',
  },
  {
    q: 'Is it only for new-build homes?',
    a: 'New-build handover comes first; over time it also supports existing homeowners organising their records.',
  },
  {
    q: 'Does it replace the aftercare team?',
    a: 'No — it supports aftercare by making information easier to access.',
  },
  {
    q: 'Can homeowners add their own records?',
    a: 'Yes. The record keeps growing with repairs, reminders, and updates.',
  },
  {
    q: 'Is it available now?',
    a: 'Home Compass is preparing for pilots with residential developers. Developers can request a pilot to get started.',
  },
]

function FeatureIcon({ name }) {
  const paths = {
    doc: <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6" /></>,
    shield: <><path d="M12 3l7 3v5c0 4.5-3 8.2-7 9.5C8 19.2 5 15.5 5 11V6z" /><path d="M9 12l2 2 4-4" /></>,
    book: <><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" /></>,
    tool: <path d="M14.7 6.3a4.5 4.5 0 0 0-6 6L3 18l3 3 5.7-5.7a4.5 4.5 0 0 0 6-6L14 13l-3-3z" />,
    people: <><path d="M17 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2" /><circle cx="10" cy="7" r="4" /><path d="M21 21v-2a4 4 0 0 0-3-3.87" /></>,
    bell: <><path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.7 21a2 2 0 0 1-3.4 0" /></>,
    timeline: <><path d="M12 3v18" /><circle cx="12" cy="7" r="2" /><circle cx="12" cy="17" r="2" /></>,
    lock: <><rect x="3" y="11" width="18" height="10" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></>,
  }
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {paths[name]}
    </svg>
  )
}

function CompassRose() {
  const reduce = useReducedMotion()
  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none absolute -right-60 top-1/2 h-[720px] w-[720px] rounded-full"
      style={{
        y: '-50%',
        background:
          'radial-gradient(circle at center, transparent 54%, rgb(126 168 245 / 0.12) 54.5%, transparent 55.5%), radial-gradient(circle at center, transparent 38%, rgb(126 168 245 / 0.1) 38.5%, transparent 39.5%), conic-gradient(from 0deg, transparent 0 88deg, rgb(126 168 245 / 0.07) 90deg, transparent 92deg 178deg, rgb(126 168 245 / 0.07) 180deg, transparent 182deg 268deg, rgb(126 168 245 / 0.07) 270deg, transparent 272deg)',
      }}
      animate={reduce ? {} : { rotate: [-8, 8, -8] }}
      transition={reduce ? {} : { duration: 13, repeat: Infinity, ease: 'easeInOut' }}
    />
  )
}

function CheckItem({ children, dark = false }) {
  return (
    <li
      className={[
        'relative border-b py-[9px] pl-8 text-[0.97rem] last:border-b-0',
        dark ? 'border-white/[0.09] text-[#c3d1e6]' : 'border-line-soft',
      ].join(' ')}
    >
      <span className={['diamond absolute left-[3px] top-4 h-2 w-2', dark ? 'bg-skyline' : 'bg-brand'].join(' ')} />
      {children}
    </li>
  )
}

export default function Home() {
  const { openModal } = useModal()
  const reduceMotion = useReducedMotion()

  const steps = [
    { title: 'Developer creates the record', body: 'Address, plot, development, handover details.' },
    { title: 'Documents are uploaded', body: 'Packs, warranties, manuals, certificates, contacts.' },
    { title: 'Homeowner gets My Home', body: 'A clean dashboard from day one.' },
    { title: 'The record stays useful', body: 'Repairs, reminders, and updates over time.' },
  ]

  return (
    <>
      {/* ============ Hero — Container Scroll Animation ============ */}
      <ScrollHero
        title="A digital home record for every new property."
        lead="One organised place for documents, warranties, manuals, repairs, and reminders — for developers and the homeowners they hand over to."
        actions={
          <>
            <ShineButton variant="inverse" size="lg" onClick={() => openModal('pilot')}>
              Request a Pilot
            </ShineButton>
            <ShineButton variant="ghost" size="lg" to="/how-it-works">
              See How It Works
            </ShineButton>
          </>
        }
        shot={{
          src: dashDeveloper,
          alt: 'Home Compass developer dashboard showing handover readiness, plots, documents, and aftercare issues',
          url: 'app.homecompass.co / handover',
        }}
      />

      {/* ============ Value cards ============ */}
      <ValueCards />

      {/* ============ Problem ============ */}
      <section className="bg-ghost pt-16 md:pt-10">
        <div className="shell">
          <Reveal className="mx-auto mb-12 max-w-[680px] text-center">
            <Eyebrow center>The problem</Eyebrow>
            <h2 className="mb-4 text-[clamp(2rem,3.6vw,3rem)] font-bold leading-[1.16] tracking-[-0.015em] text-navy">
              Home handover is still too fragmented.
            </h2>
            <p className="text-[clamp(1.05rem,1.5vw,1.185rem)] leading-relaxed">
              Handover information ends up scattered across emails, PDFs, paper packs, and different teams.
            </p>
          </Reveal>
          <div className="grid gap-7 md:grid-cols-2">
            <Reveal>
              <article className="h-full rounded-panel border border-line bg-white p-9 shadow-lvl1">
                <span className="mb-2.5 block text-[0.82rem] font-semibold uppercase tracking-[0.08em] text-brand">For developers</span>
                <h3 className="mb-3 text-[1.3rem] font-bold text-navy">The pack becomes an operations problem.</h3>
                <ul>
                  <CheckItem>Handover packs are hard to organise consistently.</CheckItem>
                  <CheckItem>Buyers ask the same questions repeatedly.</CheckItem>
                  <CheckItem>Aftercare teams hunt for documents that should be at hand.</CheckItem>
                </ul>
              </article>
            </Reveal>
            <Reveal delay={0.08}>
              <article className="h-full rounded-panel border border-line bg-white p-9 shadow-lvl1">
                <span className="mb-2.5 block text-[0.82rem] font-semibold uppercase tracking-[0.08em] text-brand">For homeowners</span>
                <h3 className="mb-3 text-[1.3rem] font-bold text-navy">The information a home needs goes missing.</h3>
                <ul>
                  <CheckItem>Documents get buried in inboxes.</CheckItem>
                  <CheckItem>Manuals and warranties go missing when needed.</CheckItem>
                  <CheckItem>Repairs and contacts live in five different places.</CheckItem>
                </ul>
              </article>
            </Reveal>
          </div>
          <Reveal className="mx-auto mt-11 max-w-[640px] pb-20 text-center">
            <p className="text-[1.12rem] font-semibold text-navy">
              Home Compass gives every property a structured digital record from day one.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ============ Solution ============ */}
      <section className="py-24 md:py-28">
        <div className="shell">
          <div className="grid items-center gap-12 lg:grid-cols-[7fr_5fr] lg:gap-16">
            <Reveal>
              <Eyebrow>The solution</Eyebrow>
              <h2 className="mb-4 text-[clamp(2rem,3.6vw,3rem)] font-bold leading-[1.16] tracking-[-0.015em] text-navy">
                One organised home profile. Built at handover. Useful for years.
              </h2>
              <p className="mb-8">
                Developers upload the key documents once. Homeowners get simple access to everything after moving in.
              </p>
              <div className="grid gap-6 sm:grid-cols-2">
                {[
                  { t: 'Centralised records', b: 'Every document in one secure home profile.', icon: 'doc' },
                  { t: 'Better aftercare', b: 'Answers without chasing different teams.', icon: 'people' },
                  { t: 'Cleaner operations', b: 'One consistent process across every property.', icon: 'timeline' },
                  { t: 'Long-term memory', b: 'A record that grows with the home.', icon: 'bell' },
                ].map(({ t, b, icon }) => (
                  <div key={t}>
                    <h3 className="mb-1.5 flex items-center gap-2.5 text-[1.04rem] font-semibold text-navy">
                      <span className="grid h-10 w-10 flex-none place-items-center rounded-full bg-brand-100 text-brand">
                        <FeatureIcon name={icon} />
                      </span>
                      {t}
                    </h3>
                    <p className="text-[0.94rem]">{b}</p>
                  </div>
                ))}
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <FrameShot
                src={dashHomeowner}
                alt="Home Compass homeowner dashboard with properties, documents, issues, and reminders"
                url="app.homecompass.co / my-home"
              />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============ Marquee — a look inside ============ */}
      <section className="border-y border-line-soft bg-ghost py-24">
        <Reveal className="shell mb-12 text-center">
          <Eyebrow center>A look inside</Eyebrow>
          <h2 className="text-[clamp(2rem,3.6vw,3rem)] font-bold leading-[1.16] tracking-[-0.015em] text-navy">
            The record, from every angle.
          </h2>
        </Reveal>
        <Marquee
          items={[
            { src: dashEstates, alt: 'Estates overview with handover progress', label: 'Estate overview' },
            { src: dashDocuments, alt: 'Document library with warranties, manuals, and certificates', label: 'Document library' },
            { src: dashHomeowner, alt: 'Homeowner My Home dashboard', label: 'My Home dashboard' },
            { src: repairDetail, alt: 'Repair issue linked to appliance, manual, and warranty', label: 'Repairs & issues' },
            { src: dashReminders, alt: 'Reminders and property timeline view', label: 'Reminders & timeline' },
            { src: dashDeveloper, alt: 'Handover control with plot readiness', label: 'Handover control' },
          ]}
        />
      </section>

      {/* ============ How it works ============ */}
      <section className="py-24 md:py-28">
        <div className="shell">
          <Reveal className="mx-auto mb-12 max-w-[680px] text-center">
            <Eyebrow center>The process</Eyebrow>
            <h2 className="text-[clamp(2rem,3.6vw,3rem)] font-bold leading-[1.16] tracking-[-0.015em] text-navy">
              How Home Compass works
            </h2>
          </Reveal>
          <motion.div
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
            variants={{ show: { transition: { staggerChildren: 0.08 } } }}
          >
            {steps.map(({ title, body }, i) => (
              <motion.article
                key={title}
                variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } } }}
                className="rounded-card border border-line bg-white p-7 shadow-lvl1 transition-shadow duration-300 hover:shadow-lvl2"
              >
                <span className="mb-4 grid h-10 w-10 place-items-center rounded-full bg-navy text-[0.95rem] font-bold text-white">{i + 1}</span>
                <h3 className="mb-1.5 text-[1.06rem] font-semibold text-navy">{title}</h3>
                <p className="text-[0.93rem]">{body}</p>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ============ Audience split ============ */}
      <section className="pb-24 md:pb-28">
        <div className="shell">
          <Reveal className="mx-auto mb-12 max-w-[680px] text-center">
            <Eyebrow center>Who it serves</Eyebrow>
            <h2 className="text-[clamp(2rem,3.6vw,3rem)] font-bold leading-[1.16] tracking-[-0.015em] text-navy">
              Built for both sides of the handover.
            </h2>
          </Reveal>
          <div className="grid gap-7 md:grid-cols-2">
            <Reveal>
              <motion.article
                whileHover={reduceMotion ? {} : { y: -6 }}
                transition={{ type: 'spring', stiffness: 300, damping: 24 }}
                className="group flex h-full flex-col rounded-panel bg-navy p-10 text-[#b9c8de] transition-shadow duration-300 hover:shadow-[0_28px_56px_-18px_rgb(0_23_42/0.55),inset_0_1px_0_rgb(126_168_245/0.25)]"
              >
                <span className="mb-3 block text-[0.82rem] font-semibold uppercase tracking-[0.08em] text-skyline transition-transform duration-300 group-hover:translate-x-1">For developers</span>
                <h3 className="mb-3 text-[clamp(1.4rem,2vw,1.7rem)] font-bold tracking-[-0.01em] text-white">
                  A more polished handover for every buyer.
                </h3>
                <ul className="mb-8 flex-1">
                  <CheckItem dark>Structured records for each home.</CheckItem>
                  <CheckItem dark>Fewer repeated aftercare questions.</CheckItem>
                  <CheckItem dark>Consistency across developments.</CheckItem>
                  <CheckItem dark>A stronger brand after completion.</CheckItem>
                </ul>
                <ShineButton variant="inverse" className="self-start" onClick={() => openModal('pilot')}>
                  Request a Developer Pilot
                </ShineButton>
              </motion.article>
            </Reveal>
            <Reveal delay={0.08}>
              <motion.article
                whileHover={reduceMotion ? {} : { y: -6 }}
                transition={{ type: 'spring', stiffness: 300, damping: 24 }}
                className="group flex h-full flex-col rounded-panel border border-brand-100 bg-brand-50 p-10 transition-[box-shadow,border-color] duration-300 hover:border-[#c8d8f0] hover:shadow-lvl2"
              >
                <span className="mb-3 block text-[0.82rem] font-semibold uppercase tracking-[0.08em] text-brand transition-transform duration-300 group-hover:translate-x-1">For homeowners</span>
                <h3 className="mb-3 text-[clamp(1.4rem,2vw,1.7rem)] font-bold tracking-[-0.01em] text-navy">
                  Everything about your home, in one place.
                </h3>
                <ul className="flex-1">
                  <CheckItem>Find documents fast.</CheckItem>
                  <CheckItem>Track warranties and repairs.</CheckItem>
                  <CheckItem>Set reminders that matter.</CheckItem>
                  <CheckItem>Be ready for resale or rental.</CheckItem>
                </ul>
              </motion.article>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============ Features ============ */}
      <section id="features" className="scroll-mt-24 border-y border-line-soft bg-ghost py-24 md:py-28">
        <div className="shell">
          <Reveal className="mx-auto mb-12 max-w-[680px] text-center">
            <Eyebrow center>The record</Eyebrow>
            <h2 className="text-[clamp(2rem,3.6vw,3rem)] font-bold leading-[1.16] tracking-[-0.015em] text-navy">
              What can be stored in Home Compass?
            </h2>
          </Reveal>
          <motion.div
            className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
            variants={{ show: { transition: { staggerChildren: 0.05 } } }}
          >
            {FEATURES.map(({ title, body, icon }) => (
              <motion.article
                key={title}
                variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } } }}
                whileHover={{ y: -4 }}
                className="rounded-card border border-line bg-white p-6 shadow-lvl1 transition-[border-color,box-shadow] duration-300 hover:border-[#c8d8f0] hover:shadow-lvl2"
              >
                <span className="mb-4 grid h-11 w-11 place-items-center rounded-full bg-brand-100 text-brand">
                  <FeatureIcon name={icon} />
                </span>
                <h3 className="mb-1.5 text-[1.02rem] font-semibold text-navy">{title}</h3>
                <p className="text-[0.9rem]">{body}</p>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ============ Pitch (dark) ============ */}
      <section className="py-24 md:py-28">
        <div className="shell">
          <Reveal>
            <div className="relative overflow-hidden rounded-panel bg-navy p-12 text-[#b9c8de] md:p-[72px]">
              {/* etched compass rose — sways like a needle settling */}
              <CompassRose />
              <div className="relative grid gap-12 lg:grid-cols-2">
                <div>
                  <Eyebrow light>The moment that matters</Eyebrow>
                  <h2 className="mb-4 text-[clamp(2rem,3.6vw,3rem)] font-bold leading-[1.16] tracking-[-0.015em] text-white">
                    Why Home Compass matters
                  </h2>
                  <p className="mb-4 text-[clamp(1.05rem,1.5vw,1.185rem)] leading-relaxed text-[#c3d1e6]">
                    Handover is one of the most important moments in the buyer journey — and it&rsquo;s usually treated as an admin handoff.
                  </p>
                  <p className="font-semibold text-white">
                    Home Compass turns it into a living digital home record.
                  </p>
                </div>
                <ul className="self-center">
                  <CheckItem dark>A better post-completion experience.</CheckItem>
                  <CheckItem dark>Less friction between teams and owners.</CheckItem>
                  <CheckItem dark>A record that stays useful for years.</CheckItem>
                  <CheckItem dark>A real differentiator for developers.</CheckItem>
                </ul>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============ Pilot ============ */}
      <section className="pb-24 md:pb-28">
        <div className="shell">
          <Reveal>
            <div className="grid gap-10 rounded-panel border border-brand-100 bg-brand-50 p-11 md:grid-cols-2 md:p-16">
              <div>
                <Eyebrow>Getting started</Eyebrow>
                <h2 className="mb-4 text-[clamp(1.65rem,2.8vw,2.25rem)] font-bold leading-[1.2] tracking-[-0.01em] text-navy">
                  Start with a focused pilot.
                </h2>
                <p className="mb-7">
                  Test Home Compass on one development, one building, or a handful of homes.
                </p>
                <ShineButton size="lg" onClick={() => openModal('pilot')}>
                  Request a Pilot
                </ShineButton>
              </div>
              <ul className="self-center rounded-card border border-line bg-white px-7 py-3 shadow-lvl1">
                <CheckItem>Sample property records set up.</CheckItem>
                <CheckItem>Handover documents uploaded.</CheckItem>
                <CheckItem>Homeowners get My Home access.</CheckItem>
                <CheckItem>Feedback and rollout recommendations.</CheckItem>
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============ FAQ ============ */}
      <section className="pb-24 md:pb-28">
        <div className="shell">
          <div className="grid gap-10 lg:grid-cols-[5fr_7fr] lg:gap-16">
            <Reveal>
              <Eyebrow>Questions</Eyebrow>
              <h2 className="mb-4 text-[clamp(2rem,3.6vw,3rem)] font-bold leading-[1.16] tracking-[-0.015em] text-navy">
                Frequently asked questions
              </h2>
              <p>
                Something missing? <button type="button" className="relative -my-3 inline-block py-3 font-semibold text-brand hover:text-brand-deep" onClick={() => openModal('pilot')}>Get in touch</button>.
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              {FAQS.map(({ q, a }) => (
                <FaqItem key={q} question={q} answer={a} />
              ))}
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============ Closing CTA ============ */}
      <section className="border-t border-line-soft bg-ghost py-24 text-center md:py-28">
        <Reveal className="shell">
          <h2 className="mb-4 text-[clamp(2.2rem,4.6vw,3.4rem)] font-bold leading-[1.12] tracking-[-0.02em] text-navy">
            Ready to improve
            <br />
            home handover?
          </h2>
          <p className="mx-auto mb-8 max-w-[520px]">
            Start small. Give every home you hand over a record that lasts.
          </p>
          <ShineButton size="lg" onClick={() => openModal('pilot')}>
            Request a Pilot
          </ShineButton>
        </Reveal>
      </section>
    </>
  )
}
