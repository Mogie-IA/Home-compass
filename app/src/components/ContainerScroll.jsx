import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react'

/**
 * Container Scroll Animation (21st.dev / Aceternity pattern):
 * the hero card starts tilted back in 3D and straightens as you scroll,
 * while the title block drifts up.
 */
export default function ContainerScroll({ titleComponent, children }) {
  const containerRef = useRef(null)
  const reduce = useReducedMotion()
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  const { scrollYProgress } = useScroll({ target: containerRef })

  const rotate = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [20, 0])
  const scale = useTransform(
    scrollYProgress,
    [0, 1],
    reduce ? [1, 1] : isMobile ? [0.72, 0.94] : [1.05, 1]
  )
  const translate = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, -80])

  return (
    <div
      ref={containerRef}
      className="relative flex h-[64rem] items-start justify-center md:h-[68rem] md:items-center"
    >
      <div
        className="relative w-full py-6 md:py-16"
        style={{ perspective: '1000px' }}
      >
        <motion.div style={{ translateY: translate }} className="mx-auto max-w-[820px] px-6 text-center">
          {titleComponent}
        </motion.div>
        <motion.div
          style={{ rotateX: rotate, scale }}
          className="mx-auto mt-8 w-full max-w-[1020px] px-4 md:mt-4 md:px-6 will-change-transform"
        >
          {children}
        </motion.div>
      </div>
    </div>
  )
}
