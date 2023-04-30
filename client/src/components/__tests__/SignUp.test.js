const puppeteer = require("puppeteer");

let browser;
let page;
let url = "http://localhost:3000";
let newTIMETOUT = 30000;

jest.setTimeout(30000);

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

function delay(ms){
    return new Promise((resolve) =>{
        setTimeout(()=>{
            resolve("done")
        }, ms)
    })
}

function getErrors(errorSelectors){
    const errorList = document.querySelectorAll(errorSelectors);
    if(errorList.length > 0){
        return [...errorList].map(error => error.textContent)
    }
    return []
}

beforeAll(async()=>{
    browser = await puppeteer.launch({
        headless: false
    })
    page = await browser.newPage();

    await page.goto(url);
})

describe('test user Sign up creation, signing in and deletion succesfully', () =>{
    const testAddress = generateTestEmailAddress("signin");
    
    test("page has been loaded", async () =>{
        const title = await page.title();
        expect(title).toBe("Visual Climate");
    })

    test("open sign up tab succesfully", async () => {
        const signUpSelector = 'button[value="2"]';
        await page.waitForSelector(signUpSelector);
        await page.click(signUpSelector);
        const element = await page.$('input[name=confirmPassword]');
        expect(element).not.toBeNull();
    })

    test("Create a new test user", async () => {
        await page.type('input[name="firstName"]', "Test");
        await page.type('input[name="lastName"]', "User");
        await page.type('input[name="email"]', testAddress);
        await page.type('input[name="password"]', "test12341234");
        await page.type('input[name="confirmPassword"]', "test12341234");
        await page.click('input[type="submit"]');
        await page.waitForSelector('input[data-testid="signin-submit"]');
        const element = await page.$('input[data-testid="signin-submit"]');
        expect(element).not.toBeNull();
    })

    test("Sign in user", async () =>{
        await page.type('input[name="email"]', testAddress);
        await page.type('input[name="password"]', "test12341234");
        await page.click('input[data-testid="signin-submit"]');   
        await page.waitForSelector('section[class="profile"]');
        const element = await page.$('section[class="profile"]');
        expect(element).not.toBeNull();
    })

    test("Delete user", async () =>{ 
        await page.click('button[data-testid="delete"]');
        await page.waitForSelector('div[class=dialog]');
        await page.click('button[data-testid="yes"]');
        await page.waitForSelector('input[data-testid="signin-submit"]');
        const element = await page.$('input[data-testid="signin-submit"]');
        expect(element).not.toBeNull();
    })
});

afterAll(async () =>{
    await browser.close()
})