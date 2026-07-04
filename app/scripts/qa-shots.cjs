/* QA screenshot driver: visits each route, scrolls to trigger
   scroll-linked animations, and captures viewport shots. */
const puppeteer = require('puppeteer-core')
const path = require('path')
const fs = require('fs')

const OUT = process.argv[2] || './qa-shots'
const BASE = 'http://localhost:5173'
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'

const ROUTES = ['/', '/developers', '/homeowners', '/how-it-works', '/contact']

async function shootRoute(browser, route, width, height, tag) {
  const page = await browser.newPage()
  await page.setViewport({ width, height, deviceScaleFactor: 1 })
  await page.goto(BASE + route, { waitUntil: 'networkidle0', timeout: 60000 })
  await new Promise((r) => setTimeout(r, 700))

  const docH = await page.evaluate(() => document.body.scrollHeight)
  const name = route === '/' ? 'home' : route.slice(1)
  let idx = 0
  for (let y = 0; y < docH; y += Math.round(height * 0.9)) {
    await page.evaluate((top) => window.scrollTo({ top, behavior: 'instant' }), y)
    await new Promise((r) => setTimeout(r, 850))
    await page.screenshot({ path: path.join(OUT, `${name}-${tag}-${String(idx).padStart(2, '0')}.png`) })
    idx++
    if (idx > 24) break
  }
  await page.close()
  return { route, docH, shots: idx }
}

;(async () => {
  fs.mkdirSync(OUT, { recursive: true })
  const browser = await puppeteer.launch({
    executablePath: CHROME,
    headless: 'new',
    args: ['--no-first-run', '--hide-scrollbars'],
  })
  const results = []
  for (const route of ROUTES) {
    results.push(await shootRoute(browser, route, 1440, 900, 'desktop'))
  }
  results.push(await shootRoute(browser, '/', 390, 844, 'mobile'))
  results.push(await shootRoute(browser, '/contact', 390, 844, 'mobile'))
  await browser.close()
  console.log(JSON.stringify(results, null, 2))
})().catch((e) => {
  console.error(e)
  process.exit(1)
})
