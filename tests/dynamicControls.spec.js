import { test, expect } from "@playwright/test";
import DynamicControlsPage from "../pages/DynamicControlsPage.js";

const MESSAGES = {
  gone: "It's gone!",
  back: "It's back!",
  enabled: "It's enabled!",
  disabled: "It's disabled!",
};

test.describe("Dynamic controls functionality", () => {
  let dynamicControlsPage;

  test.beforeEach(async ({ page }) => {
    dynamicControlsPage = new DynamicControlsPage(page);
    await dynamicControlsPage.goto();
  });

  test("Verify checkbox is visible and input is disabled on page load @regression @ui", async ({
    page,
  }) => {
    await expect(dynamicControlsPage.checkbox).toBeVisible();
    await expect(dynamicControlsPage.inputField).toBeDisabled();
  });

  test("Remove checkbox, wait and verify it is gone @regression @ui", async ({ page }) => {
    await test.step("Remove checkbox", async () => {
      await dynamicControlsPage.toggleCheckbox();
    });
    await test.step(
      "Verify checkbox is gone and confirmation message appears",
      async () => {
        await expect(dynamicControlsPage.checkbox).not.toBeVisible();
        await expect(dynamicControlsPage.resultMessage).toContainText(
          MESSAGES.gone,
        );
      },
    );
  });

  test("Add checkbox back, wait and verify it is back @regression @ui", async ({ page }) => {
    await test.step("Remove checkbox first and verify it is gone", async () => {
      await dynamicControlsPage.toggleCheckbox();
      await expect(dynamicControlsPage.checkbox).not.toBeVisible();
    });
    await test.step("Add back the checkbox", async () => {
      await dynamicControlsPage.toggleCheckbox();
    });
    await test.step(
      "Verify checkbox is back and confirmation message appears",
      async () => {
        await expect(dynamicControlsPage.checkbox).toBeVisible();
        await expect(dynamicControlsPage.resultMessage).toContainText(
          MESSAGES.back,
        );
      },
    );
  });

  test("Click Enable input, wait, verify input is enabled @regression @ui", async ({
    page,
  }) => {
    await test.step("Click Enable input", async () => {
      await dynamicControlsPage.toggleInput();
    });
    await test.step(
      "Verify input is enabled and confirmation message appears",
      async () => {
        await expect(dynamicControlsPage.inputField).toBeEnabled();
        await expect(dynamicControlsPage.resultMessage).toContainText(
          MESSAGES.enabled,
        );
      },
    );
  });

  test("Click Disable input, wait and verify input is disabled @regression @ui", async ({
    page,
  }) => {
    await test.step(
      "Click Enable input first and verify it is disabled",
      async () => {
        await dynamicControlsPage.toggleInput();
        await expect(dynamicControlsPage.inputField).toBeEnabled();
      },
    );
    await test.step("Enable back the input field", async () => {
      await dynamicControlsPage.toggleInput();
    });
    await test.step(
      "Verify it is enabled and confirmation message appears",
      async () => {
        await expect(dynamicControlsPage.inputField).toBeDisabled();
        await expect(dynamicControlsPage.resultMessage).toContainText(
          MESSAGES.disabled,
        );
      },
    );
  });
});
