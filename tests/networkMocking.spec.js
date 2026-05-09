import { test, expect } from "@playwright/test";

test("displays mocked user data correctly @network @smoke", async ({
  page,
}) => {
  await page.route("**/users/1", (route) => {
    route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        id: 1,
        name: "Lola Grace",
        email: "lola@qa.com",
        username: "lolahgrace",
      }),
    });
  });

  await page.goto("https://jsonplaceholder.typicode.com");

  const body = await page.evaluate(async () => {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/users/1",
    );
    return response.json();
  });
  expect(body.name).toBe("Lola Grace");
  expect(body.email).toBe("lola@qa.com");
});

test("handles 500 server error gracefully @network @regression", async ({
  page,
}) => {
  await page.route("**/posts/1", (route) => {
    route.fulfill({
      status: 500,
      contentType: "application/json",
      body: JSON.stringify({ error: "Internal Server Error" }),
    });
  });

  await page.goto("https://jsonplaceholder.typicode.com");

  const result = await page.evaluate(async () => {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/posts/1",
    );
    return { status: response.status, body: await response.json() };
  });

  expect(result.status).toBe(500);
  expect(result.body.error).toBe("Internal Server Error");
});

test("blocks unnecessary third-party requests @network", async ({ page }) => {
  let requestBlocked = false;

  await page.route("**/photos/**", (route) => {
    requestBlocked = true;
    route.abort();
  });

  await page.goto("https://jsonplaceholder.typicode.com");
  const blocked = await page.evaluate(async () => {
    try {
      await fetch("https://jsonplaceholder.typicode.com/photos/1");
      return false;
    } catch {
      return true;
    }
  });

  expect(requestBlocked).toBe(true);
  expect(blocked).toBe(true);
});
