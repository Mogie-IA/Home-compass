import { useState } from 'react'
import { Panel, Pill, PageHeader, ActionButton, StatCard } from '../components/ui.jsx'
import DataTable from '../components/DataTable.jsx'
import Icon from '../icons.jsx'
import { issues } from '../mockData.js'

const TABS = ['All', 'Open', 'In Progress', 'Due Soon']
const summary = [
  { key: 'open', label: 'Open Issues', value: '18', sub: 'Across 11 plots', tone: 'brand', icon: 'wrench' },
  { key: 'progress', label: 'In Progress', value: '7', sub: 'Being resolved', tone: 'amber', icon: 'clock' },
  { key: 'due', label: 'Due Soon', value: '4', sub: 'Within 7 days', tone: 'violet', icon: 'clock' },
  { key: 'resolved', label: 'Resolved (30d)', value: '52', sub: '+12% vs last month', tone: 'emerald', icon: 'check' },
]
const STAT_ICONS = { wrench: <Icon.wrench className="h-5 w-5" />, clock: <Icon.clock className="h-5 w-5" />, check: <Icon.check className="h-5 w-5" /> }

export default function Repairs() {
  const [tab, setTab] = useState('All')
  const rows = tab === 'All' ? issues : issues.filter((i) => i.status === tab)

  const columns = [
    {
      key: 'title',
      header: 'Issue',
      render: (i) => (
        <div className="flex items-center gap-3">
          <span className="grid h-9 w-9 flex-none place-items-center rounded-lg bg-brand-50 text-brand"><Icon.wrench className="h-4 w-4" /></span>
          <div>
            <div className="text-[0.88rem] font-semibold text-navy">{i.title}</div>
            <div className="text-[0.76rem] text-slateSoft">{i.plot}</div>
          </div>
        </div>
      ),
    },
    { key: 'severity', header: 'Severity', render: (i) => <Pill>{i.severity}</Pill> },
    { key: 'status', header: 'Status', render: (i) => <Pill>{i.status}</Pill> },
    { key: 'due', header: 'Due', render: (i) => <span className="text-slateBody">{i.due}</span> },
    {
      key: 'action',
      header: '',
      className: 'text-right',
      render: () => <button className="text-slateSoft transition-colors hover:text-navy"><Icon.dots className="ml-auto h-5 w-5" /></button>,
    },
  ]

  return (
    <>
      <PageHeader
        title="Repairs & Issues"
        subtitle="Track snagging and aftercare across every handover."
        action={<ActionButton icon={<Icon.plus className="h-4 w-4" />}>Log Issue</ActionButton>}
      />
      <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {summary.map((s, i) => (
          <StatCard key={s.key} stat={s} index={i} icon={STAT_ICONS[s.icon]} />
        ))}
      </div>
      <Panel padded={false}>
        <div className="flex flex-wrap items-center gap-2 border-b border-line-soft px-4 py-3">
          {TABS.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={[
                'rounded-full px-3.5 py-1.5 text-[0.82rem] font-semibold transition-colors',
                tab === t ? 'bg-brand text-white' : 'bg-ghost text-slateBody hover:bg-brand-50 hover:text-brand-deep',
              ].join(' ')}
            >
              {t}
            </button>
          ))}
        </div>
        <DataTable columns={columns} rows={rows} minWidth={680} />
      </Panel>
    </>
  )
}
