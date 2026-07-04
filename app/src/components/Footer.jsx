import { Link } from 'react-router-dom'
import { useModal } from './ModalContext.jsx'
import ShineButton from './ShineButton.jsx'
import mark from '../assets/img/mark.png'

const LINKS = [
  { to: '/', label: 'Home' },
  { to: '/developers', label: 'For Developers' },
  { to: '/homeowners', label: 'For Homeowners' },
  { to: '/how-it-works', label: 'How It Works' },
  { to: '/contact', label: 'Contact' },
]

export default function Footer() {
  const { openModal } = useModal()
  return (
    <footer className="bg-navy py-16 pb-9 text-[0.93rem] text-[#93a7c2]">
      <div className="shell">
        <div className="grid gap-12 border-b border-white/[0.08] pb-12 md:grid-cols-[1.4fr_1fr_1.2fr]">
          <div>
            <Link to="/" className="mb-4 flex items-center gap-3 text-[1.14rem] font-bold text-white">
              <span className="grid h-[42px] w-[42px] flex-none place-items-center rounded-[11px] bg-white shadow-[0_2px_6px_rgb(0_0_0/0.18)]">
                <img src={mark} alt="" width="30" height="30" />
              </span>
              <span>
                Home <em className="not-italic text-skyline">Compass</em>
              </span>
            </Link>
            <p className="max-w-[300px]">
              A clearer digital handover experience for developers and homeowners.
            </p>
          </div>
          <div>
            <h4 className="mb-4 text-[0.82rem] font-semibold uppercase tracking-[0.08em] text-white">Explore</h4>
            <ul className="space-y-2.5">
              {LINKS.map(({ to, label }) => (
                <li key={to}>
                  <Link to={to} className="relative -my-3 inline-block py-3 text-[#93a7c2] transition-colors hover:text-white">
                    {label}
                  </Link>
                </li>
              ))}
              <li>
                <button type="button" onClick={() => openModal('waitlist')} className="relative -my-3 inline-block py-3 text-[#93a7c2] transition-colors hover:text-white">
                  Join Waitlist
                </button>
              </li>
            </ul>
          </div>
          <div>
            <div className="rounded-card border border-white/10 bg-white/5 p-6">
              <h4 className="mb-3.5 text-[1.05rem] font-semibold text-white">Ready to improve home handover?</h4>
              <ShineButton variant="inverse" onClick={() => openModal('pilot')}>
                Request a Pilot
              </ShineButton>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-5 pt-7 text-[0.85rem] text-[#6d82a1]">
          <span>&copy; 2026 Home Compass. All rights reserved.</span>
          <div className="flex gap-5">
            <a href="#" className="relative -my-3 inline-block py-3 transition-colors hover:text-white">Privacy Policy</a>
            <a href="#" className="relative -my-3 inline-block py-3 transition-colors hover:text-white">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
