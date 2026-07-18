import { Panel, Pill, PageHeader, ActionButton, StatCard } from '../components/ui.jsx'
import DataTable from '../components/DataTable.jsx'
import Icon from '../icons.jsx'
import { homeowners } from '../mockData.js'

const summary = [
  { key: 'invited', label: 'Homeowners Invited', value: '76', sub: '31% of total', tone: 'brand', icon: 'people' },
  { key: 'active', label: 'Active Accounts', value: '38', sub: '50% of invited', tone: 'emerald', icon: 'check' },
  { key: 'pending', label: 'Pending Invites', value: '12', sub: 'Awaiting details', tone: 'amber', icon: 'clock' },
]
const STAT_ICONS = {
  people: <Icon.people className="h-5 w-5" />,
  check: <Icon.check className="h-5 w-5" />,
  clock: <Icon.clock className="h-5 w-5" />,
}

function initials(name) {
  return name.replace(/&/g, '').split(' ').filter(Boolean).map((w) => w[0]).slice(0, 2).join('')
}

export default function Homeowners() {
  const columns = [
    {
      key: 'name',
      header: 'Homeowner',
      render: (h) => (
        <div className="flex items-center gap-3">
          <span className="grid h-9 w-9 flex-none place-items-center rounded-full bg-brand-100 text-[0.78rem] font-bold text-brand">{initials(h.name)}</span>
          <div>
            <div className="text-[0.9rem] font-semibold text-navy">{h.name}</div>
            <div className="text-[0.78rem] text-slateSoft">{h.email}</div>
          </div>
        </div>
      ),
    },
    { key: 'plot', header: 'Plot', render: (h) => <span className="font-semibold text-navy">{h.plot}</span> },
    { key: 'estate', header: 'Estate' },
    { key: 'status', header: 'Status', render: (h) => <Pill>{h.status}</Pill> },
    { key: 'invited', header: 'Invited', render: (h) => <span className="text-slateBody">{h.invited}</span> },
  ]

  return (
    <>
      <PageHeader
        title="Homeowners"
        subtitle="Invite buyers and track who has access to their My Home record."
        action={<ActionButton icon={<Icon.plus className="h-4 w-4" />}>Invite Homeowner</ActionButton>}
      />
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {summary.map((s, i) => (
          <StatCard key={s.key} stat={s} index={i} icon={STAT_ICONS[s.icon]} />
        ))}
      </div>
      <Panel padded={false}>
        <DataTable columns={columns} rows={homeowners} minWidth={720} onRowClick={() => {}} />
      </Panel>
    </>
  )
}
