import { motion, useReducedMotion } from 'motion/react'

/**
 * Browser-chrome frame for product screenshots, with a gentle
 * lift on hover.
 */
export default function FrameShot({ src, alt, url = 'app.homecompass.co', className = '', hover = true }) {
  const reduce = useReducedMotion()
  return (
    <motion.figure
      className={[
        'overflow-hidden rounded-card border border-white/40 bg-white shadow-lvl2',
        className,
      ].join(' ')}
      whileHover={hover && !reduce ? { y: -5, scale: 1.004 } : {}}
      transition={{ type: 'spring', stiffness: 260, damping: 24 }}
    >
      <div className="flex items-center gap-1.5 border-b border-line bg-[#f1f5fb] px-4 py-[11px]" aria-hidden="true">
        <i className="h-2.5 w-2.5 rounded-full bg-[#c3cfe6]" />
        <i className="h-2.5 w-2.5 rounded-full bg-[#d3dced]" />
        <i className="h-2.5 w-2.5 rounded-full bg-[#d3dced]" />
        <span className="ml-3 rounded-full border border-line bg-white px-3.5 py-[3px] text-[0.72rem] font-medium text-[#8296b3]">
          {url}
        </span>
      </div>
      <img src={src} alt={alt} className="block w-full" loading="lazy" />
    </motion.figure>
  )
}
