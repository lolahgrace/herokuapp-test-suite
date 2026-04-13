import { test, expect } from '@playwright/test';
import LoginPage from '../pages/LoginPage.js';



test.describe('Login functionality', () => {
    let loginPage;

    test.beforeEach(async ({page}) => {
        loginPage = new LoginPage(page);
        await loginPage.goto();
    });

    test('User can login and logout successfully', async ({page}) =>{
        await loginPage.login('tomsmith', 'SuperSecretPassword!');

        const message = await loginPage.getFlashMessage();
        expect(message).toContain('You logged into a secure area!');
        console.log(message);

        await loginPage.logout();
        const logoutMessage = await loginPage.getFlashMessage();
        expect (logoutMessage).toContain('You logged out of the secure area!');
        console.log(logoutMessage);
    });

    test('User cannot login with invalid credentials', async ({page}) => {
        await loginPage.login('wrongUser', 'wrongPassword');

        const message = await loginPage.getFlashMessage();
        expect(message).toContain('Your username is invalid!');
    });

    test('User sees error when trying to login with empty fields', async ({page}) => {
        await loginPage.login('', '');

         const message = await loginPage.getFlashMessage();
        expect(message).toContain('Your username is invalid!');
    });

    test('User cannot login with valid username and invalid password', async ({page}) =>{
        await loginPage.login('tomsmith', 'wrongPassword');

        const message = await loginPage.getFlashMessage();
        expect (message).toContain('Your password is invalid!');
    });

    test('User cannot login with invalid username and valid password', async ({page}) => {
        await loginPage.login('wrongUser', 'SuperSecretPassword!');

        const message = await loginPage.getFlashMessage();
        expect(message).toContain('Your username is invalid!');
    });

    test('Login page elements are visible and enabled', async ({page}) => {
         expect(loginPage.usernameInput).toBeVisible();
         expect(loginPage.passwordInput).toBeVisible();
         expect(loginPage.loginButton).toBeVisible();
         expect(loginPage.loginButton).toBeEnabled();
    });

});

