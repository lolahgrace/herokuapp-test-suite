import { test, expect } from "@playwright/test";
import LoginPage from "../pages/LoginPage.js";

const testData = {
  validUser: {
    username: "tomsmith",
    password: "SuperSecretPassword!",
  },
  invalidUser: {
    username: "wrongUser",
    password: "wrongPassword",
  },
  invalidPassword: {
    username: "tomsmith",
    password: "wrongPassword",
  },
  invalidUsername: {
    username: "wrongUser",
    password: "SuperSecretPassword!",
  },
  emptyUser: {
    username: "",
    password: "",
  },
  trailingSpaceUser: {
    username: "tomsmith ",
    password: "SuperSecretPassword!",
  },
  trailingSpacePassword: {
    username: "tomsmith",
    password: "SuperSecretPassword! ",
  },
};

test.describe("Login functionality", () => {
  let loginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test("User can login and logout successfully", async ({ page }) => {
    await test.step(
      "Login with valid credentials and verify success message",
      async () => {
        await loginPage.login(
          testData.validUser.username,
          testData.validUser.password,
        );
        const message = await loginPage.getFlashMessage();
        expect(message).toContain("You logged into a secure area!");
      },
    );
    await test.step("Logout from secure area and verify message", async () => {
      await loginPage.logout();
      const logoutMessage = await loginPage.getFlashMessage();
      expect(logoutMessage).toContain("You logged out of the secure area!");
    });
  });

  test("User cannot login with invalid credentials", async ({ page }) => {
    await test.step(
      "Attempt to login with invalid credentials and verify error message",
      async () => {
        await loginPage.login(
          testData.invalidUser.username,
          testData.invalidUser.password,
        );
        const message = await loginPage.getFlashMessage();
        expect(message).toContain("Your username is invalid!");
      },
    );
  });

  test("User cannot login with valid username and invalid password", async ({
    page,
  }) => {
    await test.step(
      "Attempt to login with invalid password and verify error message",
      async () => {
        await loginPage.login(
          testData.validUser.username,
          testData.invalidPassword.password,
        );
        const message = await loginPage.getFlashMessage();
        expect(message).toContain("Your password is invalid!");
      },
    );
  });

  test("User cannot login with invalid username and valid password", async ({
    page,
  }) => {
    await test.step(
      "Attempt to login with invalid username and verify error message",
      async () => {
        await loginPage.login(
          testData.invalidUsername.username,
          testData.invalidUsername.password,
        );
        const message = await loginPage.getFlashMessage();
        expect(message).toContain("Your username is invalid!");
      },
    );
  });

  test("User sees error when trying to login with empty fields", async ({
    page,
  }) => {
    await test.step(
      "Attempt to login with empty fields and verify error message",
      async () => {
        await loginPage.login(
          testData.emptyUser.username,
          testData.emptyUser.password,
        );
        const message = await loginPage.getFlashMessage();
        expect(message).toContain("Your username is invalid!");
      },
    );
  });

  test("User cannot login with trailing spaces in credentials", async ({
    page,
  }) => {
    await test.step(
      "Attempt to login with trailing space in username and verify error message",
      async () => {
        await loginPage.login(
          testData.trailingSpaceUser.username,
          testData.trailingSpaceUser.password,
        );
        const message = await loginPage.getFlashMessage();
        expect(message).toContain("Your username is invalid!");
      },
    );
    await test.step(
      "Attempt to login with trailing space in password and verify error message",
      async () => {
        await loginPage.login(
          testData.trailingSpacePassword.username,
          testData.trailingSpacePassword.password,
        );
        const message = await loginPage.getFlashMessage();
        expect(message).toContain("Your password is invalid!");
      },
    );
  });

  test("Login page elements are visible and enabled", async ({ page }) => {
    await test.step("Verify initial state of login form", async () => {
      await expect(loginPage.usernameInput).toBeVisible();
      await expect(loginPage.passwordInput).toBeVisible();
      await expect(loginPage.loginButton).toBeVisible();
      await expect(loginPage.loginButton).toBeEnabled();
    });
  });
});
