/** Shared form primitives styled to the design system. */

const fieldBase =
  'w-full rounded-brand border bg-white px-3.5 py-[13px] text-[0.97rem] text-navy transition-[border-color,box-shadow,transform] duration-200 ease-brand placeholder:text-slateSoft/70 hover:-translate-y-px hover:shadow-[0_6px_16px_-6px_rgb(0_82_204/0.20)] focus:outline-none focus:-translate-y-px focus:border-brand focus:shadow-[0_0_0_3px_rgb(0_82_204/0.18)]'

// Resting + hover border colours. Error fields stay red on hover; normal
// fields deepen toward the brand on hover so the lift reads intentionally.
const borderFor = (error) =>
  error ? 'border-[#ba1a1a] hover:border-[#ba1a1a]' : 'border-[#cbd5e1] hover:border-[#94a9c6]'

export function Field({ label, error, optional = false, children, full = false }) {
  return (
    <div className={['flex flex-col gap-[7px]', full ? 'sm:col-span-2' : ''].join(' ')}>
      <label className="text-[0.9rem] font-semibold text-navy">
        {label} {optional && <span className="font-normal text-slateSoft">(optional)</span>}
      </label>
      {children}
      {error && (
        <span role="alert" className="text-[0.82rem] text-[#ba1a1a]">
          {error}
        </span>
      )}
    </div>
  )
}

export function TextInput({ error, ...props }) {
  return (
    <input
      {...props}
      className={[fieldBase, borderFor(error)].join(' ')}
    />
  )
}

export function TextArea({ error, ...props }) {
  return (
    <textarea
      {...props}
      className={[fieldBase, 'min-h-[104px] resize-y', borderFor(error)].join(' ')}
    />
  )
}

export function Select({ error, placeholder, options, ...props }) {
  return (
    <select
      {...props}
      defaultValue=""
      className={[
        fieldBase,
        'cursor-pointer appearance-none bg-no-repeat pr-10',
        borderFor(error),
      ].join(' ')}
      style={{
        backgroundImage:
          "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' fill='none'%3E%3Cpath d='M1 1.5 6 6.5 11 1.5' stroke='%2364748B' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E\")",
        backgroundPosition: 'right 14px center',
      }}
    >
      <option value="" disabled>
        {placeholder}
      </option>
      {options.map((o) => (
        <option key={o} value={o}>
          {o}
        </option>
      ))}
    </select>
  )
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/**
 * Validate a form element's named fields.
 * required: array of field names; returns { errors, values }.
 */
export function validateForm(formEl, required) {
  const data = new FormData(formEl)
  const values = Object.fromEntries(data.entries())
  const errors = {}
  required.forEach((name) => {
    if (!String(values[name] || '').trim()) errors[name] = 'Please complete this field.'
  })
  if (values.email && !errors.email && !EMAIL_RE.test(values.email.trim())) {
    errors.email = 'Please enter a valid email address.'
  }
  return { errors, values }
}
