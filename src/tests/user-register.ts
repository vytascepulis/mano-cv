import { chromium } from 'playwright';

const baseURL = process.env.NEXT_PUBLIC_ROOT_DOMAIN!; // or localhost
const testEmail = 'test@example.com';
const testPassword = 'password123';

async function simulateUserSession() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  // 1. Visit app
  await page.goto(baseURL);

  // 2. Optional: Log in
  await page.click('text=Login');
  await page.fill('input[name="email"]', testEmail);
  await page.fill('input[name="password"]', testPassword);
  await page.click('button[type="submit"]');

  // 3. Wait for nav / dashboard
  await page.waitForURL('**/dashboard');

  // 4. Visit settings
  await page.click('text=Settings');
  await page.waitForSelector('input[name="name"]');

  // 5. Simulate change
  await page.fill('input[name="name"]', 'John Tester');
  await page.click('text=Save');

  // 6. Optionally go to preview
  await page.click('text=Preview');

  // 7. Done
  await browser.close();
}

simulateUserSession();
