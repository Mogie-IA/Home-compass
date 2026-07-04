import { useReducedMotion } from 'motion/react'

/**
 * Infinite scrolling image band (21st.dev marquee pattern).
 * Content is duplicated; CSS animates the track by -50%.
 * Pauses on hover; becomes a plain scrollable row for reduced motion.
 */
export default function Marquee({ items, speed = 42 }) {
  const reduce = useReducedMotion()

  if (reduce) {
    return (
      <div className="flex gap-6 overflow-x-auto px-6 pb-4">
        {items.map((item, i) => (
          <MarqueeCard key={i} {...item} />
        ))}
      </div>
    )
  }

  return (
    <div className="group relative overflow-hidden">
      {/* edge fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-ghost to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-ghost to-transparent" />
      <div
        className="flex w-max gap-6 [animation:hc-marquee_var(--dur)_linear_infinite] group-hover:[animation-play-state:paused]"
        style={{ '--dur': `${speed}s` }}
      >
        {[...items, ...items].map((item, i) => (
          <MarqueeCard key={i} ariaHidden={i >= items.length} {...item} />
        ))}
      </div>
      <style>{`@keyframes hc-marquee { to { transform: translateX(-50%); } }`}</style>
    </div>
  )
}

function MarqueeCard({ src, alt, label, ariaHidden = false }) {
  return (
    <figure
      aria-hidden={ariaHidden || undefined}
      className="w-[320px] flex-none overflow-hidden rounded-card border border-line bg-white shadow-lvl1 transition-shadow duration-300 hover:shadow-lvl2 md:w-[520px]"
    >
      <img src={src} alt={ariaHidden ? '' : alt} className="block w-full" loading="lazy" draggable="false" />
      {label && (
        <figcaption className="border-t border-line-soft px-5 py-3 text-[0.85rem] font-semibold text-navy">
          {label}
        </figcaption>
      )}
    </figure>
  )
}
