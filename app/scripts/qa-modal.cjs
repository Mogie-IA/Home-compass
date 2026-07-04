/* QA: open the pilot modal, screenshot it, submit-validate, screenshot. */
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
  const page = await browser.newPage()
  await page.setViewport({ width: 1440, height: 900 })
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle0' })
  await new Promise((r) => setTimeout(r, 600))

  // open modal from nav CTA
  await page.evaluate(() => {
    const btn = [...document.querySelectorAll('header button')].find((b) => b.textContent.includes('Request a Pilot'))
    btn.click()
  })
  await new Promise((r) => setTimeout(r, 700))
  await page.screenshot({ path: path.join(OUT, 'modal-open.png') })

  // submit empty -> validation errors
  await page.evaluate(() => {
    const btn = [...document.querySelectorAll('[role="dialog"] button[type="submit"]')][0]
    btn.click()
  })
  await new Promise((r) => setTimeout(r, 400))
  await page.screenshot({ path: path.join(OUT, 'modal-errors.png') })

  // Esc closes
  await page.keyboard.press('Escape')
  await new Promise((r) => setTimeout(r, 500))
  const dialogGone = await page.evaluate(() => !document.querySelector('[role="dialog"]'))

  console.log(JSON.stringify({ dialogGone }))
  await browser.close()
})().catch((e) => {
  console.error(e)
  process.exit(1)
})
