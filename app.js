// Load environment variables from .env file
require('dotenv').config();

// Import Chromium from Playwright
const { chromium } = require('playwright');

(async () => {
  console.log("Launching browser...");
const browser = await chromium.launch({ headless: false });
const page = await browser.newPage();

// Get URL from .env
const websiteURL = process.env.GROUP_TICKETING;
if (!websiteURL) {
  console.error("❌ Error: GROUP_TICKETING is not defined in .env!");
  return;
}

console.log("Opening the website...");
await page.goto(websiteURL);


  console.log("Clicking the 'Account search' link...");
  await page.click('text=Account search');

  console.log("Waiting for EHID input...");
  await page.waitForSelector('#accountsSearchParams\\.ehId');

  const ehid = process.env.EHID;
  if (!ehid) {
    console.error("❌ Error: EHID is not defined in .env!");
    return;
  }

  console.log("Filling EHID:", ehid);
  await page.fill('#accountsSearchParams\\.ehId', ehid);
  await page.waitForTimeout(1000);

  console.log("Clicking the Search button...");
  await page.click('#searchForm_searchButton');

  console.log("Waiting for search results...");
  await page.waitForSelector('span[title="Allianz Trade Online Support"]', { timeout: 10000 });

  console.log("Clicking 'Allianz Trade Online Support'...");
  await page.click('span[title="Allianz Trade Online Support"]');

  console.log("Waiting for phone row...");
  await page.waitForSelector('td.phoneRow');

  console.log("Clicking on the phone row 1900...");
  await page.locator('td.phoneRow', { hasText: '1900' }).click();

  // -------------------------------------------------------------
  // ✅ TICKET CREATION STEPS
  // -------------------------------------------------------------

  console.log("Clicking 'Create ticket'...");
  await page.waitForSelector('#accountCreateTicketButton', { timeout: 10000 });
  await page.click('#accountCreateTicketButton');

  console.log("Confirming 'Yes' on popup...");
  await page.waitForSelector('span.ui-button-text', { timeout: 10000 });
  await page.locator('span.ui-button-text', { hasText: 'Yes' }).click();

  console.log("Waiting for topic dropdown...");
  await page.waitForSelector('#topics', { timeout: 10000 });

  console.log("Selecting 'Online services' topic...");
  await page.selectOption('#topics', { value: '3100007' });

  // -------------------------------------------------------------
  // ✅ NEW STEPS BELOW (SUBTOPIC, CHANNEL, TITLE)
  // -------------------------------------------------------------

  console.log("Waiting for subtopic input...");
  await page.waitForSelector('#subtopicsAutoCompleteInput', { timeout: 10000 });

  const subtype = process.env.SUBTYPE;
  if (!subtype) {
    console.error("❌ Error: SUBTYPE is not defined in .env!");
    return;
  }

  console.log("Filling Subtopic:", subtype);
  await page.fill('#subtopicsAutoCompleteInput', subtype);
  await page.waitForTimeout(1000);

  console.log("Selecting 'Email' as communication channel...");
  await page.waitForSelector('#channels');
  await page.selectOption('#channels', { value: '1100004' });

  console.log("Clicking into Title box...");
  await page.waitForSelector('#titleBox');
  await page.click('#titleBox');

  console.log("✅ Subtopic, channel, and title selection complete. Browser will remain open.");
})();
