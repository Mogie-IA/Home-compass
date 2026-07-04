import { motion, useReducedMotion } from 'motion/react'

/**
 * The compass-ring backdrop used behind dark heroes.
 *
 * Centering lives on a static wrapper (`left-1/2 -translate-x-1/2`) and the
 * animation lives on an inner child. This split matters: Motion writes the
 * animated `rotate`/`scale` into the element's inline `transform`, which would
 * otherwise wipe out Tailwind's `-translate-x-1/2` and shove the ring off to
 * the right. The child rotates/breathes around its own centre, which now
 * coincides with the centred wrapper.
 */
export default function AmbientRings({ variant = 'hero' }) {
  const reduce = useReducedMotion()

  const spin = reduce
    ? {}
    : { animate: { rotate: 360 }, transition: { duration: 70, repeat: Infinity, ease: 'linear' } }
  const breathe = reduce
    ? {}
    : {
        animate: { scale: [1, 1.045, 1], opacity: [1, 0.55, 1] },
        transition: { duration: 9, repeat: Infinity, ease: 'easeInOut' },
      }

  if (variant === 'contact') {
    return (
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[-380px] h-[1100px] w-[1100px] -translate-x-1/2"
      >
        <motion.div className="h-full w-full rounded-full border border-dashed border-white/[0.08]" {...spin} />
      </div>
    )
  }

  return (
    <>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[-320px] h-[1100px] w-[1100px] -translate-x-1/2"
      >
        <motion.div className="h-full w-full rounded-full border border-white/[0.09]" {...breathe} />
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[-180px] h-[820px] w-[820px] -translate-x-1/2"
      >
        <motion.div className="h-full w-full rounded-full border border-dashed border-white/[0.12]" {...spin} />
      </div>
    </>
  )
}
