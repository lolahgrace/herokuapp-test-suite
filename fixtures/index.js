import{test as base} from "@playwright/test";
import LoginPage from '../pages/LoginPage.js'

export const test = base.extend({
    loggedInPage: async ({ page}, use) => {

        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.login('tomsmith', 'SuperSecretPassword!')

        await use(loginPage);

    }
})

export {expect} from '@playwright/test'