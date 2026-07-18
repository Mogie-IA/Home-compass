import { Panel, Pill, ProgressBar, PageHeader, ActionButton, StatCard } from '../components/ui.jsx'
import DataTable from '../components/DataTable.jsx'
import Icon from '../icons.jsx'
import { estates, stats } from '../mockData.js'

const STAT_ICONS = {
  estates: <Icon.estate className="h-5 w-5" />,
  ready: <Icon.check className="h-5 w-5" />,
  missing: <Icon.doc className="h-5 w-5" />,
  defects: <Icon.wrench className="h-5 w-5" />,
}

export default function Estates() {
  const columns = [
    {
      key: 'name',
      header: 'Estate',
      render: (e) => (
        <div className="flex items-center gap-3">
          <span className="grid h-10 w-10 flex-none place-items-center rounded-lg bg-brand-100 text-brand"><Icon.estate className="h-5 w-5" /></span>
          <div>
            <div className="text-[0.9rem] font-semibold text-navy">{e.name}</div>
            <div className="text-[0.78rem] text-slateSoft">{e.location}</div>
          </div>
        </div>
      ),
    },
    { key: 'homes', header: 'Homes', render: (e) => <span className="font-semibold text-navy">{e.homes}</span> },
    { key: 'ready', header: 'Ready', render: (e) => <span className="text-emerald-600 font-semibold">{e.ready}</span> },
    { key: 'defects', header: 'Defects', render: (e) => <span className="font-semibold text-navy">{e.defects}</span> },
    {
      key: 'progress',
      header: 'Progress',
      render: (e) => (
        <div className="flex items-center gap-2">
          <ProgressBar value={e.progress} className="w-28" />
          <span className="text-[0.8rem] font-semibold text-slateBody">{e.progress}%</span>
        </div>
      ),
    },
  ]

  return (
    <>
      <PageHeader
        title="Estates"
        subtitle="Manage your developments and their handover readiness."
        action={<ActionButton icon={<Icon.plus className="h-4 w-4" />}>Add Estate</ActionButton>}
      />
      <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((s, i) => (
          <StatCard key={s.key} stat={s} index={i} icon={STAT_ICONS[s.key]} />
        ))}
      </div>
      <Panel padded={false}>
        <DataTable columns={columns} rows={estates} minWidth={620} onRowClick={() => {}} />
      </Panel>
    </>
  )
}
