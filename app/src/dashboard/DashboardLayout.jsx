import { useState } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { motion, AnimatePresence, useReducedMotion } from 'motion/react'
import Sidebar from './Sidebar.jsx'
import Topbar from './Topbar.jsx'
import { useAuth } from '../auth/AuthContext.jsx'

export default function DashboardLayout() {
  const { isAuthed } = useAuth()
  const location = useLocation()
  const reduce = useReducedMotion()
  const [mobileOpen, setMobileOpen] = useState(false)

  if (!isAuthed) return <Navigate to="/login" replace state={{ from: location.pathname }} />

  return (
    <div className="min-h-[100dvh] bg-ghost">
      {/* desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-[256px] border-r border-line bg-white lg:block">
        <Sidebar />
      </aside>

      {/* mobile sidebar drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-40 bg-navy/40 backdrop-blur-sm lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
            />
            <motion.aside
              className="fixed inset-y-0 left-0 z-50 w-[264px] border-r border-line bg-white lg:hidden"
              initial={reduce ? { opacity: 0 } : { x: '-100%' }}
              animate={reduce ? { opacity: 1 } : { x: 0 }}
              exit={reduce ? { opacity: 0 } : { x: '-100%' }}
              transition={{ type: 'spring', stiffness: 320, damping: 34 }}
            >
              <Sidebar onNavigate={() => setMobileOpen(false)} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* main */}
      <div className="lg:pl-[256px]">
        <Topbar onOpenSidebar={() => setMobileOpen(true)} />
        <main className="px-4 py-6 sm:px-6 sm:py-8">
          <div className="mx-auto max-w-[1200px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={location.pathname}
                initial={reduce ? { opacity: 0 } : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              >
                <Outlet />
              </motion.div>
            </AnimatePresence>
          </div>
        </main>
      </div>
    </div>
  )
}
