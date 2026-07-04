/** Compass-point eyebrow label — the site's signature section marker. */
export default function Eyebrow({ children, light = false, center = false }) {
  return (
    <span
      className={[
        'mb-4 inline-flex items-center gap-2.5 text-[0.815rem] font-semibold uppercase tracking-[0.09em]',
        light ? 'text-mist' : 'text-brand',
        center ? 'justify-center' : '',
      ].join(' ')}
    >
      <span className={['diamond h-[9px] w-[9px] flex-none', light ? 'bg-mist' : 'bg-brand'].join(' ')} />
      {children}
    </span>
  )
}
