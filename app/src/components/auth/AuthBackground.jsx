import { motion, useReducedMotion } from 'motion/react'

/**
 * Animated auth backdrop — adapted from the 21st.dev "sign in flow" idea
 * (expanding ripples + orbiting motion) but recoloured for our WHITE theme:
 * concentric brand-blue ripples breathe out from center, a faint compass
 * ring rotates, and two soft blue orbs drift. All motion respects
 * prefers-reduced-motion.
 */
export default function AuthBackground() {
  const reduce = useReducedMotion()

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden bg-white">
      {/* base wash */}
      <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_-10%,#eaf1fd_0%,#f5f8fe_45%,#ffffff_100%)]" />

      {/* drifting soft orbs */}
      <motion.div
        className="absolute -left-32 top-[12%] h-[420px] w-[420px] rounded-full opacity-60 blur-[90px]"
        style={{ background: 'radial-gradient(circle at 40% 40%, rgb(84 140 255 / 0.30), transparent 65%)' }}
        animate={reduce ? {} : { x: [0, 70, 10], y: [0, 40, 80] }}
        transition={{ duration: 24, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute right-[-160px] bottom-[6%] h-[460px] w-[460px] rounded-full opacity-50 blur-[100px]"
        style={{ background: 'radial-gradient(circle at 60% 40%, rgb(0 82 204 / 0.22), transparent 62%)' }}
        animate={reduce ? {} : { x: [0, -60, -10], y: [0, -50, -10] }}
        transition={{ duration: 28, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }}
      />

      {/* expanding ripples from center */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        {[0, 1, 2, 3].map((i) => (
          <motion.span
            key={i}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-brand/15"
            style={{ width: 200, height: 200 }}
            initial={{ scale: 0.3, opacity: 0.5 }}
            animate={reduce ? { scale: 1, opacity: 0 } : { scale: [0.3, 3.4], opacity: [0.45, 0] }}
            transition={{
              duration: 9,
              repeat: Infinity,
              ease: 'easeOut',
              delay: i * 2.25,
            }}
          />
        ))}
      </div>

      {/* slow compass ring */}
      <motion.div
        className="absolute left-1/2 top-1/2 h-[760px] w-[760px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-brand/10"
        animate={reduce ? {} : { rotate: 360 }}
        transition={{ duration: 90, repeat: Infinity, ease: 'linear' }}
      />

      {/* subtle grid vignette */}
      <div
        className="absolute inset-0 opacity-[0.4]"
        style={{
          maskImage: 'radial-gradient(60% 50% at 50% 40%, black, transparent 85%)',
          WebkitMaskImage: 'radial-gradient(60% 50% at 50% 40%, black, transparent 85%)',
          backgroundImage:
            'linear-gradient(rgb(0 82 204 / 0.05) 1px, transparent 1px), linear-gradient(90deg, rgb(0 82 204 / 0.05) 1px, transparent 1px)',
          backgroundSize: '46px 46px',
        }}
      />
    </div>
  )
}
