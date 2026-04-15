import { test, expect } from "@playwright/test";
import CheckboxPage from "../pages/CheckboxPage.js";

const testData = {
  checkBoth: {
    checkbox1: true,
    checkbox2: true,
  },
  uncheckBoth: {
    checkbox1: false,
    checkbox2: false,
  },
};

test.describe('Checkbox functionality', () => {
    let checkboxPage;

    test.beforeEach(async ({ page }) => {
        checkboxPage = new CheckboxPage(page);
        await checkboxPage.goto();
    });

    test('Verifying the initial state of the checkboxes on page load', async ({page}) => {
        await test.step('Verifying the initial state of the checkbooxes', async () => {
            await expect(checkboxPage.checkbox1).not.toBeChecked();
            await expect(checkboxPage.checkbox2).toBeChecked();
        });
    });

    test('Checking checkbox 1 and verifying the state changed', async ({page}) => {
        await test.step('Attempt to check checkbox 1', async () => {
           await checkboxPage.setCheckbox(checkboxPage.checkbox1, true);

        });

        await test.step('Verify state change', async () => {
            await expect(checkboxPage.checkbox1).toBeChecked();
        });
    });

    test('Unchecking checkbox 2 and verifying the state changed', async ({ page }) => {
        await test.step('Attempt to uncheck checkbox 2', async () => {
            await checkboxPage.setCheckbox(checkboxPage.checkbox2, false);
        });
        await test.step('Verifying the state changed', async () => {
            await expect(checkboxPage.checkbox2).not.toBeChecked();
        });
    });

    test('Check both checkboxes and verify both are checked', async ({ page }) => {
        await test.step('Attempt to check both checkboxes', async () => {
            await checkboxPage.setCheckbox(checkboxPage.checkbox1, testData.checkBoth.checkbox1);
            await checkboxPage.setCheckbox(checkboxPage.checkbox2, testData.checkBoth.checkbox2);
        });
        await test.step('Verify both are checked', async () => {
            await expect(checkboxPage.checkbox1).toBeChecked();
            await expect(checkboxPage.checkbox2).toBeChecked();
        });
    });

    test('Uncheck both checkboxes and verify both are unchecked', async ({ page }) => {
        await test.step('Attempt to uncheck both checkboxes', async () => {
            await checkboxPage.setCheckbox(checkboxPage.checkbox1, testData.uncheckBoth.checkbox1);
            await checkboxPage.setCheckbox(checkboxPage.checkbox2, testData.uncheckBoth.checkbox2);
        });
        await test.step('Verify both are unchecked', async () => {
            await expect(checkboxPage.checkbox1).not.toBeChecked();
            await expect(checkboxPage.checkbox2).not.toBeChecked();
        });
    });

});