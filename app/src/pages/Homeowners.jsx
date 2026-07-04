import { useModal } from '../components/ModalContext.jsx'
import ShineButton from '../components/ShineButton.jsx'
import ScrollHero from '../components/ScrollHero.jsx'
import FrameShot from '../components/FrameShot.jsx'
import CardScroller from '../components/CardScroller.jsx'
import Reveal from '../components/Reveal.jsx'
import Eyebrow from '../components/Eyebrow.jsx'
import dashHomeowner from '../assets/img/dash-homeowner.png'
import repairDetail from '../assets/img/repair-detail.png'

const GAINS = [
  { title: 'Find documents faster', body: 'Key home records without digging through folders or inboxes.' },
  { title: 'Know what is covered', body: 'Warranties, certificates, and guarantees in one place.' },
  { title: 'Keep repair history', body: 'Repairs, updates, and maintenance tracked over time.' },
  { title: 'Set useful reminders', body: 'Servicing, warranty dates, and safety checks — on time.' },
  { title: 'Be ready for resale', body: 'A clean record for future sale, rental, or ownership changes.' },
]

export default function Homeowners() {
  const { openModal } = useModal()
  return (
    <>
      <ScrollHero
        eyebrow="For homeowners"
        title="Your home should come with a memory."
        lead="One organised place for documents, warranties, manuals, repairs, and reminders."
        actions={
          <ShineButton variant="inverse" size="lg" onClick={() => openModal('waitlist')}>
            Join the Waitlist
          </ShineButton>
        }
        shot={{
          src: dashHomeowner,
          alt: 'Home Compass My Home dashboard with properties, documents, issues, and reminders',
          url: 'app.homecompass.co / my-home',
        }}
      />

      {/* Problem */}
      <section className="py-24">
        <div className="shell">
          <Reveal className="mx-auto max-w-[680px] text-center">
            <Eyebrow center>The problem</Eyebrow>
            <h2 className="mb-4 text-[clamp(2rem,3.6vw,3rem)] font-bold leading-[1.16] tracking-[-0.015em] text-navy">
              Important home information gets lost too easily.
            </h2>
            <p className="text-[clamp(1.05rem,1.5vw,1.185rem)] leading-relaxed">
              Emails, paper packs, PDFs, drawers, old messages. Home Compass keeps it all in one simple digital record.
            </p>
          </Reveal>
        </div>
      </section>

      {/* What you gain — scroll-driven card track */}
      <CardScroller
        heading={
          <Reveal>
            <Eyebrow>What you gain</Eyebrow>
            <h2 className="text-[clamp(2rem,3.6vw,3rem)] font-bold leading-[1.16] tracking-[-0.015em] text-navy">
              Five things your home record does for you.
            </h2>
          </Reveal>
        }
        cards={GAINS}
      />

      {/* In the platform */}
      <section className="border-y border-line-soft bg-ghost py-24">
        <div className="shell">
          <div className="grid items-center gap-12 lg:grid-cols-[5fr_7fr] lg:gap-16">
            <Reveal>
              <Eyebrow>In the platform</Eyebrow>
              <h2 className="mb-4 text-[clamp(1.65rem,2.8vw,2.25rem)] font-bold leading-[1.2] tracking-[-0.01em] text-navy">
                When something breaks, everything you need is already there.
              </h2>
              <p className="mb-4">
                Log an issue and it links to the right appliance, its manual, and its warranty automatically.
              </p>
              <p>
                Need a tradesperson? Share a secure link with only the details they need.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <FrameShot
                src={repairDetail}
                alt="Repair issue for a leaking kitchen tap linked to its appliance, manual, and warranty, with a secure share link"
                url="app.homecompass.co / repairs"
              />
            </Reveal>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 text-center">
        <Reveal className="shell">
          <h2 className="mb-4 text-[clamp(2.2rem,4.6vw,3.4rem)] font-bold leading-[1.12] tracking-[-0.02em] text-navy">
            Be first to try
            <br />
            Home Compass.
          </h2>
          <p className="mx-auto mb-8 max-w-[520px]">
            Join the waitlist and get updates when Home Compass becomes available.
          </p>
          <ShineButton size="lg" onClick={() => openModal('waitlist')}>
            Join the Waitlist
          </ShineButton>
        </Reveal>
      </section>
    </>
  )
}
