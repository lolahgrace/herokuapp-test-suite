import { test as base } from "@playwright/test";
import LoginPage from '../pages/LoginPage.js'

export const test = base.extend({
    loggedInPage: async ({ page }, use) => {
        // Log in via UI
        const loginPage = new LoginPage(page)
        await loginPage.goto()
        await loginPage.login(
            process.env.LOGIN_USERNAME,
            process.env.LOGIN_PASSWORD
        )

        // Hand off logged-in LoginPage to test
        await use(loginPage)
    }
})

export { expect } from '@playwright/test'