/* Re-verify fixed areas: mobile hero, scrolled navbar, mobile marquee. */
const puppeteer = require('puppeteer-core')
const path = require('path')

const OUT = process.argv[2] || './qa-shots'
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'

;(async () => {
  const browser = await puppeteer.launch({
    executablePath: CHROME,
    headless: 'new',
    args: ['--no-first-run', '--hide-scrollbars'],
  })

  // mobile hero at load
  const m = await browser.newPage()
  await m.setViewport({ width: 390, height: 844 })
  await m.goto('http://localhost:5173/', { waitUntil: 'networkidle0' })
  await new Promise((r) => setTimeout(r, 900))
  const h1Top = await m.evaluate(() => Math.round(document.querySelector('main h1').getBoundingClientRect().top))
  await m.screenshot({ path: path.join(OUT, 'recheck-mobile-hero.png') })
  // mobile marquee
  await m.evaluate(() => {
    const h2 = [...document.querySelectorAll('h2')].find((h) => h.textContent.includes('every angle'))
    h2.scrollIntoView({ block: 'start' })
  })
  await new Promise((r) => setTimeout(r, 1200))
  await m.screenshot({ path: path.join(OUT, 'recheck-mobile-marquee.png') })
  const overflowX = await m.evaluate(() => document.documentElement.scrollWidth)
  await m.close()

  // desktop scrolled navbar over light section
  const d = await browser.newPage()
  await d.setViewport({ width: 1440, height: 900 })
  await d.goto('http://localhost:5173/', { waitUntil: 'networkidle0' })
  await new Promise((r) => setTimeout(r, 600))
  await d.evaluate(() => window.scrollTo({ top: 2800, behavior: 'instant' }))
  await new Promise((r) => setTimeout(r, 900))
  await d.screenshot({ path: path.join(OUT, 'recheck-navbar.png') })
  await d.close()

  await browser.close()
  console.log(JSON.stringify({ h1Top, mobileScrollWidth: overflowX }))
})().catch((e) => {
  console.error(e)
  process.exit(1)
})
