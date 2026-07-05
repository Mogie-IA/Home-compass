import Reveal from './Reveal.jsx'
import Eyebrow from './Eyebrow.jsx'

/**
 * Three value cards shown on the home page, just under the hero shot.
 * At rest each card is white with a blue-filled icon frame. On hover a
 * Home-Compass-blue radial fill sweeps out of the bottom-left corner toward
 * the top-right, the copy turns white, and the icon frame inverts to a
 * white fill with a dark icon. Pure CSS group-hover — reduced-motion safe.
 */

const CARDS = [
  {
    title: 'Built-in Compliance',
    body: 'Certificates, warranties and regulatory records — organised, tracked and audit-ready from day one.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 3l7 2.6v5.2c0 4.4-3 8.1-7 9.2-4-1.1-7-4.8-7-9.2V5.6z" />
        <path d="M9 12l2 2 4-4.2" />
      </svg>
    ),
  },
  {
    title: 'Effortless by Design',
    body: 'Bulk upload once. Home Compass matches every document to the right home automatically.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M4 14v3.5A2.5 2.5 0 0 0 6.5 20h11a2.5 2.5 0 0 0 2.5-2.5V14" />
        <path d="M12 15V4" />
        <path d="M7.5 8.5 12 4l4.5 4.5" />
      </svg>
    ),
  },
  {
    title: 'A Record That Lasts',
    body: 'No more lost files or forgotten repairs. Every home keeps its full history for life.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M3.2 12a8.8 8.8 0 1 1 2.6 6.2" />
        <path d="M3 14.5 3 19M3 19l4.5 0" />
        <path d="M12 7.5V12l3 2" />
      </svg>
    ),
  },
]

function ValueCard({ title, body, icon }) {
  return (
    <article className="group relative flex flex-col overflow-hidden rounded-[22px] border border-line bg-white p-8 shadow-lvl1 transition-[transform,box-shadow,border-color] duration-500 ease-brand hover:-translate-y-1.5 hover:border-brand hover:shadow-[0_26px_50px_-18px_rgb(0_61_155/0.4)] motion-reduce:transition-none motion-reduce:hover:translate-y-0">
      {/* radial brand fill, emanating from the bottom-left corner */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-0 z-0 aspect-square w-[340%] -translate-x-1/2 translate-y-1/2 scale-0 rounded-full bg-brand transition-transform duration-[650ms] ease-brand group-hover:scale-100 motion-reduce:transition-none"
      />
      <div className="relative z-10 flex flex-col">
        <span className="mb-7 grid h-14 w-14 place-items-center rounded-2xl bg-brand text-white shadow-[0_8px_18px_-8px_rgb(0_82_204/0.55)] transition-colors duration-500 ease-brand group-hover:bg-white group-hover:text-navy group-hover:shadow-none motion-reduce:transition-none">
          <span className="h-6 w-6">{icon}</span>
        </span>
        <h3 className="mb-2.5 text-[1.28rem] font-bold tracking-[-0.01em] text-navy transition-colors duration-500 ease-brand group-hover:text-white motion-reduce:transition-none">
          {title}
        </h3>
        <p className="text-[0.97rem] leading-relaxed text-slateBody transition-colors duration-500 ease-brand group-hover:text-white/90 motion-reduce:transition-none">
          {body}
        </p>
      </div>
    </article>
  )
}

export default function ValueCards() {
  return (
    <section className="bg-white py-24 md:py-28">
      <div className="shell">
        <Reveal className="mx-auto mb-14 max-w-[640px] text-center">
          <Eyebrow center>The difference</Eyebrow>
          <h2 className="mb-4 text-[clamp(2rem,3.6vw,3rem)] font-bold leading-[1.16] tracking-[-0.015em] text-navy">
            Everything a new home should come with.
          </h2>
          <p className="text-[clamp(1.05rem,1.5vw,1.185rem)] leading-relaxed">
            Compliant from day one, effortless to keep up, and built to last the life of the property.
          </p>
        </Reveal>
        <div className="grid gap-6 md:grid-cols-3">
          {CARDS.map((card, i) => (
            <Reveal key={card.title} delay={i * 0.08} className="h-full">
              <ValueCard {...card} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
