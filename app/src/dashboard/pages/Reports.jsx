import { motion, useReducedMotion } from 'motion/react'
import { Panel, ViewAll, Pill, PageHeader, ActionButton, IconTile } from '../components/ui.jsx'
import Icon from '../icons.jsx'
import { handoverProgress, reportsMonthly, filesForReview, activity } from '../mockData.js'

/* Donut for handover progress */
function Donut({ data }) {
  const reduce = useReducedMotion()
  const total = data.reduce((s, d) => s + d.value, 0)
  const R = 54
  const C = 2 * Math.PI * R
  let offset = 0
  return (
    <div className="flex items-center gap-6">
      <div className="relative h-[150px] w-[150px] flex-none">
        <svg viewBox="0 0 140 140" className="h-full w-full -rotate-90">
          <circle cx="70" cy="70" r={R} fill="none" stroke="#eef1f6" strokeWidth="16" />
          {data.map((d) => {
            const len = (d.value / total) * C
            const seg = (
              <motion.circle
                key={d.label}
                cx="70" cy="70" r={R} fill="none" stroke={d.color} strokeWidth="16" strokeLinecap="round"
                strokeDasharray={`${len} ${C - len}`}
                strokeDashoffset={-offset}
                initial={reduce ? {} : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              />
            )
            offset += len
            return seg
          })}
        </svg>
        <div className="absolute inset-0 grid place-items-center">
          <div className="text-center">
            <div className="text-[1.6rem] font-bold leading-none text-navy">{data[0].value}</div>
            <div className="text-[0.72rem] text-slateSoft">Ready</div>
          </div>
        </div>
      </div>
      <ul className="space-y-2.5">
        {data.map((d) => (
          <li key={d.label} className="flex items-center gap-2.5 text-[0.86rem]">
            <span className="h-2.5 w-2.5 rounded-full" style={{ background: d.color }} />
            <span className="font-medium text-navy">{d.label}</span>
            <span className="ml-auto pl-6 font-semibold text-slateBody">{d.value} ({Math.round((d.value / total) * 100)}%)</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

function Bars({ data }) {
  const reduce = useReducedMotion()
  const max = Math.max(...data.map((d) => d.handovers))
  return (
    <div className="flex h-[180px] items-end justify-between gap-3 pt-2">
      {data.map((d, i) => (
        <div key={d.month} className="flex flex-1 flex-col items-center gap-2">
          <motion.div
            className="w-full max-w-[42px] rounded-t-lg bg-gradient-to-t from-brand to-[#3d7be0]"
            initial={reduce ? { height: `${(d.handovers / max) * 100}%` } : { height: 0 }}
            whileInView={{ height: `${(d.handovers / max) * 100}%` }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: i * 0.06 }}
          />
          <span className="text-[0.76rem] font-medium text-slateSoft">{d.month}</span>
        </div>
      ))}
    </div>
  )
}

export default function Reports() {
  const donutData = [
    { label: 'Ready', value: handoverProgress.ready, color: '#10b981' },
    { label: 'In Progress', value: handoverProgress.inProgress, color: '#0052cc' },
    { label: 'Not Started', value: handoverProgress.notStarted, color: '#f59e0b' },
  ]

  return (
    <>
      <PageHeader
        title="Reports"
        subtitle="Handover performance across your estates."
        action={<ActionButton variant="secondary" icon={<Icon.doc className="h-4 w-4" />}>Export</ActionButton>}
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <Panel title="Handover progress"><Donut data={donutData} /></Panel>
        <Panel title="Handovers per month"><Bars data={reportsMonthly} /></Panel>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Panel title="Files needing review" action={<ViewAll onClick={() => {}} />}>
          <ul className="space-y-1">
            {filesForReview.map((f) => (
              <li key={f.id} className="flex items-center justify-between gap-3 rounded-lg px-1 py-2.5 hover:bg-ghost">
                <span className="flex items-center gap-2.5">
                  <IconTile tone="brand" className="h-9 w-9"><Icon.shield className="h-[18px] w-[18px]" /></IconTile>
                  <span>
                    <span className="block text-[0.86rem] font-semibold text-navy">{f.name}</span>
                    <span className="block text-[0.75rem] text-slateSoft">{f.estate}</span>
                  </span>
                </span>
                <Pill>{f.priority}</Pill>
              </li>
            ))}
          </ul>
        </Panel>

        <Panel title="Recent activity">
          <ul className="space-y-3.5">
            {activity.map((a) => (
              <li key={a.id} className="flex gap-3">
                <IconTile tone="slate" className="mt-0.5 h-8 w-8 flex-none"><Icon.clock className="h-4 w-4" /></IconTile>
                <div>
                  <p className="text-[0.85rem] leading-snug text-navy"><span className="font-semibold">{a.ctx}</span> — {a.title}</p>
                  <p className="mt-0.5 text-[0.74rem] text-slateSoft">{a.by} · {a.time}</p>
                </div>
              </li>
            ))}
          </ul>
        </Panel>
      </div>
    </>
  )
}
