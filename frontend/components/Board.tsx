"use client";

import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
} from "@dnd-kit/core";
import { useState } from "react";
import type { Board as BoardType, Card as CardType } from "@/lib/types";
import { moveCard } from "@/lib/board-utils";
import { Column } from "./Column";
import { Card } from "./Card";

interface BoardProps {
  board: BoardType;
  onBoardChange: (board: BoardType) => void;
  onAddCard?: (columnId: string, title: string, details: string) => void;
  onDeleteCard?: (cardId: string) => void;
  onRenameColumn?: (columnId: string, newTitle: string) => void;
}

export function Board({
  board,
  onBoardChange,
  onAddCard,
  onDeleteCard,
  onRenameColumn,
}: BoardProps) {
  const [activeCard, setActiveCard] = useState<CardType | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 8 },
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    const cardId = event.active.id as string;
    for (const col of board.columns) {
      const card = col.cards.find((c) => c.id === cardId);
      if (card) {
        setActiveCard(card);
        break;
      }
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveCard(null);
    const { active, over } = event;
    if (!over) return;

    const cardId = active.id as string;
    const targetColumnId = over.id as string;
    const targetColumn = board.columns.find((c) => c.id === targetColumnId);
    if (!targetColumn) return;

    const sourceColumn = board.columns.find((col) =>
      col.cards.some((c) => c.id === cardId)
    );
    if (!sourceColumn || sourceColumn.id === targetColumnId) return;

    onBoardChange(moveCard(board, cardId, targetColumnId));
  };

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="flex gap-4 overflow-x-auto pb-4">
        {board.columns.map((column) => (
          <Column
            key={column.id}
            column={column}
            onAddCard={onAddCard}
            onDeleteCard={onDeleteCard}
            onRenameColumn={onRenameColumn}
          />
        ))}
      </div>

      <DragOverlay>
        {activeCard ? (
          <div className="rotate-2 opacity-90">
            <Card card={activeCard} />
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
