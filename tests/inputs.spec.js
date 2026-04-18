import { test, expect } from "@playwright/test";
import InputsPage from "../pages/InputsPage.js";

const testData = {
  validNumber: "100",
  negativeNumber: "-136",
  alphabetInput: "abc",
  specialCharacters: "@%$",
};

test.describe("Number inputs functionality", () => {
  let inputsPage;

  test.beforeEach(async ({ page }) => {
    inputsPage = new InputsPage(page);
    await inputsPage.goto();
  });

  test("Enter a valid number and verify it appears in the field", async ({
    page,
  }) => {
    await test.step("Enter a valid number", async () => {
      await inputsPage.pressNumbers(testData.validNumber);
    });
    await test.step("Verify the number appears in the field", async () => {
      await expect(inputsPage.numberInputs).toHaveValue(testData.validNumber);
    });
  });

  test("Enter a negative number and verify it is accepted", async ({
    page,
  }) => {
    await test.step("Enter a negative number", async () => {
      await inputsPage.pressNumbers(testData.negativeNumber);
    });
    await test.step("Verify it is accepted", async () => {
      await expect(inputsPage.numberInputs).toHaveValue(
        testData.negativeNumber,
      );
    });
  });

  test("Clear the input and verify the field is empty", async ({ page }) => {
    await test.step("Input a valid number", async () => {
      await inputsPage.pressNumbers(testData.validNumber);
    });
    await test.step("Clear the input and verify empty field", async () => {
      await inputsPage.clearField();
      await expect(inputsPage.numberInputs).toHaveValue("");
    });
  });

  test("Handle increment via arrow keys", async ({ page }) => {
    await test.step("Input value and add increment", async () => {
      await inputsPage.pressNumbers(testData.validNumber);
      await inputsPage.pressArrow("ArrowUp");
    });
    await test.step("Verify number increase", async () => {
      await expect(inputsPage.numberInputs).toHaveValue(
        String(Number(testData.validNumber) + 1),
      );
    });
  });

  test("Handle decrement via arrow keys", async ({ page }) => {
    await test.step("Input value and add decrement", async () => {
      await inputsPage.pressNumbers(testData.validNumber);
      await inputsPage.pressArrow("ArrowDown");
    });
    await test.step("Verify number decrease", async () => {
      await expect(inputsPage.numberInputs).toHaveValue(
        String(Number(testData.validNumber) - 1),
      );
    });
  });

  test("Type alphabets and verify field rejects them", async ({ page }) => {
    await test.step("Type in alphabets", async () => {
      await inputsPage.pressNumbers(testData.alphabetInput);
    });
    await test.step("Verify field rejects alphabet", async () => {
      await expect(inputsPage.numberInputs).toHaveValue("");
    });
  });

  test("Type special characters and verify field rejects them", async ({
    page,
  }) => {
    await test.step("Type in special characters", async () => {
      await inputsPage.pressNumbers(testData.specialCharacters);
    });
    await test.step("Verify field rejects special characters", async () => {
      await expect(inputsPage.numberInputs).toHaveValue("");
    });
  });
});
