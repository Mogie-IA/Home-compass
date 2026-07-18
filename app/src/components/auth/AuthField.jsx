/** Labelled email input used in the auth flow. */
export default function AuthField({ label, error, icon, ...props }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[0.88rem] font-semibold text-navy">{label}</span>
      <span className="relative block">
        {icon && (
          <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slateSoft">{icon}</span>
        )}
        <input
          {...props}
          className={[
            'w-full rounded-xl border bg-white py-3 text-[0.98rem] text-navy shadow-sm outline-none transition-[border-color,box-shadow] duration-150 placeholder:text-slateSoft/70 focus:border-brand focus:shadow-[0_0_0_3px_rgb(0_82_204/0.18)]',
            icon ? 'pl-11 pr-3.5' : 'px-3.5',
            error ? 'border-rose-400' : 'border-line',
          ].join(' ')}
        />
      </span>
      {error && <span className="mt-1.5 block text-[0.82rem] text-rose-600">{error}</span>}
    </label>
  )
}
