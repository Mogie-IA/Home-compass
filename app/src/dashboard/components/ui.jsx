import { motion, useReducedMotion } from 'motion/react'

/* ---------------- tones ---------------- */
const TONES = {
  brand: 'bg-brand-100 text-brand',
  emerald: 'bg-emerald-50 text-emerald-600',
  amber: 'bg-amber-50 text-amber-600',
  violet: 'bg-violet-50 text-violet-600',
  slate: 'bg-slate-100 text-slate-600',
}

export function IconTile({ tone = 'brand', children, className = '' }) {
  return (
    <span className={['grid place-items-center rounded-xl', TONES[tone] || TONES.brand, className].join(' ')}>
      {children}
    </span>
  )
}

/* ---------------- status pill ---------------- */
const PILLS = {
  Ready: 'bg-emerald-50 text-emerald-700',
  Verified: 'bg-emerald-50 text-emerald-700',
  Active: 'bg-emerald-50 text-emerald-700',
  Completed: 'bg-emerald-50 text-emerald-700',
  'In Review': 'bg-brand-50 text-brand-deep',
  'In Progress': 'bg-brand-50 text-brand-deep',
  Invited: 'bg-brand-50 text-brand-deep',
  Processing: 'bg-brand-50 text-brand-deep',
  Pending: 'bg-amber-50 text-amber-700',
  'Due Soon': 'bg-amber-50 text-amber-700',
  Medium: 'bg-amber-50 text-amber-700',
  Minor: 'bg-amber-50 text-amber-700',
  Missing: 'bg-rose-50 text-rose-700',
  Open: 'bg-rose-50 text-rose-700',
  Major: 'bg-rose-50 text-rose-700',
  High: 'bg-rose-50 text-rose-700',
  None: 'bg-slate-100 text-slate-500',
}

export function Pill({ children }) {
  return (
    <span className={['inline-flex items-center rounded-full px-2.5 py-1 text-[0.75rem] font-semibold', PILLS[children] || 'bg-slate-100 text-slate-600'].join(' ')}>
      {children}
    </span>
  )
}

/* ---------------- readiness / progress bar ---------------- */
export function ProgressBar({ value, className = '' }) {
  const color = value >= 90 ? 'bg-emerald-500' : value >= 55 ? 'bg-brand' : value >= 40 ? 'bg-amber-500' : 'bg-rose-500'
  return (
    <div className={['h-1.5 w-full overflow-hidden rounded-full bg-line', className].join(' ')}>
      <motion.div
        className={['h-full rounded-full', color].join(' ')}
        initial={{ width: 0 }}
        whileInView={{ width: `${value}%` }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      />
    </div>
  )
}

/* ---------------- panel (card with header + View all) ---------------- */
export function Panel({ title, action, children, className = '', padded = true }) {
  return (
    <section className={['rounded-2xl border border-line bg-white shadow-lvl1', className].join(' ')}>
      {(title || action) && (
        <header className="flex items-center justify-between gap-4 px-5 pt-5 sm:px-6">
          {title && <h3 className="text-[1.05rem] font-bold text-navy">{title}</h3>}
          {action}
        </header>
      )}
      <div className={padded ? 'p-5 sm:p-6' : ''}>{children}</div>
    </section>
  )
}

export function ViewAll({ onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="text-[0.85rem] font-semibold text-brand transition-colors hover:text-brand-deep"
    >
      View all
    </button>
  )
}

/* ---------------- stat card ---------------- */
export function StatCard({ stat, index = 0, icon }) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1], delay: index * 0.05 }}
      whileHover={reduce ? {} : { y: -3 }}
      className="rounded-2xl border border-line bg-white p-5 shadow-lvl1 transition-shadow duration-300 hover:shadow-lvl2"
    >
      <div className="flex items-start justify-between">
        <IconTile tone={stat.tone} className="h-11 w-11">
          <span className="h-5 w-5">{icon}</span>
        </IconTile>
      </div>
      <p className="mt-4 text-[0.85rem] font-medium text-slateBody">{stat.label}</p>
      <p className="mt-0.5 text-[1.9rem] font-bold leading-none text-navy">{stat.value}</p>
      {stat.sub && <p className="mt-2 text-[0.8rem] text-slateSoft">{stat.sub}</p>}
    </motion.div>
  )
}

/* ---------------- page header ---------------- */
export function PageHeader({ title, subtitle, action }) {
  return (
    <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 className="text-[1.6rem] font-bold tracking-[-0.01em] text-navy sm:text-[1.85rem]">{title}</h1>
        {subtitle && <p className="mt-1 text-[0.96rem] text-slateBody">{subtitle}</p>}
      </div>
      {action}
    </div>
  )
}

/* ---------------- primary action button ---------------- */
export function ActionButton({ children, onClick, icon, variant = 'primary' }) {
  const reduce = useReducedMotion()
  const styles =
    variant === 'primary'
      ? 'bg-brand text-white shadow-[inset_0_1px_0_rgb(255_255_255/0.22),0_1px_2px_rgb(0_23_42/0.08)] hover:bg-brand-hover'
      : 'border border-line bg-white text-navy hover:border-brand/40 hover:text-brand-deep'
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileTap={reduce ? {} : { scale: 0.96 }}
      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      className={['inline-flex items-center gap-2 rounded-brand px-4 py-2.5 text-[0.92rem] font-semibold transition-colors duration-150', styles].join(' ')}
    >
      {icon && <span className="h-4 w-4">{icon}</span>}
      {children}
    </motion.button>
  )
}

/* ---------------- reveal (page-level) ---------------- */
export function DashReveal({ children, delay = 0, className = '' }) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      className={className}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  )
}
