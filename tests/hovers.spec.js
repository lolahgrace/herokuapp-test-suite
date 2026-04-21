import { test, expect } from "@playwright/test";
import HoversPage from "../pages/HoversPage.js";

const users = [1, 2, 3];

test.describe("Hovers functionality", () => {
  let hoversPage;

  test.beforeEach(async ({ page }) => {
    hoversPage = new HoversPage(page);
    await hoversPage.goto();
  });

  for (const userNumber of users) {
    test(`Hover over user ${userNumber} - verify info hidden before and visible after`, async ({
      page,
    }) => {
      const index = userNumber - 1;

      await test.step("Verify caption is hidden before hover", async () => {
        await expect(hoversPage.userNames.nth(index)).not.toBeVisible();
      });
      await test.step("Hover and verify caption is visible", async () => {
        await hoversPage.hoverOverUser(index);
        await expect(hoversPage.userNames.nth(index)).toBeVisible();
        await expect(hoversPage.userNames.nth(index)).toContainText(
          `name: user${userNumber}`,
        );
      });
    });
  }

  for (const userNumber of users) {
    test(`Click "View profile" for user ${userNumber} and verify navigation`, async ({
      page,
    }) => {
      const index = userNumber - 1;

      await test.step("Hover over card", async () => {
        await hoversPage.hoverOverUser(index);
      });
      await test.step("Click profile link", async () => {
        await hoversPage.clickViewProfile(index);
      });
      await test.step("Verify navigation", async () => {
        await expect(page).toHaveURL(new RegExp(`/users/${userNumber}`));
      });
    });
  }

  test("Switch hover from user 1 to user 2 - verify info toggles correctly", async ({
    page,
  }) => {
    await test.step("Hover over user 1 and verify visibility", async () => {
      await hoversPage.hoverOverUser(0);
      await expect(hoversPage.userNames.nth(0)).toBeVisible();
    });
    await test.step("Switch hover to User 2", async () => {
      await hoversPage.hoverOverUser(1);
    });
    await test.step(
      "Verify User 1 info is now hidden and User 2 is visible",
      async () => {
        await expect(hoversPage.userNames.nth(0)).not.toBeVisible();
      },
    );
    await test.step("Verify User 2 took over", async () => {
      await expect(hoversPage.userNames.nth(1)).toBeVisible();
    });
  });
});
