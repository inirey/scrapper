// viu Scraper
// Create By Rey


const puppeteer = require('puppeteer');

async function scrapeViu() {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  await page.goto('https://www.viu.com/ott/id/id/all', { waitUntil: 'networkidle2' });
  await page.waitForSelector('.content-title');

  const results = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('.content-item')).map(el => ({
      title: el.querySelector('.content-title')?.innerText.trim(),
      thumbnail: el.querySelector('img')?.src,
      link: el.querySelector('a')?.href
    }));
  });

  await browser.close();
  return results;
}

module.exports = scrapeViu;
