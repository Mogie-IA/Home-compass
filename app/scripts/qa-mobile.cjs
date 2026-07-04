/* Mobile adaptation sweep: overflow, tap targets, screenshots, modal. */
const puppeteer = require('puppeteer-core')
const path = require('path')
const fs = require('fs')

const OUT = process.argv[2] || './qa-shots'
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
const ROUTES = ['/', '/developers', '/homeowners', '/how-it-works', '/contact']

async function sweep(page, route, width, height, shots) {
  await page.setViewport({ width, height, deviceScaleFactor: 1 })
  await page.goto('http://localhost:5173' + route, { waitUntil: 'networkidle0', timeout: 60000 })
  await new Promise((r) => setTimeout(r, 800))

  const report = await page.evaluate((vw) => {
    const wide = []
    document.querySelectorAll('body *').forEach((el) => {
      const r = el.getBoundingClientRect()
      if (r.width > vw + 1) wide.push(`${el.tagName}.${String(el.className).slice(0, 40)} w=${Math.round(r.width)}`)
    })
    const smallTaps = []
    document.querySelectorAll('a, button').forEach((el) => {
      const r = el.getBoundingClientRect()
      if (r.width > 0 && r.height > 0 && (r.height < 40 || r.width < 40)) {
        smallTaps.push(`${el.tagName} "${(el.textContent || el.getAttribute('aria-label') || '').trim().slice(0, 24)}" ${Math.round(r.width)}x${Math.round(r.height)}`)
      }
    })
    return {
      scrollW: document.documentElement.scrollWidth,
      docH: document.body.scrollHeight,
      wide: wide.slice(0, 8),
      smallTaps: smallTaps.slice(0, 10),
    }
  }, width)

  const name = (route === '/' ? 'home' : route.slice(1)) + `-${width}`
  if (shots) {
    let idx = 0
    for (let y = 0; y < report.docH; y += Math.round(height * 0.9)) {
      await page.evaluate((top) => window.scrollTo({ top, behavior: 'instant' }), y)
      await new Promise((r) => setTimeout(r, 750))
      await page.screenshot({ path: path.join(OUT, `m-${name}-${String(idx).padStart(2, '0')}.png`) })
      idx++
      if (idx > 20) break
    }
  }
  return { route, width, ...report, docH: undefined }
}

;(async () => {
  fs.mkdirSync(OUT, { recursive: true })
  const browser = await puppeteer.launch({
    executablePath: CHROME,
    headless: 'new',
    args: ['--no-first-run', '--hide-scrollbars'],
  })
  const page = await browser.newPage()
  const results = []
  for (const route of ROUTES) results.push(await sweep(page, route, 390, 844, true))
  for (const route of ROUTES) results.push(await sweep(page, route, 320, 700, false))

  // modal on mobile
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 1 })
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle0' })
  await new Promise((r) => setTimeout(r, 600))
  await page.evaluate(() => {
    document.querySelector('.nav-toggle, [aria-label="Open menu"]')?.click()
  })
  await new Promise((r) => setTimeout(r, 600))
  await page.screenshot({ path: path.join(OUT, 'm-menu-390.png') })
  await page.evaluate(() => {
    const btn = [...document.querySelectorAll('button')].find((b) => b.textContent.includes('Request a Pilot'))
    btn?.click()
  })
  await new Promise((r) => setTimeout(r, 800))
  await page.screenshot({ path: path.join(OUT, 'm-modal-390.png') })
  const modalCheck = await page.evaluate(() => {
    const dlg = document.querySelector('[role="dialog"]')
    if (!dlg) return { open: false }
    const r = dlg.getBoundingClientRect()
    return { open: true, w: Math.round(r.width), h: Math.round(r.height), fits: r.width <= 390 }
  })

  await browser.close()
  console.log(JSON.stringify({ results, modalCheck }, null, 1))
})().catch((e) => {
  console.error(e)
  process.exit(1)
})
