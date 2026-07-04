import { useState, useId } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'motion/react'

/** Accordion row with animated height + chevron. */
export default function FaqItem({ question, answer }) {
  const [open, setOpen] = useState(false)
  const reduce = useReducedMotion()
  const panelId = useId()

  return (
    <div className="border-b border-line">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls={panelId}
        className="flex w-full items-center justify-between gap-5 px-1 py-[22px] text-left text-[1.04rem] font-semibold text-navy transition-colors hover:text-brand-deep"
      >
        {question}
        <motion.span
          className="mr-1.5 mt-[-4px] h-2.5 w-2.5 flex-none border-b-2 border-r-2 border-brand"
          animate={{ rotate: open ? 225 : 45 }}
          transition={reduce ? { duration: 0 } : { duration: 0.2, ease: 'easeOut' }}
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="panel"
            id={panelId}
            initial={reduce ? false : { height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={reduce ? {} : { height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="px-1 pb-[22px] pr-11">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
