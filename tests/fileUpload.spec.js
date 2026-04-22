import { test, expect } from "@playwright/test";
import FileUploadPage from "../pages/FileUploadPage.js";

test.describe("File Upload Functionality", () => {
  let fileUploadPage;
  const filePath = {
    full: "fixtures/test-file.txt",
    empty: "fixtures/empty.txt",
  };

  test.beforeEach(async ({ page }) => {
    fileUploadPage = new FileUploadPage(page);
    await fileUploadPage.goto();
  });

  test("Verify successful upload of a file", async () => {
    await test.step("Verify the initial state on page load", async () => {
      await expect(fileUploadPage.chooseFileInput).toBeVisible();
      await expect(fileUploadPage.chooseFileInput).toHaveValue("");
    });
    await test.step("Upload the file", async () => {
      await fileUploadPage.uploadViaButton(filePath.full);
    });
    await test.step("Verify successful upload", async () => {
      await expect(fileUploadPage.successHeader).toHaveText("File Uploaded!");
      await expect(fileUploadPage.uploadedFileName).toContainText(
        "test-file.txt",
      );
    });
  });

  test('Verify the "Drag and Drop" area works as an alternative to the button', async () => {
    await test.step("Drop the file", async () => {
      await fileUploadPage.uploadViaDragAndDrop(filePath.full);
    });
    await test.step("Verify box contains name of file", async () => {
      await expect(fileUploadPage.dragDropZone).toContainText("test-file.txt");
    });
  });

  test("Attempt to upload an empty file, 0kb", async () => {
    await test.step("Upload empty file via upload button", async () => {
      await fileUploadPage.uploadViaButton(filePath.empty);
    });
    await test.step('Verify the "file uploaded" header appears', async () => {
      await expect(fileUploadPage.successHeader).toBeVisible();
      await expect(fileUploadPage.successHeader).toHaveText("File Uploaded!");
      await expect(fileUploadPage.uploadedFileName).toContainText("empty.txt");
    });
  });

  test("Attempt upload without selecting a file", async () => {
    await test.step("Click upload", async () => {
      await fileUploadPage.uploadButton.click();
    });
    await test.step(
      "Verify success header is not shown and site crashed",
      async () => {
        await expect(fileUploadPage.successHeader).not.toBeVisible();
        await expect(fileUploadPage.errorHeader).toBeVisible();
      },
    );
  });
});
