import { test, expect } from "@playwright/test";
import BrokenImagesPage from "../pages/BrokenImagesPage.js";

test("Detect broken images on the page", async ({ page }) => {
  const brokenImagesPage = new BrokenImagesPage(page);
  await brokenImagesPage.goto();

  let imageCount = 0;

  await test.step("Get the total count of images", async () => {
    imageCount = await brokenImagesPage.allImages.count();
    console.log(`Found ${imageCount} images to inspect.`);
  });

  await test.step("Inspect each image and verify integrity", async () => {
    for (let i = 0; i < imageCount; i++) {
      const isBroken = await brokenImagesPage.isImageBroken(i);

      expect.soft(isBroken, `Image at index ${i} is broken!`).toBe(false);
    }
  });
});
