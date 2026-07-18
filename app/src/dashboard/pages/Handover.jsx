import { Panel, Pill, ProgressBar, PageHeader, ActionButton, IconTile } from '../components/ui.jsx'
import DataTable from '../components/DataTable.jsx'
import Icon from '../icons.jsx'
import { plots, uploads, missingDocs } from '../mockData.js'

export default function Handover() {
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
    { key: 'docStatus', header: 'Documents', render: (p) => <Pill>{p.docStatus}</Pill> },
    { key: 'handover', header: 'Handover', render: (p) => <span className="text-slateBody">{p.handover}</span> },
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
        title="Handover Control"
        subtitle="Manage estates, plots and handover readiness from one place."
        action={<ActionButton icon={<Icon.plus className="h-4 w-4" />}>Add Plot</ActionButton>}
      />

      <div className="grid gap-6 xl:grid-cols-[1.6fr_1fr]">
        <Panel title="Maple Way Residence · Plots" padded={false}>
          <DataTable columns={columns} rows={plots} minWidth={640} onRowClick={() => {}} />
        </Panel>

        <div className="space-y-6">
          <Panel title="Bulk upload / match files">
            <button className="flex w-full flex-col items-center justify-center rounded-xl border border-dashed border-brand/35 bg-brand-50/40 px-4 py-6 text-center transition-colors hover:border-brand hover:bg-brand-50">
              <Icon.upload className="mb-2 h-6 w-6 text-brand" />
              <span className="text-[0.86rem] font-semibold text-navy">Drag &amp; drop or <span className="text-brand">browse</span></span>
              <span className="mt-1 text-[0.75rem] text-slateSoft">Auto-matched to the right plots &amp; doc types</span>
            </button>
            <div className="mt-5 space-y-3">
              {uploads.map((u) => (
                <div key={u.id} className="flex items-center gap-3">
                  <IconTile tone="slate" className="h-9 w-9"><Icon.doc className="h-[18px] w-[18px]" /></IconTile>
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-[0.84rem] font-semibold text-navy">{u.name}</div>
                    <div className="text-[0.74rem] text-slateSoft">{u.files} files · {u.date}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-[0.76rem] font-semibold text-emerald-600">Matched {u.matched}%</div>
                    <div className="text-[0.7rem] text-slateSoft">{u.status}</div>
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-4 text-[0.75rem] leading-relaxed text-slateSoft">
              Auto-match uses AI. You can review and confirm matches before finalising.
            </p>
          </Panel>

          <Panel title="Missing documents">
            <ul className="space-y-1">
              {missingDocs.map((d) => (
                <li key={d.id} className="flex items-center justify-between gap-3 rounded-lg px-1 py-2 hover:bg-ghost">
                  <span className="flex items-center gap-2.5">
                    <span className="grid h-8 w-8 place-items-center rounded-lg bg-rose-50 text-rose-500"><Icon.doc className="h-4 w-4" /></span>
                    <span className="text-[0.85rem] font-medium text-navy">{d.name}</span>
                  </span>
                  <span className="whitespace-nowrap text-[0.76rem] text-slateSoft">{d.plots} plots</span>
                </li>
              ))}
            </ul>
          </Panel>
        </div>
      </div>
    </>
  )
}
