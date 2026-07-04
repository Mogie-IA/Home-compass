import ContainerScroll from './ContainerScroll.jsx'
import FrameShot from './FrameShot.jsx'
import AmbientRings from './AmbientRings.jsx'
import Eyebrow from './Eyebrow.jsx'

/**
 * Shared dark-gradient hero with the Container Scroll Animation:
 * title block drifts up while the product shot straightens from
 * its 3D tilt. Used on Home, Developers, Homeowners, How It Works.
 */
export default function ScrollHero({ eyebrow, title, lead, actions, shot }) {
  return (
    <section className="relative overflow-hidden bg-[radial-gradient(120%_60%_at_50%_-5%,rgb(84_140_255/0.35),transparent_60%),linear-gradient(180deg,#010f2e_0%,#062a72_30%,#0b3fa8_52%,#b8cdf5_86%,#f8fafc_100%)]">
      <AmbientRings />
      <div className="pt-24 md:pt-16">
        <ContainerScroll
          titleComponent={
            <>
              {eyebrow && <Eyebrow light center>{eyebrow}</Eyebrow>}
              <h1 className="mb-5 text-[clamp(2.5rem,5.4vw,4rem)] font-bold leading-[1.08] tracking-[-0.02em] text-white">
                {title}
              </h1>
              {lead && (
                <p className="mx-auto mb-8 max-w-[620px] text-[clamp(1.05rem,1.5vw,1.185rem)] leading-relaxed text-[#dee9fa]/90">
                  {lead}
                </p>
              )}
              {actions && <div className="flex flex-wrap justify-center gap-3.5">{actions}</div>}
            </>
          }
        >
          <FrameShot src={shot.src} alt={shot.alt} url={shot.url} hover={false} />
        </ContainerScroll>
      </div>
    </section>
  )
}
