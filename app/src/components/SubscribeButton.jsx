import { motion, AnimatePresence, useReducedMotion } from 'motion/react'

/**
 * Form submit button following the 21st.dev animated-subscribe pattern:
 * idle label -> spinner -> success check, morphing between states.
 * Shine hover comes from the shared .shine-wrap treatment.
 * Parent owns the status: 'idle' | 'loading' | 'success'.
 */
export default function SubscribeButton({
  status = 'idle',
  idleLabel,
  loadingLabel = 'Submitting...',
  successLabel,
  className = '',
}) {
  const reduce = useReducedMotion()
  const t = reduce ? { duration: 0 } : { duration: 0.22, ease: 'easeOut' }

  const state = {
    idle: (
      <motion.span
        key="idle"
        className="relative z-[2] flex items-center gap-2"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={t}
      >
        {idleLabel}
      </motion.span>
    ),
    loading: (
      <motion.span
        key="loading"
        className="relative z-[2] flex items-center gap-2"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={t}
      >
        <motion.span
          className="h-4 w-4 rounded-full border-2 border-white/40 border-t-white"
          animate={reduce ? {} : { rotate: 360 }}
          transition={reduce ? {} : { repeat: Infinity, duration: 0.8, ease: 'linear' }}
        />
        {loadingLabel}
      </motion.span>
    ),
    success: (
      <motion.span
        key="success"
        className="relative z-[2] flex items-center gap-2"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0 }}
        transition={reduce ? { duration: 0 } : { type: 'spring', stiffness: 400, damping: 22 }}
      >
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <motion.path
            d="M20 6 9 17l-5-5"
            initial={reduce ? {} : { pathLength: 0 }}
            animate={reduce ? {} : { pathLength: 1 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          />
        </svg>
        {successLabel}
      </motion.span>
    ),
  }

  return (
    <motion.button
      type="submit"
      disabled={status !== 'idle'}
      className={[
        'shine-wrap relative inline-flex min-h-[54px] items-center justify-center overflow-hidden rounded-brand px-8 text-[1.06rem] font-semibold leading-none text-white transition-colors duration-200',
        status === 'success' ? 'bg-[#0a8a4a]' : 'bg-brand hover:bg-brand-hover',
        'shadow-[inset_0_1px_0_rgb(255_255_255/0.22)]',
        className,
      ].join(' ')}
      whileTap={reduce || status !== 'idle' ? {} : { scale: 0.96 }}
      aria-live="polite"
    >
      <AnimatePresence mode="wait" initial={false}>
        {state[status]}
      </AnimatePresence>
    </motion.button>
  )
}
