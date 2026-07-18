import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'motion/react'
import AuthBackground from './AuthBackground.jsx'
import mark from '../../assets/img/mark.png'

/**
 * Full-screen auth layout (no site nav): animated white backdrop with a
 * single centred glass-edged card. Used by both Login and Signup.
 */
export default function AuthShell({ children, footer }) {
  const reduce = useReducedMotion()
  return (
    <div className="relative flex min-h-[100dvh] flex-col items-center justify-center px-5 py-10">
      <AuthBackground />

      <Link
        to="/"
        className="absolute left-6 top-6 z-10 flex items-center gap-2.5 text-[1.05rem] font-bold tracking-tight text-navy transition-opacity hover:opacity-80"
      >
        <span className="grid h-9 w-9 place-items-center rounded-[10px] bg-white shadow-[0_2px_8px_rgb(0_23_42/0.12)] ring-1 ring-line">
          <img src={mark} alt="" width="24" height="24" />
        </span>
        Home <span className="text-brand">Compass</span>
      </Link>

      <motion.div
        initial={reduce ? { opacity: 0 } : { opacity: 0, y: 18, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={reduce ? { duration: 0.2 } : { type: 'spring', stiffness: 260, damping: 26 }}
        className="relative z-10 w-full max-w-[440px] rounded-[26px] border border-line bg-white/85 p-8 shadow-[0_30px_60px_-24px_rgb(0_23_42/0.28)] backdrop-blur-xl sm:p-10"
      >
        {children}
      </motion.div>

      {footer && <div className="relative z-10 mt-6 text-center text-[0.92rem] text-slateBody">{footer}</div>}
    </div>
  )
}
