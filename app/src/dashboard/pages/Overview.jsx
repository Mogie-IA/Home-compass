import { useNavigate } from 'react-router-dom'
import { motion } from 'motion/react'
import { StatCard, Panel, ViewAll, Pill, ProgressBar, PageHeader, ActionButton, IconTile } from '../components/ui.jsx'
import Icon from '../icons.jsx'
import { useAuth } from '../../auth/AuthContext.jsx'
import { stats, plots, missingDocs, uploads, activity, issues } from '../mockData.js'

const STAT_ICONS = {
  estates: <Icon.estate className="h-5 w-5" />,
  ready: <Icon.check className="h-5 w-5" />,
  missing: <Icon.doc className="h-5 w-5" />,
  defects: <Icon.wrench className="h-5 w-5" />,
}

const ACT_ICON = {
  upload: { tone: 'brand', el: <Icon.upload className="h-4 w-4" /> },
  resolved: { tone: 'emerald', el: <Icon.check className="h-4 w-4" /> },
  match: { tone: 'violet', el: <Icon.doc className="h-4 w-4" /> },
  invite: { tone: 'amber', el: <Icon.people className="h-4 w-4" /> },
}

export default function Overview() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const first = (user?.name || 'Alex').split(' ')[0]

  return (
    <>
      <PageHeader
        title={`Good morning, ${first} 👋`}
        subtitle="Here’s what’s happening across your estates."
        action={<ActionButton icon={<Icon.plus className="h-4 w-4" />}>Add Estate</ActionButton>}
      />

      {/* stats */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((s, i) => (
          <StatCard key={s.key} stat={s} index={i} icon={STAT_ICONS[s.key]} />
        ))}
      </div>

      {/* recent plots + bulk upload */}
      <div className="mt-6 grid gap-6 xl:grid-cols-[1.7fr_1fr]">
        <Panel title="Recent plots" action={<ViewAll onClick={() => navigate('/app/plots')} />} padded={false}>
          <div className="overflow-x-auto px-2 pb-2">
            <table className="w-full min-w-[560px] border-collapse">
              <thead>
                <tr className="text-left text-[0.75rem] font-semibold uppercase tracking-wide text-slateSoft">
                  <th className="px-4 py-3 font-semibold">Plot</th>
                  <th className="px-4 py-3 font-semibold">Homeowner</th>
                  <th className="px-4 py-3 font-semibold">Status</th>
                  <th className="px-4 py-3 font-semibold">Readiness</th>
                </tr>
              </thead>
              <tbody>
                {plots.slice(0, 6).map((p) => (
                  <motion.tr
                    key={p.id}
                    whileHover={{ backgroundColor: 'rgb(242 246 252)' }}
                    className="cursor-pointer border-t border-line-soft"
                    onClick={() => navigate('/app/plots')}
                  >
                    <td className="px-4 py-3">
                      <div className="text-[0.9rem] font-semibold text-navy">{p.id}</div>
                      <div className="text-[0.78rem] text-slateSoft">{p.type}</div>
                    </td>
                    <td className="px-4 py-3 text-[0.88rem] text-slateBody">{p.homeowner}</td>
                    <td className="px-4 py-3"><Pill>{p.docStatus}</Pill></td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <ProgressBar value={p.readiness} className="w-24" />
                        <span className="text-[0.8rem] font-semibold text-slateBody">{p.readiness}%</span>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </Panel>

        <Panel title="Bulk upload">
          <div className="flex items-center gap-3">
            <IconTile tone="brand" className="h-11 w-11"><Icon.upload className="h-5 w-5" /></IconTile>
            <p className="text-[0.85rem] text-slateBody">Upload documents and let Home Compass auto-match them to the right plots.</p>
          </div>
          <button className="mt-4 flex w-full flex-col items-center justify-center rounded-xl border border-dashed border-brand/35 bg-brand-50/40 px-4 py-6 text-center transition-colors hover:border-brand hover:bg-brand-50">
            <Icon.upload className="mb-2 h-6 w-6 text-brand" />
            <span className="text-[0.86rem] font-semibold text-navy">Drag &amp; drop or <span className="text-brand">browse</span></span>
            <span className="mt-1 text-[0.75rem] text-slateSoft">PDF, JPG, PNG up to 50MB</span>
          </button>
          <div className="mt-5 space-y-3">
            {uploads.map((u) => (
              <div key={u.id} className="flex items-center gap-3">
                <IconTile tone="slate" className="h-9 w-9"><Icon.doc className="h-[18px] w-[18px]" /></IconTile>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-[0.84rem] font-semibold text-navy">{u.name}</div>
                  <div className="text-[0.74rem] text-slateSoft">{u.files} files · {u.date}</div>
                </div>
                <span className="text-[0.76rem] font-semibold text-emerald-600">{u.matched}%</span>
              </div>
            ))}
          </div>
        </Panel>
      </div>

      {/* missing docs / activity / issues */}
      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <Panel title="Missing documents" action={<ViewAll onClick={() => navigate('/app/documents')} />}>
          <ul className="space-y-1">
            {missingDocs.map((d) => (
              <li key={d.id} className="flex items-center justify-between gap-3 rounded-lg px-1 py-2.5 hover:bg-ghost">
                <span className="flex items-center gap-2.5">
                  <span className="grid h-8 w-8 place-items-center rounded-lg bg-rose-50 text-rose-500"><Icon.doc className="h-4 w-4" /></span>
                  <span className="text-[0.86rem] font-medium text-navy">{d.name}</span>
                </span>
                <span className="whitespace-nowrap text-[0.78rem] text-slateSoft">{d.plots} plots</span>
              </li>
            ))}
          </ul>
        </Panel>

        <Panel title="Recent activity" action={<ViewAll onClick={() => navigate('/app/reports')} />}>
          <ul className="space-y-3.5">
            {activity.slice(0, 4).map((a) => {
              const ic = ACT_ICON[a.type] || ACT_ICON.match
              return (
                <li key={a.id} className="flex gap-3">
                  <IconTile tone={ic.tone} className="mt-0.5 h-8 w-8 flex-none">{ic.el}</IconTile>
                  <div>
                    <p className="text-[0.85rem] leading-snug text-navy">
                      <span className="font-semibold">{a.ctx}</span> — {a.title}
                    </p>
                    <p className="mt-0.5 text-[0.74rem] text-slateSoft">{a.by} · {a.time}</p>
                  </div>
                </li>
              )
            })}
          </ul>
        </Panel>

        <Panel title="Aftercare issues" action={<ViewAll onClick={() => navigate('/app/repairs')} />}>
          <ul className="space-y-1">
            {issues.slice(0, 4).map((i) => (
              <li key={i.id} className="flex items-center justify-between gap-3 rounded-lg px-1 py-2.5 hover:bg-ghost">
                <span className="flex items-center gap-2.5">
                  <span className="grid h-8 w-8 place-items-center rounded-lg bg-brand-50 text-brand"><Icon.wrench className="h-4 w-4" /></span>
                  <span>
                    <span className="block text-[0.85rem] font-medium text-navy">{i.title}</span>
                    <span className="block text-[0.74rem] text-slateSoft">{i.plot} · Due {i.due}</span>
                  </span>
                </span>
                <Pill>{i.severity}</Pill>
              </li>
            ))}
          </ul>
        </Panel>
      </div>
    </>
  )
}
