
"use client";

import { useState, useCallback } from "react";
import { initialBoard } from "@/lib/dummy-data";
import { addCardToBoard, deleteCardFromBoard, renameColumnInBoard } from "@/lib/board-utils";
import { Board } from "@/components/Board";

export default function Home() {
  const [board, setBoard] = useState(initialBoard);

  const handleAddCard = useCallback(
    (columnId: string, title: string, details: string) => {
      setBoard((prev) => addCardToBoard(prev, columnId, title, details));
    },
    []
  );

  const handleDeleteCard = useCallback((cardId: string) => {
    setBoard((prev) => deleteCardFromBoard(prev, cardId));
  }, []);

  const handleRenameColumn = useCallback((columnId: string, newTitle: string) => {
    setBoard((prev) => renameColumnInBoard(prev, columnId, newTitle));
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-accent-yellow/40 bg-white px-6 py-4">
        <h1 className="text-2xl font-bold text-dark-navy">Kanban Board</h1>
      </header>
      <main className="p-6">
        <Board
          board={board}
          onBoardChange={setBoard}
          onAddCard={handleAddCard}
          onDeleteCard={handleDeleteCard}
          onRenameColumn={handleRenameColumn}
        />
      </main>
    </div>
  );
}
