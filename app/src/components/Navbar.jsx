import { useEffect, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'motion/react'
import { Link, useLocation } from 'react-router-dom'
import ShineButton from './ShineButton.jsx'
import mark from '../assets/img/mark.png'

const LINKS = [
  { to: '/', label: 'Home' },
  { to: '/developers', label: 'For Developers' },
  { to: '/homeowners', label: 'For Homeowners' },
  { to: '/how-it-works', label: 'How It Works' },
  { to: '/#features', label: 'Features' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [hovered, setHovered] = useState(null)
  const { pathname } = useLocation()
  const reduce = useReducedMotion()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <>
    <header
      className={[
        'fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow] duration-300',
        scrolled && !open
          ? 'bg-navy-900/90 shadow-[0_1px_0_rgb(255_255_255/0.08)] backdrop-blur-md'
          : 'bg-transparent',
      ].join(' ')}
    >
      <div className="shell">
        <nav aria-label="Main" className="relative z-[45] flex min-h-[76px] items-center justify-between gap-6">
          <Link to="/" className="flex items-center gap-3 text-[1.14rem] font-bold tracking-tight text-white">
            <motion.span
              className="grid h-[42px] w-[42px] flex-none place-items-center rounded-[11px] bg-white shadow-[0_2px_6px_rgb(0_0_0/0.18)]"
              whileHover={reduce ? {} : { rotate: -6, scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300, damping: 18 }}
            >
              <img src={mark} alt="" width="30" height="30" />
            </motion.span>
            <span>
              Home <em className="not-italic text-skyline">Compass</em>
            </span>
          </Link>

          {/* Desktop links with a hover pill that glides between items */}
          <div className="hidden items-center gap-1 lg:flex" onMouseLeave={() => setHovered(null)}>
            {LINKS.map(({ to, label }) => {
              const isActive = to === pathname
              return (
                <Link
                  key={to}
                  to={to}
                  onMouseEnter={() => setHovered(to)}
                  aria-current={isActive ? 'page' : undefined}
                  className={[
                    'relative rounded-full px-3.5 py-[9px] text-[0.94rem] font-medium transition-colors duration-150',
                    isActive ? 'text-white' : 'text-white/80 hover:text-white',
                  ].join(' ')}
                >
                  {(hovered === to || (hovered === null && isActive)) && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full bg-white/[0.13]"
                      transition={reduce ? { duration: 0 } : { type: 'spring', stiffness: 400, damping: 32 }}
                    />
                  )}
                  <span className="relative z-[1]">{label}</span>
                </Link>
              )
            })}
          </div>

          <div className="hidden lg:block">
            <ShineButton variant="inverse" size="sm" to="/login">
              Log in
            </ShineButton>
          </div>

          {/* Mobile toggle */}
          <button
            type="button"
            className="grid h-11 w-11 place-items-center lg:hidden"
            aria-expanded={open}
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((o) => !o)}
          >
            <span className="relative block h-4 w-[22px]">
              <motion.span
                className="absolute left-0 top-0 h-0.5 w-full rounded bg-white"
                animate={open ? { y: 7, rotate: 45 } : { y: 0, rotate: 0 }}
                transition={{ duration: 0.2 }}
              />
              <motion.span
                className="absolute left-0 top-[7px] h-0.5 w-full rounded bg-white"
                animate={open ? { opacity: 0 } : { opacity: 1 }}
                transition={{ duration: 0.15 }}
              />
              <motion.span
                className="absolute left-0 top-[14px] h-0.5 w-full rounded bg-white"
                animate={open ? { y: -7, rotate: -45 } : { y: 0, rotate: 0 }}
                transition={{ duration: 0.2 }}
              />
            </span>
          </button>
        </nav>
      </div>
    </header>

    {/* Mobile menu — rendered as a root sibling (NOT inside <header>): the
        header's backdrop-blur establishes a containing block that would trap a
        `fixed` child to the header's height. As a sibling it fills the viewport.
        Sits at z-40, just under the z-50 header bar so the logo + close button
        stay visible and tappable on top of the overlay. */}
    <AnimatePresence>
      {open && (
        <motion.div
          key="mobile-menu"
          className="fixed inset-0 z-40 flex flex-col overflow-y-auto bg-navy-900 lg:hidden"
          initial={reduce ? { opacity: 0 } : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* subtle brand wash so the overlay isn't a flat slab */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_70%_at_50%_-10%,rgb(84_140_255/0.22),transparent_60%)]"
          />
          <motion.nav
            aria-label="Mobile"
            className="relative flex min-h-full flex-col px-6 pb-[max(2rem,env(safe-area-inset-bottom))] pt-[calc(76px+1.5rem)]"
            initial="hidden"
            animate="show"
            variants={{ show: { transition: { delayChildren: reduce ? 0 : 0.08, staggerChildren: reduce ? 0 : 0.06 } } }}
          >
            <div className="flex flex-col">
              {LINKS.map(({ to, label }) => {
                const isActive = to === pathname
                return (
                  <motion.div
                    key={to}
                    variants={{
                      hidden: reduce ? {} : { opacity: 0, x: -16 },
                      show: { opacity: 1, x: 0, transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } },
                    }}
                  >
                    <Link
                      to={to}
                      onClick={() => setOpen(false)}
                      aria-current={isActive ? 'page' : undefined}
                      className={[
                        'flex items-center justify-between border-b border-white/10 py-[18px] text-[1.5rem] font-semibold tracking-tight transition-colors',
                        isActive ? 'text-skyline' : 'text-white hover:text-skyline',
                      ].join(' ')}
                    >
                      {label}
                      {isActive && <span className="diamond h-2.5 w-2.5 bg-skyline" />}
                    </Link>
                  </motion.div>
                )
              })}
            </div>

            <motion.div
              variants={{
                hidden: reduce ? {} : { opacity: 0, y: 12 },
                show: { opacity: 1, y: 0, transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } },
              }}
              className="mt-auto pt-10"
            >
              <ShineButton
                variant="inverse"
                size="lg"
                className="w-full"
                to="/login"
                onClick={() => setOpen(false)}
              >
                Log in
              </ShineButton>
              <p className="mt-4 text-center text-sm text-white/55">
                Built for developers, estate teams, and homeowners.
              </p>
            </motion.div>
          </motion.nav>
        </motion.div>
      )}
    </AnimatePresence>
    </>
  )
}
