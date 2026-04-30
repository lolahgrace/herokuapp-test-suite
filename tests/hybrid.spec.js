import { test, expect } from "@playwright/test";

test("API setup + API verification", async ({ request }) => {
  const createResponse = await request.post(
    "https://jsonplaceholder.typicode.com/posts",
    {
      data: {
        title: "Hybrid Test Post",
        body: "Created via API",
        userId: 1,
      },
    },
  );

  expect(createResponse.status()).toBe(201);
  const createBody = await createResponse.json();
  expect(createBody.title).toBe("Hybrid Test Post");
  expect(createBody.body).toBe("Created via API");
  expect(createBody.userId).toBe(1);
});
