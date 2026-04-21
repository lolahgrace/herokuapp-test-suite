import { test, expect } from "@playwright/test";
import DynamicLoadingPage from "../pages/DynamicLoadingPage.js";

test.describe("Dynamic Loading functionality", () => {
  let dynamicLoadingPage;

  test.beforeEach(async ({ page }) => {
    dynamicLoadingPage = new DynamicLoadingPage(page);
  });

  test("Verify finish text is hidden on page load (example 1)", async ({
    page,
  }) => {
    await test.step("Navigate to Example 1", async () => {
      await dynamicLoadingPage.goto(1);
    });
    await test.step(
      "Verify finish text element is in the DOM but is hidden",
      async () => {
        await expect(dynamicLoadingPage.finishText).toBeHidden();
      },
    );
  });

  test("Transition hidden element to be visible (example 1)", async ({
    page,
  }) => {
    await test.step("Navigate to Example 1", async () => {
      await dynamicLoadingPage.goto(1);
    });
    await test.step("Trigger and wait for loading", async () => {
      await dynamicLoadingPage.clickStart();
    });
    await test.step("Verify hidden element is now visible", async () => {
      await expect(dynamicLoadingPage.finishText).toBeVisible();
      await expect(dynamicLoadingPage.finishText).toContainText("Hello World!");
    });
  });

  test("Verify finish text is hidden on page load (example 2)", async ({
    page,
  }) => {
    await test.step("Navigate to Example 2", async () => {
      await dynamicLoadingPage.goto(2);
    });
    await test.step(
      "Verify finish text element is not in the DOM",
      async () => {
        await expect(dynamicLoadingPage.finishText).not.toBeAttached();
      },
    );
  });

  test("Verify element is rendered after loading (Example 2)", async ({
    page,
  }) => {
    await test.step("Navigate to Example 2", async () => {
      await dynamicLoadingPage.goto(2);
    });
    await test.step("Trigger and wait for loading", async () => {
      await dynamicLoadingPage.clickStart();
    });
    await test.step(
      "Verify finish text element is created and visible",
      async () => {
        await expect(dynamicLoadingPage.finishText).toBeVisible();
        await expect(dynamicLoadingPage.finishText).toContainText(
          "Hello World!",
        );
      },
    );
  });
});
