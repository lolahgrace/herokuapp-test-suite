import { test, expect } from "@playwright/test";
import AddRemoveElementsPage from "../pages/AddRemoveElementsPage.js";

test.describe("Testing functionality to add and remove elements", () => {
  let addRemoveElementsPage;

  test.beforeEach(async ({ page }) => {
    addRemoveElementsPage = new AddRemoveElementsPage(page);
    await addRemoveElementsPage.goto();
  });

  test("Should start with no delete buttons", async ({ page }) => {
    await test.step("Verify no delete buttons on page load", async () => {
      await expect(addRemoveElementsPage.deleteButtons).toHaveCount(0);
    });
  });

  test("Add a single element and verify one delete button appears", async ({
    page,
  }) => {
    await test.step("Add single element", async () => {
      await addRemoveElementsPage.addElements(1);
    });
    await test.step("Verify one delete button appears", async () => {
      await expect(addRemoveElementsPage.deleteButtons).toHaveCount(1);
    });
  });

  test("Add one element, delete it, verify it disappears", async ({ page }) => {
    await test.step("Add one element and delete it", async () => {
      await addRemoveElementsPage.addElements(1);
      await addRemoveElementsPage.deleteElements(1);
    });
    await test.step("Verify the deleted element disappear", async () => {
      await expect(addRemoveElementsPage.deleteButtons).toHaveCount(0);
    });
  });

  test("Add multiple elements and verify correct count appears", async ({
    page,
  }) => {
    await test.step("Add multiple elements", async () => {
      await addRemoveElementsPage.addElements(5);
    });
    await test.step("Verify correct count appears", async () => {
      await expect(addRemoveElementsPage.deleteButtons).toHaveCount(5);
    });
  });

  test("Add multiple elements, delete some, verify correct count remains", async ({
    page,
  }) => {
    await test.step("Add multiple elements and delete some", async () => {
      await addRemoveElementsPage.addElements(5);
      await addRemoveElementsPage.deleteElements(1);
    });
    await test.step("Verify correct count remains", async () => {
      await expect(addRemoveElementsPage.deleteButtons).toHaveCount(4);
    });
  });

  test("Multiple elements removal, verify none remain", async ({ page }) => {
    await test.step("Add elements and delete all", async () => {
      await addRemoveElementsPage.addElements(5);
      await addRemoveElementsPage.deleteElements(5);
    });
    await test.step("Verify no elements remain", async () => {
      await expect(addRemoveElementsPage.deleteButtons).toHaveCount(0);
    });
  });
});
