import { useState } from 'react'
import { Panel, Pill, ProgressBar, PageHeader, ActionButton } from '../components/ui.jsx'
import DataTable from '../components/DataTable.jsx'
import Icon from '../icons.jsx'
import { plots } from '../mockData.js'

const FILTERS = ['All', 'Ready', 'In Review', 'Pending', 'Missing']

export default function Plots() {
  const [filter, setFilter] = useState('All')
  const rows = filter === 'All' ? plots : plots.filter((p) => p.docStatus === filter)

  const columns = [
    {
      key: 'id',
      header: 'Plot',
      render: (p) => (
        <div>
          <div className="text-[0.9rem] font-semibold text-navy">{p.id}</div>
          <div className="text-[0.78rem] text-slateSoft">{p.type}</div>
        </div>
      ),
    },
    { key: 'homeowner', header: 'Homeowner' },
    { key: 'docStatus', header: 'Document Status', render: (p) => <Pill>{p.docStatus}</Pill> },
    { key: 'handover', header: 'Handover Date', render: (p) => <span className="text-slateBody">{p.handover}</span> },
    {
      key: 'defects',
      header: 'Defects',
      render: (p) => (
        <span className="inline-flex items-center gap-2">
          <span className="font-semibold text-navy">{p.defects}</span>
          <Pill>{p.severity}</Pill>
        </span>
      ),
    },
    {
      key: 'readiness',
      header: 'Readiness',
      render: (p) => (
        <div className="flex items-center gap-2">
          <ProgressBar value={p.readiness} className="w-24" />
          <span className="text-[0.8rem] font-semibold text-slateBody">{p.readiness}%</span>
        </div>
      ),
    },
  ]

  return (
    <>
      <PageHeader
        title="Plots"
        subtitle="Track document status, defects and readiness for every home."
        action={<ActionButton icon={<Icon.plus className="h-4 w-4" />}>Add Plot</ActionButton>}
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
          <span className="ml-auto text-[0.8rem] text-slateSoft">Showing {rows.length} of {plots.length} plots</span>
        </div>
        <DataTable columns={columns} rows={rows} minWidth={760} onRowClick={() => {}} />
      </Panel>
    </>
  )
}
