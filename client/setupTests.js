const puppeteer = require("puppeteer");

let browser;

beforeAll(async () => {
  browser = await puppeteer.launch();
});

afterAll(async () => {
  await browser.close();
});

beforeEach(async () => {
  const page = await browser.newPage();
  await page.goto("http://localhost:3000");
});

afterEach(async () => {
  await page.close();
});