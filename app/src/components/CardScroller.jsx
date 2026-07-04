import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react'

/**
 * Scroll-driven horizontal card track (21st.dev horizontal-scroll pattern):
 * the section pins while vertical scroll drives the cards sideways.
 * On small screens (or reduced motion) it degrades to a swipeable
 * snap-scrolling row.
 */
export default function CardScroller({ heading, cards }) {
  const targetRef = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: targetRef })
  const x = useTransform(scrollYProgress, [0, 1], ['2%', '-62%'])

  return (
    <>
      {/* Pinned horizontal track — desktop */}
      <section ref={targetRef} className="relative hidden h-[280vh] md:block">
        <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
          {heading && <div className="shell mb-10 w-full">{heading}</div>}
          <motion.div style={reduce ? {} : { x }} className="flex gap-6 pl-[max(1.5rem,calc((100vw-1200px)/2))]">
            {cards.map((card, i) => (
              <ScrollCard key={i} index={i} {...card} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Swipeable row — mobile */}
      <section className="md:hidden">
        {heading && <div className="shell mb-8">{heading}</div>}
        <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-4">
          {cards.map((card, i) => (
            <ScrollCard key={i} index={i} mobile {...card} />
          ))}
        </div>
      </section>
    </>
  )
}

function ScrollCard({ num, title, body, index, mobile = false }) {
  return (
    <motion.article
      className={[
        'flex-none snap-start rounded-panel border border-line bg-white p-8 shadow-lvl1',
        mobile ? 'w-[82vw]' : 'w-[400px]',
      ].join(' ')}
      whileHover={{ y: -4, boxShadow: '0 12px 28px -8px rgb(0 61 155 / 0.18)' }}
      transition={{ type: 'spring', stiffness: 300, damping: 26 }}
    >
      <span className="mb-5 grid h-12 w-12 place-items-center rounded-full bg-navy text-[1.02rem] font-bold text-white">
        {num ?? index + 1}
      </span>
      <h3 className="mb-2 text-[1.15rem] font-semibold text-navy">{title}</h3>
      <p className="text-[0.95rem] leading-relaxed">{body}</p>
    </motion.article>
  )
}
