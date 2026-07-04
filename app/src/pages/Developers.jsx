import { useModal } from '../components/ModalContext.jsx'
import ShineButton from '../components/ShineButton.jsx'
import ScrollHero from '../components/ScrollHero.jsx'
import FrameShot from '../components/FrameShot.jsx'
import CardScroller from '../components/CardScroller.jsx'
import Reveal from '../components/Reveal.jsx'
import Eyebrow from '../components/Eyebrow.jsx'
import dashEstates from '../assets/img/dash-estates.png'
import dashDeveloper from '../assets/img/dash-developer.png'

const GAINS = [
  { title: 'Better buyer experience', body: 'A clear, modern way for owners to reach their home information after move-in.' },
  { title: 'Fewer repeated questions', body: 'Documents, warranties, manuals, and contacts are easy to find.' },
  { title: 'Consistent handovers', body: 'A repeatable digital structure for every home, plot, or phase.' },
  { title: 'Stronger brand perception', body: 'A clean digital handover feels organised, modern, and buyer-focused.' },
  { title: 'Easier coordination', body: 'Sales, handover, and aftercare teams work from one property record.' },
]

const USE_CASES = [
  'New-build handover packs',
  'Apartment handovers',
  'Estate handover records',
  'Warranty management',
  'Buyer aftercare support',
  'Post-completion access',
  'Development phase pilots',
  'Premium buyer experience',
]

export default function Developers() {
  const { openModal } = useModal()
  return (
    <>
      <ScrollHero
        eyebrow="For developers"
        title="Give buyers a better handover experience."
        lead="Organise property records, cut aftercare friction, and deliver a more professional post-completion experience."
        actions={
          <ShineButton variant="inverse" size="lg" onClick={() => openModal('pilot')}>
            Request a Developer Pilot
          </ShineButton>
        }
        shot={{
          src: dashEstates,
          alt: 'Home Compass estates dashboard with handover progress, bulk uploads, and files needing review',
          url: 'app.homecompass.co / estates',
        }}
      />

      {/* Problem */}
      <section className="py-24">
        <div className="shell">
          <Reveal className="mx-auto max-w-[680px] text-center">
            <Eyebrow center>The gap</Eyebrow>
            <h2 className="mb-4 text-[clamp(2rem,3.6vw,3rem)] font-bold leading-[1.16] tracking-[-0.015em] text-navy">
              After completion, buyers still need support.
            </h2>
            <p className="text-[clamp(1.05rem,1.5vw,1.185rem)] leading-relaxed">
              The sales journey is polished. Aftercare often runs on scattered documents and repeated questions. Home Compass gives it structure.
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
              Five ways Home Compass earns its place.
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
                Handover readiness, plot by plot.
              </h2>
              <p>
                Track document status, defects, and readiness for every plot. Bulk-upload packs and let Home Compass match files to the right homes.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <FrameShot
                src={dashDeveloper}
                alt="Handover Control view listing plots with document status, handover dates, and readiness"
                url="app.homecompass.co / handover"
              />
            </Reveal>
          </div>
        </div>
      </section>

      {/* Use cases */}
      <section className="py-24">
        <div className="shell">
          <Reveal className="mb-10">
            <Eyebrow>Where it fits</Eyebrow>
            <h2 className="text-[clamp(2rem,3.6vw,3rem)] font-bold leading-[1.16] tracking-[-0.015em] text-navy">
              Developer use cases
            </h2>
          </Reveal>
          <Reveal>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {USE_CASES.map((u) => (
                <div
                  key={u}
                  className="flex items-center gap-3 rounded-[12px] border border-line bg-white px-5 py-[18px] text-[0.94rem] font-medium text-navy shadow-lvl1 transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-lvl2"
                >
                  <span className="diamond h-2 w-2 flex-none bg-brand" />
                  {u}
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-24">
        <div className="shell">
          <Reveal>
            <div className="grid gap-10 rounded-panel border border-brand-100 bg-brand-50 p-11 md:grid-cols-2 md:p-16">
              <div>
                <Eyebrow>Next step</Eyebrow>
                <h2 className="mb-4 text-[clamp(1.65rem,2.8vw,2.25rem)] font-bold leading-[1.2] tracking-[-0.01em] text-navy">
                  Pilot Home Compass on your next handover.
                </h2>
                <p className="mb-7">
                  One development, one building, or a limited group of homes. Test it, gather feedback, decide.
                </p>
                <ShineButton size="lg" onClick={() => openModal('pilot')}>
                  Request a Pilot
                </ShineButton>
              </div>
              <ul className="self-center rounded-card border border-line bg-white px-7 py-3 shadow-lvl1">
                {['Sample property records set up.', 'Handover documents uploaded.', 'Homeowners get My Home access.', 'Feedback and rollout recommendations.'].map((t) => (
                  <li key={t} className="relative border-b border-line-soft py-[9px] pl-8 text-[0.97rem] last:border-b-0">
                    <span className="diamond absolute left-[3px] top-4 h-2 w-2 bg-brand" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
