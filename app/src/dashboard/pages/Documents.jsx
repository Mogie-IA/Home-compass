import { useState } from 'react'
import { Panel, Pill, PageHeader, ActionButton } from '../components/ui.jsx'
import DataTable from '../components/DataTable.jsx'
import Icon from '../icons.jsx'
import { documents } from '../mockData.js'

const FILTERS = ['All', 'Handover Pack', 'Certificate', 'Manual', 'Warranty']
const TYPE_TONE = { 'Handover Pack': 'text-brand', Certificate: 'text-emerald-600', Manual: 'text-violet-600', Warranty: 'text-amber-600' }

export default function Documents() {
  const [filter, setFilter] = useState('All')
  const rows = filter === 'All' ? documents : documents.filter((d) => d.type === filter)

  const columns = [
    {
      key: 'name',
      header: 'Document',
      render: (d) => (
        <div className="flex items-center gap-3">
          <span className={['grid h-9 w-9 flex-none place-items-center rounded-lg bg-ghost', TYPE_TONE[d.type] || 'text-slate-500'].join(' ')}>
            <Icon.doc className="h-[18px] w-[18px]" />
          </span>
          <div>
            <div className="text-[0.88rem] font-semibold text-navy">{d.name}</div>
            <div className="text-[0.76rem] text-slateSoft">{d.type}</div>
          </div>
        </div>
      ),
    },
    { key: 'plot', header: 'Plot', render: (d) => <span className="font-semibold text-navy">{d.plot}</span> },
    { key: 'size', header: 'Size', render: (d) => <span className="text-slateBody">{d.size}</span> },
    { key: 'date', header: 'Uploaded', render: (d) => <span className="text-slateBody">{d.date}</span> },
    { key: 'status', header: 'Status', render: (d) => <Pill>{d.status}</Pill> },
  ]

  return (
    <>
      <PageHeader
        title="Documents"
        subtitle="Every certificate, manual and warranty across your estates."
        action={<ActionButton icon={<Icon.upload className="h-4 w-4" />}>Upload files</ActionButton>}
      />
      <Panel padded={false}>
        <div className="flex flex-wrap items-center gap-2 border-b border-line-soft px-4 py-3">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={[
                'rounded-full px-3.5 py-1.5 text-[0.82rem] font-semibold transition-colors',
                filter === f ? 'bg-brand text-white' : 'bg-ghost text-slateBody hover:bg-brand-50 hover:text-brand-deep',
              ].join(' ')}
            >
              {f}
            </button>
          ))}
        </div>
        <DataTable columns={columns} rows={rows} minWidth={720} onRowClick={() => {}} />
      </Panel>
    </>
  )
}
