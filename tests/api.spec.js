import { test, expect } from "@playwright/test";

test("GET single user", async ({ request }) => {
  const response = await request.get(
    "https://jsonplaceholder.typicode.com/users/1",
  );

  expect(response.status()).toBe(200);

  const body = await response.json();
  expect(body.id).toEqual(1);
  expect(body.name).toEqual("Leanne Graham");
  expect(body.email).toContain("@");
});

test("POST new post", async ({ request }) => {
  const response = await request.post(
    "https://jsonplaceholder.typicode.com/posts",
    {
      data: {
        title: "My Playwright Test Post",
        body: "Created via Playwright API test",
        userId: 1,
      },
    },
  );
  expect(response.status()).toBe(201);

  const body = await response.json();
  expect(body.id).toBeDefined();
  expect(body.title).toEqual("My Playwright Test Post");
});

test("DELETE a post", async ({ request }) => {
  const response = await request.delete(
    "https://jsonplaceholder.typicode.com/posts/1",
  );

  expect(response.status()).toBe(200);
});
