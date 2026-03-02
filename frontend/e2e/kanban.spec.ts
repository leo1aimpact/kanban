import { test, expect } from "@playwright/test";

test.describe("Kanban Board", () => {
  test("page loads with dummy data visible", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/Kanban/);
    await expect(page.getByRole("heading", { name: "Kanban Board" })).toBeVisible();
    await expect(page.getByText("To Do")).toBeVisible();
    await expect(page.getByText("In Progress")).toBeVisible();
    await expect(page.getByText("Set up project")).toBeVisible();
  });

  test("add new card to column", async ({ page }) => {
    await page.goto("/");
    const toDoColumn = page.getByTestId("column").first();
    await toDoColumn.getByRole("button", { name: /add card/i }).click();
    await toDoColumn.getByPlaceholder("Card title").fill("E2E Test Card");
    await toDoColumn.getByPlaceholder("Details (optional)").fill("Added by test");
    await toDoColumn.getByRole("button", { name: /^add$/i }).click();
    await expect(page.getByText("E2E Test Card")).toBeVisible();
    await expect(page.getByText("Added by test")).toBeVisible();
  });

  test("delete card", async ({ page }) => {
    await page.goto("/");
    const card = page.getByText("Set up project").locator("../../..");
    await card.hover();
    await card.getByRole("button", { name: "Delete Set up project", exact: true }).click({ force: true });
    await expect(page.getByText("Set up project")).not.toBeVisible();
  });

  test("rename column", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("heading", { name: "To Do" }).first().click();
    const input = page.getByTestId("column-title-input");
    await input.fill("Ready");
    await input.press("Enter");
    await expect(page.getByRole("heading", { name: "Ready" })).toBeVisible();
  });

  test("drag card between columns", async ({ page }) => {
    await page.goto("/");
    const card = page.getByText("Set up project").locator("../..");
    const doneColumn = page.getByTestId("column").filter({ hasText: "Done" }).first();
    const cardBox = await card.boundingBox();
    const targetBox = await doneColumn.boundingBox();
    if (cardBox && targetBox) {
      await page.mouse.move(cardBox.x + cardBox.width / 2, cardBox.y + cardBox.height / 2);
      await page.mouse.down();
      await page.mouse.move(targetBox.x + targetBox.width / 2, targetBox.y + targetBox.height / 2, { steps: 10 });
      await page.mouse.up();
    }
    await expect(doneColumn.getByText("Set up project")).toBeVisible();
  });
});
