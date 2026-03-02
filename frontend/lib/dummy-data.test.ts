import { describe, it, expect } from "vitest";
import { initialBoard } from "./dummy-data";

describe("dummy-data", () => {
  it("has exactly 5 columns", () => {
    expect(initialBoard.columns).toHaveLength(5);
  });

  it("each column has at least one card with title and details", () => {
    initialBoard.columns.forEach((col) => {
      expect(col.cards.length).toBeGreaterThanOrEqual(1);
      col.cards.forEach((card) => {
        expect(card.title).toBeTruthy();
        expect(typeof card.details).toBe("string");
      });
    });
  });
});
