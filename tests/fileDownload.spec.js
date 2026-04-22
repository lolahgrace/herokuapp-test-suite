import { test, expect } from "@playwright/test";
import FileDownloadPage from "../pages/FileDownloadPage.js";

test.describe("File Download functionality", () => {
  let fileDownloadPage;

  test.beforeEach(async ({ page }) => {
    fileDownloadPage = new FileDownloadPage(page);
    await fileDownloadPage.goto();
  });

  test("Verify files are listed on the page on page load", async () => {
    await expect(fileDownloadPage.firstDownloadLink).toBeVisible();
  });

  test("Click a file and verify the download actually happens", async () => {
    let download;
    await test.step("Click a file", async () => {
      download = await fileDownloadPage.downloadFirstFile();
    });
    await test.step("Verify download happened", async () => {
      expect(download.suggestedFilename()).toBeTruthy();
    });
    await test.step(
      "Verify the downloaded file name matches what was clicked",
      async () => {
        const linkText = await fileDownloadPage.firstDownloadLink.textContent();
        expect(download.suggestedFilename()).toBe(linkText.trim());
      },
    );
  });
});
