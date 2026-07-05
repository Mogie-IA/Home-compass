import { useModal } from '../components/ModalContext.jsx'
import ShineButton from '../components/ShineButton.jsx'
import ScrollHero from '../components/ScrollHero.jsx'
import FrameShot from '../components/FrameShot.jsx'
import CardScroller from '../components/CardScroller.jsx'
import Reveal from '../components/Reveal.jsx'
import Eyebrow from '../components/Eyebrow.jsx'
import dashDeveloper from '../assets/img/dash-developer.webp'
import dashEstates from '../assets/img/dash-estates.webp'
import dashHomeowner from '../assets/img/dash-homeowner.webp'

const STEPS = [
  { title: 'Create the property profile', body: 'Address, plot number, development, property type, handover status.' },
  { title: 'Add handover records', body: 'Documents, warranties, certificates, manuals, guides, and contacts.' },
  { title: 'Invite the homeowner', body: 'They get a clear, simple My Home dashboard.' },
  { title: 'Use after move-in', body: 'Check documents, log repairs, manage reminders.' },
  { title: 'Keep the record alive', body: 'The record grows with repairs, updates, and future documents.' },
]

export default function HowItWorks() {
  const { openModal } = useModal()
  return (
    <>
      <ScrollHero
        eyebrow="The process"
        title="From handover pack to digital home record."
        lead="Simpler for developers. More useful for homeowners."
        actions={
          <ShineButton variant="inverse" size="lg" onClick={() => openModal('pilot')}>
            Request a Pilot
          </ShineButton>
        }
        shot={{
          src: dashDeveloper,
          alt: 'Home Compass handover dashboard tracking plots, documents, and readiness',
          url: 'app.homecompass.co / handover',
        }}
      />

      {/* Steps — scroll-driven card track */}
      <CardScroller
        heading={
          <Reveal>
            <Eyebrow>Step by step</Eyebrow>
            <h2 className="text-[clamp(2rem,3.6vw,3rem)] font-bold leading-[1.16] tracking-[-0.015em] text-navy">
              Five steps from keys to record.
            </h2>
          </Reveal>
        }
        cards={STEPS}
      />

      {/* Two views */}
      <section className="border-y border-line-soft bg-ghost py-24">
        <div className="shell">
          <Reveal className="mx-auto mb-12 max-w-[720px] text-center">
            <Eyebrow center>Two views, one record</Eyebrow>
            <h2 className="mb-4 text-[clamp(2rem,3.6vw,3rem)] font-bold leading-[1.16] tracking-[-0.015em] text-navy">
              Developers manage the estate. Homeowners see their home.
            </h2>
          </Reveal>
          <div className="grid gap-8 md:grid-cols-2">
            <Reveal>
              <FrameShot
                src={dashEstates}
                alt="Developer estates view with handover progress and bulk uploads"
                url="app.homecompass.co / estates"
              />
            </Reveal>
            <Reveal delay={0.1}>
              <FrameShot
                src={dashHomeowner}
                alt="Homeowner My Home dashboard with documents, issues, and reminders"
                url="app.homecompass.co / my-home"
              />
            </Reveal>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 text-center">
        <Reveal className="shell">
          <h2 className="mb-4 text-[clamp(2.2rem,4.6vw,3.4rem)] font-bold leading-[1.12] tracking-[-0.02em] text-navy">
            See it working on
            <br />
            your own handover.
          </h2>
          <p className="mx-auto mb-8 max-w-[520px]">
            Pilot Home Compass with one development, one building, or a small group of homes.
          </p>
          <ShineButton size="lg" onClick={() => openModal('pilot')}>
            Request a Pilot
          </ShineButton>
        </Reveal>
      </section>
    </>
  )
}
