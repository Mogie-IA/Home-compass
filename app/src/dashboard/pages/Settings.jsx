import { useState } from 'react'
import { Panel, PageHeader, ActionButton } from '../components/ui.jsx'
import { useAuth } from '../../auth/AuthContext.jsx'

function Toggle({ on, onChange }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!on)}
      aria-pressed={on}
      className={['relative h-6 w-11 flex-none rounded-full transition-colors', on ? 'bg-brand' : 'bg-line'].join(' ')}
    >
      <span className={['absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all', on ? 'left-[22px]' : 'left-0.5'].join(' ')} />
    </button>
  )
}

const field = 'w-full rounded-brand border border-line bg-white px-3.5 py-2.5 text-[0.92rem] text-navy outline-none transition-[border-color,box-shadow] duration-150 focus:border-brand focus:shadow-[0_0_0_3px_rgb(0_82_204/0.15)]'

export default function Settings() {
  const { user } = useAuth()
  const [prefs, setPrefs] = useState({ handover: true, defects: true, weekly: false, digest: true })

  return (
    <>
      <PageHeader title="Settings" subtitle="Manage your profile, company and notifications." />

      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <div className="space-y-6">
          <Panel title="Profile">
            <div className="mb-5 flex items-center gap-4">
              <span className="grid h-16 w-16 place-items-center rounded-full bg-brand text-[1.3rem] font-bold text-white">
                {(user?.name || 'A J').split(' ').map((w) => w[0]).slice(0, 2).join('')}
              </span>
              <ActionButton variant="secondary">Change photo</ActionButton>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="mb-1.5 block text-[0.85rem] font-semibold text-navy">Full name</span>
                <input className={field} defaultValue={user?.name} />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-[0.85rem] font-semibold text-navy">Work email</span>
                <input className={field} defaultValue={user?.email} />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-[0.85rem] font-semibold text-navy">Company</span>
                <input className={field} defaultValue={user?.company} />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-[0.85rem] font-semibold text-navy">Role</span>
                <input className={field} defaultValue="Developer · Admin" />
              </label>
            </div>
            <div className="mt-5">
              <ActionButton>Save changes</ActionButton>
            </div>
          </Panel>

          <Panel title="Company">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="mb-1.5 block text-[0.85rem] font-semibold text-navy">Business name</span>
                <input className={field} defaultValue="Watchtower Homes" />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-[0.85rem] font-semibold text-navy">Support email</span>
                <input className={field} defaultValue="aftercare@watchtowerhomes.co" />
              </label>
            </div>
          </Panel>
        </div>

        <div className="space-y-6">
          <Panel title="Notifications">
            <ul className="space-y-4">
              {[
                { key: 'handover', label: 'Handover updates', sub: 'When a plot reaches 100% readiness' },
                { key: 'defects', label: 'New defects', sub: 'When a homeowner logs an issue' },
                { key: 'weekly', label: 'Weekly summary', sub: 'A digest every Monday' },
                { key: 'digest', label: 'Document matches', sub: 'When auto-match needs review' },
              ].map((n) => (
                <li key={n.key} className="flex items-start justify-between gap-4">
                  <span>
                    <span className="block text-[0.88rem] font-semibold text-navy">{n.label}</span>
                    <span className="block text-[0.78rem] text-slateSoft">{n.sub}</span>
                  </span>
                  <Toggle on={prefs[n.key]} onChange={(v) => setPrefs((p) => ({ ...p, [n.key]: v }))} />
                </li>
              ))}
            </ul>
          </Panel>

          <Panel title="Plan">
            <p className="text-[0.9rem] font-semibold text-navy">Developer Plan</p>
            <p className="mt-1 text-[0.82rem] text-slateSoft">Trial ends in 23 days · 3 of 5 handovers used</p>
            <div className="mt-4"><ActionButton>Upgrade plan</ActionButton></div>
          </Panel>
        </div>
      </div>
    </>
  )
}
