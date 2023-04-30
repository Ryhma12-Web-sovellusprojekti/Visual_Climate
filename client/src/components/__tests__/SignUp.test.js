const puppeteer = require("puppeteer");
import { render, screen } from '@testing-library/react';
import { TIMEOUT } from 'dns';

let browser;
let page;
let url = "http://localhost:3000";
let newTIMETOUT = 30000;

//jest.setTimeout(30000);

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
describe('Sign up form malicious tests', () =>{
    test("page has been loaded", async () =>{
        const title = await page.title();
        expect(title).toBe("Visual Climate");
    })

    test("does not show Register Form by default", async () => {
        const element = await page.$('input[name=confirmPassword]');
        expect(element).toBeNull();
    })

    test("Sign up form is rendering correctly after Sign up button is pressed", async () => {
        const signUpSelector = 'button[value="2"]';
        await page.waitForSelector(signUpSelector);
        await page.click(signUpSelector);
        await page.waitForSelector('input[name=confirmPassword]');

        const element = await page.$('h1');
        const expectedText = 'Not registered yet? Sign up here!';
        const text = await page.evaluate(element => element.textContent, element);
        expect(text).toBe(expectedText);

        const firstNamePlaceholder = await page.$('input[name="firstName"]');
        const lastNamePlaceholder = await page.$('input[name="lastName"]');
        const emailPlaceholder = await page.$('input[name="email"]');
        const passwordPlaceholder = await page.$('input[name="password"]');
        const passwordConfPlaceholder = await page.$('input[name="confirmPassword"]');
        const submitButton = await page.$('input[type="submit"]');

        // Assert that all of the expected elements are in the document
        expect(firstNamePlaceholder).not.toBeNull();
        expect(lastNamePlaceholder).not.toBeNull();
        expect(emailPlaceholder).not.toBeNull();
        expect(passwordPlaceholder).not.toBeNull();
        expect(passwordConfPlaceholder).not.toBeNull();
        expect(submitButton).not.toBeNull();
    })
    test("Register form filled incompletetly", async () => {
        
    })
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
        await page.click('input[type="submit"]');   
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