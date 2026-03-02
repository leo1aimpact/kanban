import type { Board as BoardType, Card as CardType } from "./types";

export function addCardToBoard(
  board: BoardType,
  columnId: string,
  title: string,
  details: string,
  idGenerator: () => string = () => crypto.randomUUID()
): BoardType {
  const newCard: CardType = {
    id: idGenerator(),
    title,
    details,
  };
  return {
    columns: board.columns.map((col) =>
      col.id === columnId ? { ...col, cards: [...col.cards, newCard] } : col
    ),
  };
}

export function deleteCardFromBoard(board: BoardType, cardId: string): BoardType {
  return {
    columns: board.columns.map((col) => ({
      ...col,
      cards: col.cards.filter((c) => c.id !== cardId),
    })),
  };
}

export function renameColumnInBoard(
  board: BoardType,
  columnId: string,
  newTitle: string
): BoardType {
  return {
    columns: board.columns.map((col) =>
      col.id === columnId ? { ...col, title: newTitle } : col
    ),
  };
}

export function moveCard(
  board: BoardType,
  cardId: string,
  targetColumnId: string
): BoardType {
  let card: CardType | null = null;
  const newColumns = board.columns.map((col) => {
    const cardIndex = col.cards.findIndex((c) => c.id === cardId);
    if (cardIndex >= 0) {
      card = col.cards[cardIndex];
      return {
        ...col,
        cards: col.cards.filter((c) => c.id !== cardId),
      };
    }
    return col;
  });

  if (!card) return board;

  return {
    columns: newColumns.map((col) =>
      col.id === targetColumnId ? { ...col, cards: [...col.cards, card!] } : col
    ),
  };
}
