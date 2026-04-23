import { test, expect } from "@playwright/test";
import FramesPage from "../pages/FramesPage.js";

test.describe("Handle iFrame interactions", async () => {
    let framesPage;

    test.beforeEach(async ({ page }) => {
    framesPage = new FramesPage(page);
    await framesPage.goto();
  });

  test("Verify editor is accessible", async () => {
    await expect(framesPage.textArea).toBeVisible();
  });
  test("Clear existing content and type new text inside Frame Editor", async () => {
    const myMessage = "Playwright has entered the frame!";
    await framesPage.clearAndWrite(myMessage);
    await expect(framesPage.textArea).toHaveText(myMessage);
  });
  test("Switching back to the main page and verify", async () => {
    await expect(framesPage.header).toHaveText(
      "An iFrame containing the TinyMCE WYSIWYG Editor",
    );
  });
});
