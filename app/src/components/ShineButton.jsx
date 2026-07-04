import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'motion/react'
import { Link } from 'react-router-dom'

const VARIANTS = {
  primary: 'bg-brand text-white shadow-[inset_0_1px_0_rgb(255_255_255/0.22)] hover:bg-brand-hover',
  inverse: 'bg-white text-brand-deep shadow-[inset_0_1px_0_rgb(255_255_255/0.6),0_8px_20px_-8px_rgb(0_0_0/0.45)] hover:bg-[#eef3ff]',
  ghost: 'bg-white/10 text-white border border-white/35 hover:bg-white/20 hover:border-white/60',
  outline: 'bg-transparent text-navy border border-[#c6d2e2] hover:border-brand hover:text-brand-deep',
}

const SIZES = {
  sm: 'min-h-[42px] px-5 text-[0.94rem]',
  md: 'min-h-[48px] px-[26px] text-base',
  lg: 'min-h-[54px] px-8 text-[1.06rem]',
}

/**
 * Brand button with a shine sweep on hover and a ripple + press
 * animation on click (21st.dev shine + animated-button patterns).
 * Renders a <button>, router <Link>, or <a> depending on props.
 */
export default function ShineButton({
  variant = 'primary',
  size = 'md',
  to,
  href,
  onClick,
  children,
  className = '',
  type = 'button',
  ...rest
}) {
  const reduce = useReducedMotion()
  const [ripples, setRipples] = useState([])

  const spawnRipple = (e) => {
    if (reduce) return
    const el = e.currentTarget
    const rect = el.getBoundingClientRect()
    const id = Date.now()
    setRipples((r) => [
      ...r,
      { id, x: e.clientX - rect.left, y: e.clientY - rect.top },
    ])
    setTimeout(() => setRipples((r) => r.filter((p) => p.id !== id)), 650)
  }

  const handleClick = (e) => {
    spawnRipple(e)
    onClick?.(e)
  }

  const classes = [
    'shine-wrap relative inline-flex items-center justify-center gap-2 rounded-brand font-semibold leading-none cursor-pointer select-none transition-colors duration-150',
    VARIANTS[variant],
    SIZES[size],
    className,
  ].join(' ')

  const inner = (
    <>
      <span className="relative z-[2]">{children}</span>
      <AnimatePresence>
        {ripples.map((r) => (
          <motion.span
            key={r.id}
            className="pointer-events-none absolute z-[1] rounded-full"
            style={{
              left: r.x,
              top: r.y,
              background:
                variant === 'primary'
                  ? 'rgb(255 255 255 / 0.35)'
                  : 'rgb(0 82 204 / 0.18)',
            }}
            initial={{ width: 0, height: 0, opacity: 0.7, x: '-50%', y: '-50%' }}
            animate={{ width: 260, height: 260, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          />
        ))}
      </AnimatePresence>
    </>
  )

  const motionProps = reduce
    ? {}
    : {
        whileHover: { y: -1 },
        whileTap: { scale: 0.96 },
        transition: { type: 'spring', stiffness: 500, damping: 30 },
      }

  if (to) {
    const MotionLink = motion.create(Link)
    return (
      <MotionLink to={to} className={classes} onClick={handleClick} {...motionProps} {...rest}>
        {inner}
      </MotionLink>
    )
  }
  if (href) {
    return (
      <motion.a href={href} className={classes} onClick={handleClick} {...motionProps} {...rest}>
        {inner}
      </motion.a>
    )
  }
  return (
    <motion.button type={type} className={classes} onClick={handleClick} {...motionProps} {...rest}>
      {inner}
    </motion.button>
  )
}
