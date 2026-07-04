const puppeteer = require('puppeteer-core')
;(async () => {
  const browser = await puppeteer.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: 'new' })
  const page = await browser.newPage()
  await page.setViewport({ width: 1440, height: 900 })
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle0' })
  await new Promise(r => setTimeout(r, 500))
  await page.evaluate(() => [...document.querySelectorAll('header button')].find(b => b.textContent.includes('Request a Pilot')).click())
  await new Promise(r => setTimeout(r, 600))
  const open1 = await page.evaluate(() => !!document.querySelector('[role="dialog"]'))
  // native dispatch
  await page.evaluate(() => document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true })))
  await new Promise(r => setTimeout(r, 600))
  const afterDispatch = await page.evaluate(() => !!document.querySelector('[role="dialog"]'))
  // reopen and try trusted key press
  if (!afterDispatch) {
    await page.evaluate(() => [...document.querySelectorAll('header button')].find(b => b.textContent.includes('Request a Pilot')).click())
    await new Promise(r => setTimeout(r, 600))
  }
  await page.keyboard.press('Escape')
  await new Promise(r => setTimeout(r, 600))
  const afterPress = await page.evaluate(() => !!document.querySelector('[role="dialog"]'))
  console.log(JSON.stringify({ open1, afterDispatch, afterPress }))
  await browser.close()
})().catch(e => { console.error(e); process.exit(1) })
