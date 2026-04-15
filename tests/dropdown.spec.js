import { test, expect } from "@playwright/test";
import DropdownPage from "../pages/DropdownPage.js";

const testData = {
  optionOne: "1",
  optionTwo: "2",
};

test.describe("Dropdown functionality", () => {
  let dropdownPage;

  test.beforeEach(async ({ page }) => {
    dropdownPage = new DropdownPage(page);
    await dropdownPage.goto();
  });

  test("Verify dropdown defaults to placeholder and options are unselected on load", async ({
    page,
  }) => {
    await test.step(
      "Check that dropdown defaults to placeholder on load",
      async () => {
        await expect(dropdownPage.dropdownField).toContainText(
          "Please select an option",
        );
        await expect(dropdownPage.dropdownField).toHaveValue("");
      },
    );
  });
  test("Select option one and verify it is selected", async ({ page }) => {
    await test.step("Select option one", async () => {
      await dropdownPage.chooseOption(testData.optionOne);
    });
    await test.step("Verify option one is selected", async () => {
      await expect(dropdownPage.dropdownField).toHaveValue("1");
    });
  });

  test("Select option two and verify it is selected", async ({ page }) => {
    await test.step("Select option two", async () => {
      await dropdownPage.chooseOption(testData.optionTwo);
    });
    await test.step("Verify option two is selected", async () => {
      await expect(dropdownPage.dropdownField).toHaveValue("2");
    });
  });

  test("Select option one, then option two, and verify the switch to option two", async ({
    page,
  }) => {
    await test.step("Select option one", async () => {
      await dropdownPage.chooseOption(testData.optionOne);
    });
    await test.step("Select option two", async () => {
      await dropdownPage.chooseOption(testData.optionTwo);
    });
    await test.step(
      "Verify the option two is selected and option one is unselected after the switch",
      async () => {
        await expect(dropdownPage.dropdownField).toHaveValue("2");
        await expect(dropdownPage.dropdownField).not.toHaveValue("1");
      },
    );
  });
});
