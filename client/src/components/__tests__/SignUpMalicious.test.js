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

async function resetInputField(inputSelector){
    await page.focus(inputSelector);
    await page.keyboard.down('Control');
    await page.keyboard.press('A');
    await page.keyboard.up('Control');
    await page.keyboard.press('Backspace');
}

beforeAll(async()=>{
    browser = await puppeteer.launch({
        headless: false
    })
    page = await browser.newPage();

    await page.goto(url);
})
describe('Sign up form malicious tests', () =>{
    const testAddress = generateTestEmailAddress("Malicious");
    const fnameSelector = 'input[name="firstName"]';
    const lnameSelector = 'input[name="lastName"]';
    const emailSelector = 'input[name="email"]';
    const passSelector = 'input[name="password"]';
    const passconfSelector = 'input[name="confirmPassword"]';

    test("frontpage page has been loaded", async () =>{
        const title = await page.title();
        expect(title).toBe("Visual Climate");
    })

    test("does not show Register Form by default", async () => {
        const element = await page.$(passconfSelector);
        expect(element).toBeNull();
    })

    test("Sign up form is rendering correctly after Sign up button is pressed", async () => {
        const signUpSelector = 'button[value="2"]';
        await page.waitForSelector(signUpSelector);
        await page.click(signUpSelector);
        await page.waitForSelector(passconfSelector);

        const element = await page.$('h1');
        const expectedText = 'Not registered yet? Sign up here!';
        const text = await page.evaluate(element => element.textContent, element);
        expect(text).toBe(expectedText);

        const firstNamePlaceholder = await page.$(fnameSelector);
        const lastNamePlaceholder = await page.$(lnameSelector);
        const emailPlaceholder = await page.$(emailSelector);
        const passwordPlaceholder = await page.$(passSelector);
        const passwordConfPlaceholder = await page.$(passconfSelector);
        const submitButton = await page.$('input[type="submit"]');
        await delay(250);
        // Assert that all of the expected errorelements are in the document
        expect(firstNamePlaceholder).not.toBeNull();
        expect(lastNamePlaceholder).not.toBeNull();
        expect(emailPlaceholder).not.toBeNull();
        expect(passwordPlaceholder).not.toBeNull();
        expect(passwordConfPlaceholder).not.toBeNull();
        expect(submitButton).not.toBeNull();
    })
    test("Register form submitted without filling anything, expect to fail", async () => {
        await page.click('input[type="submit"]');
        await page.$(fnameSelector);
        const fnInfo = await page.$('p[data-testid="firstname-info"]');
        const lnInfo = await page.$('p[data-testid="lastname-info"]');
        const emailInfo = await page.$('p[data-testid="email-info"]');
        const passwordInfo = await page.$('p[data-testid="password-info"]');
        const passwordConfInfo = await page.$('p[data-testid="password-confirmation-info"]');
        expect(fnInfo).not.toBeNull();
        expect(lnInfo).not.toBeNull();
        expect(emailInfo).not.toBeNull();
        expect(passwordInfo ).not.toBeNull();
        expect(passwordConfInfo).not.toBeNull();
    })
    test("Register form submitted with only firstName filled, expect to fail", async () => {
        await page.type(fnameSelector, "Test");
        await page.click('input[type="submit"]');
        await page.$(fnameSelector);
        const fnInfo = await page.$('p[data-testid="firstname-info"]');
        const lnInfo = await page.$('p[data-testid="lastname-info"]');
        const emailInfo = await page.$('p[data-testid="email-info"]');
        const passwordInfo = await page.$('p[data-testid="password-info"]');
        const passwordConfInfo = await page.$('p[data-testid="password-confirmation-info"]');
        await delay(250);
        expect(fnInfo).toBeNull();
        expect(lnInfo).not.toBeNull();
        expect(emailInfo).not.toBeNull();
        expect(passwordInfo ).not.toBeNull();
        expect(passwordConfInfo).not.toBeNull();
    })
    test("Register form submitted with only firstName and lastName filled, expect to fail", async () => {
        await resetInputField(fnameSelector);
        await page.type(fnameSelector, "Test");
        await page.type(lnameSelector, "User");
        await page.click('input[type="submit"]');
        await page.$(fnameSelector);
        const fnInfo = await page.$('p[data-testid="firstname-info"]');
        const lnInfo = await page.$('p[data-testid="lastname-info"]');
        const emailInfo = await page.$('p[data-testid="email-info"]');
        const passwordInfo = await page.$('p[data-testid="password-info"]');
        const passwordConfInfo = await page.$('p[data-testid="password-confirmation-info"]');
        await delay(250);
        expect(fnInfo).toBeNull();
        expect(lnInfo).toBeNull();
        expect(emailInfo).not.toBeNull();
        expect(passwordInfo ).not.toBeNull();
        expect(passwordConfInfo).not.toBeNull();
    })
    test("Register form submitted with only firstName, lastName and email filled, expect to fail", async () => {
        await resetInputField(fnameSelector);
        await resetInputField(lnameSelector);
        await page.type(fnameSelector, "Test");
        await page.type(lnameSelector, "User");
        await page.type(emailSelector, testAddress);
        await page.click('input[type="submit"]');
        await page.$(fnameSelector);
        const fnInfo = await page.$('p[data-testid="firstname-info"]');
        const lnInfo = await page.$('p[data-testid="lastname-info"]');
        const emailInfo = await page.$('p[data-testid="email-info"]');
        const passwordInfo = await page.$('p[data-testid="password-info"]');
        const passwordConfInfo = await page.$('p[data-testid="password-confirmation-info"]');
        await delay(250);
        expect(fnInfo).toBeNull();
        expect(lnInfo).toBeNull();
        expect(emailInfo).toBeNull();
        expect(passwordInfo ).not.toBeNull();
        expect(passwordConfInfo).not.toBeNull();
    })
    test("Register form submitted with only firstName, lastName email and password filled, expect to fail", async () => {
        await resetInputField(fnameSelector);
        await resetInputField(lnameSelector);
        await resetInputField(emailSelector);
        await page.type(fnameSelector, "Test");
        await page.type(lnameSelector, "User");
        await page.type(emailSelector, testAddress);
        await page.type(passSelector, "test12341234");
        await page.click('input[type="submit"]');
        await page.$(fnameSelector);
        const fnInfo = await page.$('p[data-testid="firstname-info"]');
        const lnInfo = await page.$('p[data-testid="lastname-info"]');
        const emailInfo = await page.$('p[data-testid="email-info"]');
        const passwordInfo = await page.$('p[data-testid="password-info"]');
        const passwordConfInfo = await page.$('p[data-testid="password-confirmation-info"]');
        await delay(250);
        expect(fnInfo).toBeNull();
        expect(lnInfo).toBeNull();
        expect(emailInfo).toBeNull();
        expect(passwordInfo ).toBeNull();
        expect(passwordConfInfo).not.toBeNull();
    })
    test("Register form submitted with incorrect email-address. Case no @", async () => {
        const signInSelector = 'button[value="1"]';
        const signUpSelector = 'button[value="2"]';
        const signInButton = 'input[data-testid="signin-submit"]';
        await page.waitForSelector(signInSelector);
        await page.click(signInSelector);
        await page.waitForSelector(signInButton);
        await page.click(signUpSelector);
        await page.waitForSelector(passconfSelector);

        await page.type(fnameSelector, "Test");
        await page.type(lnameSelector, "User");
        await page.type(emailSelector, "example.fi");
        await page.type(passSelector, "test12341234");
        await page.type(passconfSelector, "test12341234");
        await page.click('input[type="submit"]');
        await page.$(fnameSelector);
        const fnInfo = await page.$('p[data-testid="firstname-info"]');
        const lnInfo = await page.$('p[data-testid="lastname-info"]');
        const passwordInfo = await page.$('p[data-testid="password-info"]');
        const passwordConfInfo = await page.$('p[data-testid="password-confirmation-info"]');
        await delay(250);
        const signInButtonTest = await page.$(signInButton); //testing if you get to the other side
        expect(fnInfo).toBeNull();
        expect(lnInfo).toBeNull();
        expect(signInButtonTest).toBeNull();
        expect(passwordInfo ).toBeNull();
        expect(passwordConfInfo).toBeNull();
    })
    test("Register form submitted with incorrect email-address. Case nothing before @", async () => {
        const signInSelector = 'button[value="1"]';
        const signUpSelector = 'button[value="2"]';
        const signInButton = 'input[data-testid="signin-submit"]';
        await page.waitForSelector(signInSelector);
        await page.click(signInSelector);
        await page.waitForSelector(signInButton);
        await page.click(signUpSelector);
        await page.waitForSelector(passconfSelector);

        await page.type(fnameSelector, "Test");
        await page.type(lnameSelector, "User");
        await page.type(emailSelector, "example.fi");
        await page.type(passSelector, "test12341234");
        await page.type(passconfSelector, "test12341234");
        await page.click('input[type="submit"]');
        await page.$(fnameSelector);
        const fnInfo = await page.$('p[data-testid="firstname-info"]');
        const lnInfo = await page.$('p[data-testid="lastname-info"]');

        const passwordInfo = await page.$('p[data-testid="password-info"]');
        const passwordConfInfo = await page.$('p[data-testid="password-confirmation-info"]');

        const signInButtonTest = await page.$(signInButton); //testing if you get to the other side
        expect(fnInfo).toBeNull();
        expect(lnInfo).toBeNull();
        expect(signInButtonTest).toBeNull();
        expect(passwordInfo ).toBeNull();
        expect(passwordConfInfo).toBeNull();
    })
    test("gives a note if password is too short", async () => {
        const signInSelector = 'button[value="1"]';
        const signUpSelector = 'button[value="2"]';
        const signInButton = 'input[data-testid="signin-submit"]';
        await page.waitForSelector(signInSelector);
        await page.click(signInSelector);
        await page.waitForSelector(signInButton);
        await page.click(signUpSelector);
        await page.waitForSelector(passconfSelector);

        await page.type(fnameSelector, "Test");
        await page.type(lnameSelector, "User");
        await page.type(emailSelector, testAddress);
        await page.type(passSelector, "pass");
        await page.type(passconfSelector, "pass");
        await page.click('input[type="submit"]');

        const fnInfo = await page.$('p[data-testid="firstname-info"]');
        const lnInfo = await page.$('p[data-testid="lastname-info"]');
        const emailInfo = await page.$('p[data-testid="email-info"]');
        const passwordInfo = await page.$('p[data-testid="password-info"]');
        const passwordConfInfo = await page.$('p[data-testid="password-confirmation-info"]');
        await delay(250);
        expect(fnInfo).toBeNull();
        expect(lnInfo).toBeNull();
        expect(emailInfo).toBeNull();
        expect(passwordInfo).not.toBeNull();
        expect(passwordConfInfo).toBeNull();
    })
    test("gives a note if password and its confirmation don't match", async () => {
        const signInSelector = 'button[value="1"]';
        const signUpSelector = 'button[value="2"]';
        const signInButton = 'input[data-testid="signin-submit"]';
        await page.waitForSelector(signInSelector);
        await page.click(signInSelector);
        await page.waitForSelector(signInButton);
        await page.click(signUpSelector);
        await page.waitForSelector(passconfSelector);

        await page.type(fnameSelector, "Test");
        await page.type(lnameSelector, "User");
        await page.type(emailSelector, testAddress);
        await page.type(passSelector, "password");
        await page.type(passconfSelector, "drowssap");
        await page.click('input[type="submit"]');
        await page.$(fnameSelector);
        const fnInfo = await page.$('p[data-testid="firstname-info"]');
        const lnInfo = await page.$('p[data-testid="lastname-info"]');
        const emailInfo = await page.$('p[data-testid="email-info"]');
        const passwordInfo = await page.$('p[data-testid="password-info"]');
        const passwordConfInfo = await page.$('p[data-testid="password-confirmation-info"]');
        await delay(250);
        expect(fnInfo).toBeNull();
        expect(lnInfo).toBeNull();
        expect(emailInfo).toBeNull();
        expect(passwordInfo).toBeNull();
        expect(passwordConfInfo).not.toBeNull();
    })
})


afterAll(async () =>{
    await browser.close()
})
