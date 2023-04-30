const puppeteer = require("puppeteer");

function generateTestEmailAddress(testid) {
    const now = new Date();
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const year = String(now.getFullYear());
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const timestamp = `${day}${month}${year}${hours}${minutes}`;
    const emailAddress = `test${timestamp}${testid}@example.com`;
    return emailAddress;
  }
  

(async()=>{
    const browser = await puppeteer.launch({
        headless: false
    });
    
//Open browser and go to visual climate
    const page = await browser.newPage();
    await page.goto('http://localhost:3000',{
        waitUntil: "networkidle0"
    });

//got to sign up page
    const signUpSelector = 'button[value="2"]';
    await page.waitForSelector(signUpSelector);
    await page.click(signUpSelector);

//Fill out sign up information and submit
    await page.type('input[name="firstName"]', "Test");
    await page.type('input[name="lastName"]', "User");
    const testAddress = generateTestEmailAddress("signin");
    await page.type('input[name="email"]', testAddress);
    await page.type('input[name="password"]', "test12341234");
    await page.type('input[name="confirmPassword"]', "test12341234");
    await page.click('input[type="submit"]');
    
//Write the sign in information and sign in
await page.waitForSelector('input[data-testid="signin-submit"]');
    await page.type('input[name="email"]', testAddress);
    await page.type('input[name="password"]', "test12341234");
    await page.click('input[type="submit"]');   

//Delete the account
    await page.waitForSelector('section[class="profile"]');
    await page.click('button[data-testid="delete"]');
    await page.waitForSelector('div[class=dialog]');
    await page.click('button[data-testid="yes"]');
    //const yesFinder = await page.$x("//button[contains(text(), 'Delete Account')]");
    //await page.click(yesFinder[0]);
    console.log("done with automation");
})()

