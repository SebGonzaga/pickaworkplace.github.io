/* Browser UI tests (Playwright). NOT YET RUN: this environment has no browser.
   Setup:  npm init -y && npm i -D @playwright/test && npx playwright install chromium
   Run:    npx playwright test tests/ui.spec.js   (serve the folder first, e.g. npx serve .)  */
const { test, expect } = require('@playwright/test');

test('editor loads with the default two-slide project', async ({ page }) => {
  await page.goto('file://' + __dirname + '/../index.html');
  await expect(page.locator('.sl')).toHaveCount(2);
});

test('library adds a shape and it appears on the canvas', async ({ page }) => {
  await page.goto('file://' + __dirname + '/../index.html');
  await page.click('[data-tab="shapes"]');
  await page.click('[data-a="sh:star"]');
  await expect(page.locator('#st .el')).not.toHaveCount(0);
});

test('undo removes the last added element', async ({ page }) => {
  await page.goto('file://' + __dirname + '/../index.html');
  const before = await page.locator('#st .el').count();
  await page.click('[data-tab="stickers"]');
  await page.click('.em >> nth=0');
  await page.click('#un');
  await expect(page.locator('#st .el')).toHaveCount(before);
});

test('exported slide transition class is set on the slide', async ({ page }) => {
  await page.goto('file://' + __dirname + '/../index.html');
  await page.click('#bg, #tr');   // slide panel is shown when no element is selected
  await page.selectOption('#tr', 'fade');
  const cls = await page.getAttribute('.sl.on', 'class');
  expect(cls).toBeTruthy();
});
