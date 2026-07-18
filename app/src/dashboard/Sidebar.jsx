import { NavLink } from 'react-router-dom'
import { motion, useReducedMotion } from 'motion/react'
import Icon from './icons.jsx'
import { plan } from './mockData.js'
import mark from '../assets/img/mark.png'

const NAV = [
  { to: '/app', label: 'Overview', icon: 'overview', end: true },
  { to: '/app/estates', label: 'Estates', icon: 'estate' },
  { to: '/app/plots', label: 'Plots', icon: 'plots' },
  { to: '/app/documents', label: 'Documents', icon: 'doc' },
  { to: '/app/handover', label: 'Handover', icon: 'handover' },
  { to: '/app/repairs', label: 'Repairs & Issues', icon: 'wrench' },
  { to: '/app/homeowners', label: 'Homeowners', icon: 'people' },
  { to: '/app/reports', label: 'Reports', icon: 'reports' },
  { to: '/app/settings', label: 'Settings', icon: 'settings' },
]

export default function Sidebar({ onNavigate }) {
  const reduce = useReducedMotion()
  const pct = Math.round((plan.used / plan.total) * 100)

  return (
    <div className="flex h-full flex-col">
      {/* brand */}
      <div className="flex items-center gap-2.5 px-6 py-5">
        <span className="grid h-10 w-10 flex-none place-items-center rounded-xl bg-brand-100">
          <img src={mark} alt="" width="26" height="26" />
        </span>
        <span className="leading-tight">
          <span className="block text-[1.02rem] font-bold tracking-tight text-navy">Home Compass</span>
          <span className="block text-[0.74rem] font-medium text-slateSoft">Developer</span>
        </span>
      </div>

      {/* nav */}
      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-2">
        {NAV.map(({ to, label, icon, end }) => {
          const IconCmp = Icon[icon]
          return (
            <NavLink
              key={to}
              to={to}
              end={end}
              onClick={onNavigate}
              className={({ isActive }) =>
                [
                  'group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-[0.92rem] font-medium transition-colors duration-150',
                  isActive ? 'text-brand' : 'text-slateBody hover:bg-ghost hover:text-navy',
                ].join(' ')
              }
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <motion.span
                      layoutId="sidebar-active"
                      className="absolute inset-0 rounded-xl bg-brand-50"
                      transition={reduce ? { duration: 0 } : { type: 'spring', stiffness: 400, damping: 32 }}
                    />
                  )}
                  <span className="relative z-[1] h-5 w-5">
                    <IconCmp className="h-5 w-5" />
                  </span>
                  <span className="relative z-[1]">{label}</span>
                </>
              )}
            </NavLink>
          )
        })}
      </nav>

      {/* plan widget */}
      <div className="p-3">
        <div className="rounded-2xl border border-line bg-ghost p-4">
          <p className="text-[0.9rem] font-bold text-navy">{plan.name}</p>
          <p className="mt-0.5 text-[0.78rem] text-slateSoft">Trial ends in {plan.trialDays} days</p>
          <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-line">
            <div className="h-full rounded-full bg-brand" style={{ width: `${pct}%` }} />
          </div>
          <p className="mt-2 text-[0.78rem] text-slateBody">
            {plan.used} of {plan.total} handovers used
          </p>
          <button
            type="button"
            className="mt-3 w-full rounded-brand border border-brand/25 bg-white py-2 text-[0.85rem] font-semibold text-brand transition-colors hover:bg-brand hover:text-white"
          >
            Upgrade Plan
          </button>
        </div>
      </div>
    </div>
  )
}
