import { test, expect } from "@playwright/test";
import JavascriptAlertsPage from "../pages/JavascriptAlertsPage.js";

const testData = {
  promptText: "I love QA",
};

test.describe("Javascripts alerts functionality", () => {
  let javascriptAlertsPage;

  test.beforeEach(async ({ page }) => {
    javascriptAlertsPage = new JavascriptAlertsPage(page);
    await javascriptAlertsPage.goto();
  });

  test("JS Alert - accept and verify", async ({ page }) => {
    await test.step("Click JS alert and accept", async () => {
      await javascriptAlertsPage.clickAlert();
    });
    await test.step("Verify result text", async () => {
      await expect(javascriptAlertsPage.resultText).toHaveText(
        "You successfully clicked an alert",
      );
    });
  });

  test("JS Confirm - accept and verify", async ({ page }) => {
    await test.step("Click JS Confirm and accept", async () => {
      await javascriptAlertsPage.clickConfirmOk();
    });
    await test.step("Verify you clicked Ok", async () => {
      await expect(javascriptAlertsPage.resultText).toHaveText(
        "You clicked: Ok",
      );
    });
  });

  test("JS Confirm - dismiss and verify", async ({ page }) => {
    await test.step("Click JS Confirm and dismiss", async () => {
      await javascriptAlertsPage.clickConfirmCancel();
    });
    await test.step("Verify you clicked Cancel", async () => {
      await expect(javascriptAlertsPage.resultText).toHaveText(
        "You clicked: Cancel",
      );
    });
  });

  test("JS Prompt - type text, accept and verify text appears", async ({
    page,
  }) => {
    await test.step("Click JS Prompt and type text", async () => {
      await javascriptAlertsPage.clickPromptOk(testData.promptText);
    });
    await test.step("Verify text appears", async () => {
      await expect(javascriptAlertsPage.resultText).toHaveText(
        `You entered: ${testData.promptText}`,
      );
    });
  });

  test("JS prompt - cancel and verify null message", async ({ page }) => {
    await test.step("Click JS Prompt and cancel", async () => {
      await javascriptAlertsPage.clickPromptCancel();
    });
    await test.step("Verify null message", async () => {
      await expect(javascriptAlertsPage.resultText).toHaveText(
        "You entered: null",
      );
    });
  });
});
