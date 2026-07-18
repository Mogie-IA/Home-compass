import { motion } from 'motion/react'

/**
 * Compact data table. `columns` = [{ key, header, render?, className? }].
 * Rows animate in on mount and highlight on hover.
 */
export default function DataTable({ columns, rows, onRowClick, minWidth = 640 }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse" style={{ minWidth }}>
        <thead>
          <tr className="text-left text-[0.72rem] font-semibold uppercase tracking-wide text-slateSoft">
            {columns.map((c) => (
              <th key={c.key} className={['px-4 py-3 font-semibold', c.className || ''].join(' ')}>
                {c.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <motion.tr
              key={row.id ?? i}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1], delay: Math.min(i * 0.03, 0.3) }}
              whileHover={{ backgroundColor: 'rgb(242 246 252)' }}
              onClick={onRowClick ? () => onRowClick(row) : undefined}
              className={['border-t border-line-soft', onRowClick ? 'cursor-pointer' : ''].join(' ')}
            >
              {columns.map((c) => (
                <td key={c.key} className={['px-4 py-3.5 align-middle text-[0.88rem] text-slateBody', c.className || ''].join(' ')}>
                  {c.render ? c.render(row) : row[c.key]}
                </td>
              ))}
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
