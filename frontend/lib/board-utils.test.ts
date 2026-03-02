import { describe, it, expect } from "vitest";
import {
  addCardToBoard,
  deleteCardFromBoard,
  renameColumnInBoard,
  moveCard,
} from "./board-utils";
import { initialBoard } from "./dummy-data";

describe("board-utils", () => {
  describe("addCardToBoard", () => {
    it("adds card to specified column", () => {
      const columnId = initialBoard.columns[0].id;
      const result = addCardToBoard(
        initialBoard,
        columnId,
        "New Task",
        "Some details",
        () => "new-card-id"
      );
      const col = result.columns.find((c) => c.id === columnId)!;
      expect(col.cards.some((c) => c.id === "new-card-id")).toBe(true);
      expect(col.cards.find((c) => c.id === "new-card-id")).toEqual({
        id: "new-card-id",
        title: "New Task",
        details: "Some details",
      });
    });

    it("does not modify other columns", () => {
      const columnId = initialBoard.columns[0].id;
      const originalCount = initialBoard.columns[1].cards.length;
      const result = addCardToBoard(
        initialBoard,
        columnId,
        "New",
        "",
        () => "id"
      );
      expect(result.columns[1].cards.length).toBe(originalCount);
    });
  });

  describe("deleteCardFromBoard", () => {
    it("removes card from board", () => {
      const cardId = initialBoard.columns[0].cards[0].id;
      const result = deleteCardFromBoard(initialBoard, cardId);
      expect(result.columns.every((col) => !col.cards.some((c) => c.id === cardId))).toBe(true);
    });

    it("leaves other cards intact", () => {
      const cardId = initialBoard.columns[0].cards[0].id;
      const otherCardCount = initialBoard.columns
        .flatMap((c) => c.cards)
        .filter((c) => c.id !== cardId).length;
      const result = deleteCardFromBoard(initialBoard, cardId);
      expect(result.columns.flatMap((c) => c.cards).length).toBe(otherCardCount);
    });
  });

  describe("renameColumnInBoard", () => {
    it("renames specified column", () => {
      const columnId = initialBoard.columns[0].id;
      const result = renameColumnInBoard(initialBoard, columnId, "New Name");
      expect(result.columns.find((c) => c.id === columnId)!.title).toBe("New Name");
    });

    it("does not modify other columns", () => {
      const columnId = initialBoard.columns[0].id;
      const otherTitles = initialBoard.columns.slice(1).map((c) => c.title);
      const result = renameColumnInBoard(initialBoard, columnId, "New");
      expect(result.columns.slice(1).map((c) => c.title)).toEqual(otherTitles);
    });
  });

  describe("moveCard", () => {
    it("moves card from source to target column", () => {
      const cardId = initialBoard.columns[0].cards[0].id;
      const targetColumnId = initialBoard.columns[1].id;
      const result = moveCard(initialBoard, cardId, targetColumnId);

      const sourceCol = result.columns.find((c) => c.id === initialBoard.columns[0].id)!;
      const targetCol = result.columns.find((c) => c.id === targetColumnId)!;

      expect(sourceCol.cards.some((c) => c.id === cardId)).toBe(false);
      expect(targetCol.cards.some((c) => c.id === cardId)).toBe(true);
    });

    it("preserves card data when moving", () => {
      const card = initialBoard.columns[0].cards[0];
      const result = moveCard(initialBoard, card.id, initialBoard.columns[2].id);
      const targetCol = result.columns.find((c) => c.id === initialBoard.columns[2].id)!;
      const movedCard = targetCol.cards.find((c) => c.id === card.id)!;
      expect(movedCard).toEqual(card);
    });
  });
});
