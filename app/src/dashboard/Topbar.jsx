import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence, useReducedMotion } from 'motion/react'
import Icon from './icons.jsx'
import { useAuth } from '../auth/AuthContext.jsx'

export default function Topbar({ onOpenSidebar }) {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const reduce = useReducedMotion()
  const [menuOpen, setMenuOpen] = useState(false)
  const [bellOpen, setBellOpen] = useState(false)
  const menuRef = useRef(null)
  const bellRef = useRef(null)

  useEffect(() => {
    const onClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false)
      if (bellRef.current && !bellRef.current.contains(e.target)) setBellOpen(false)
    }
    document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [])

  const initials = (user?.name || 'A J').split(' ').map((w) => w[0]).slice(0, 2).join('')

  const doLogout = () => {
    logout()
    navigate('/login', { replace: true })
  }

  const notifications = [
    { id: 1, text: 'Plot 002 — Electrical Certificate uploaded', time: '10 min ago' },
    { id: 2, text: 'New homeowner accepted their invite', time: '1 hr ago' },
    { id: 3, text: 'Defect resolved on Plot 005', time: '3 hrs ago' },
  ]

  return (
    <header className="sticky top-0 z-30 flex h-[70px] items-center gap-3 border-b border-line bg-white/85 px-4 backdrop-blur-md sm:px-6">
      {/* mobile menu button */}
      <button
        type="button"
        onClick={onOpenSidebar}
        className="grid h-10 w-10 place-items-center rounded-lg text-slateBody transition-colors hover:bg-ghost lg:hidden"
        aria-label="Open menu"
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M3 6h18M3 12h18M3 18h18" /></svg>
      </button>

      {/* search */}
      <div className="relative hidden max-w-md flex-1 sm:block">
        <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slateSoft">
          <Icon.search className="h-[18px] w-[18px]" />
        </span>
        <input
          type="search"
          placeholder="Search estates, plots, documents…"
          className="w-full rounded-xl border border-line bg-ghost py-2.5 pl-11 pr-4 text-[0.9rem] text-navy outline-none transition-[border-color,box-shadow] duration-150 placeholder:text-slateSoft focus:border-brand focus:bg-white focus:shadow-[0_0_0_3px_rgb(0_82_204/0.15)]"
        />
      </div>

      <div className="ml-auto flex items-center gap-1.5 sm:gap-2">
        {/* notifications */}
        <div ref={bellRef} className="relative">
          <button
            type="button"
            onClick={() => setBellOpen((o) => !o)}
            className="relative grid h-10 w-10 place-items-center rounded-xl text-slateBody transition-colors hover:bg-ghost"
            aria-label="Notifications"
          >
            <Icon.bell className="h-[20px] w-[20px]" />
            <span className="absolute right-2 top-2 grid h-4 w-4 place-items-center rounded-full bg-rose-500 text-[0.6rem] font-bold text-white">3</span>
          </button>
          <AnimatePresence>
            {bellOpen && (
              <motion.div
                initial={reduce ? { opacity: 0 } : { opacity: 0, y: -8, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8, scale: 0.97 }}
                transition={{ duration: 0.16, ease: [0.22, 1, 0.36, 1] }}
                className="absolute right-0 top-12 w-80 overflow-hidden rounded-2xl border border-line bg-white shadow-lvl2"
              >
                <div className="border-b border-line-soft px-4 py-3 text-[0.9rem] font-bold text-navy">Notifications</div>
                <ul className="max-h-80 overflow-y-auto">
                  {notifications.map((n) => (
                    <li key={n.id} className="flex gap-3 border-b border-line-soft px-4 py-3 last:border-0 hover:bg-ghost">
                      <span className="mt-1 h-2 w-2 flex-none rounded-full bg-brand" />
                      <span>
                        <span className="block text-[0.85rem] leading-snug text-navy">{n.text}</span>
                        <span className="mt-0.5 block text-[0.75rem] text-slateSoft">{n.time}</span>
                      </span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* user menu */}
        <div ref={menuRef} className="relative">
          <button
            type="button"
            onClick={() => setMenuOpen((o) => !o)}
            className="flex items-center gap-2.5 rounded-xl py-1.5 pl-1.5 pr-2 transition-colors hover:bg-ghost"
          >
            <span className="grid h-9 w-9 flex-none place-items-center rounded-full bg-brand text-[0.85rem] font-bold text-white">{initials}</span>
            <span className="hidden text-left leading-tight sm:block">
              <span className="block text-[0.88rem] font-semibold text-navy">{user?.name}</span>
              <span className="block text-[0.74rem] text-slateSoft">{user?.company}</span>
            </span>
            <Icon.chevronDown className="hidden h-4 w-4 text-slateSoft sm:block" />
          </button>
          <AnimatePresence>
            {menuOpen && (
              <motion.div
                initial={reduce ? { opacity: 0 } : { opacity: 0, y: -8, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8, scale: 0.97 }}
                transition={{ duration: 0.16, ease: [0.22, 1, 0.36, 1] }}
                className="absolute right-0 top-12 w-56 overflow-hidden rounded-2xl border border-line bg-white p-1.5 shadow-lvl2"
              >
                <div className="px-3 py-2.5">
                  <p className="text-[0.88rem] font-semibold text-navy">{user?.name}</p>
                  <p className="truncate text-[0.78rem] text-slateSoft">{user?.email}</p>
                </div>
                <div className="my-1 h-px bg-line-soft" />
                <button type="button" className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-[0.88rem] font-medium text-slateBody transition-colors hover:bg-ghost hover:text-navy">
                  <Icon.settings className="h-[18px] w-[18px]" /> Account settings
                </button>
                <button
                  type="button"
                  onClick={doLogout}
                  className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-[0.88rem] font-medium text-rose-600 transition-colors hover:bg-rose-50"
                >
                  <Icon.logout className="h-[18px] w-[18px]" /> Log out
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  )
}
