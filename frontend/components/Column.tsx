"use client";

import { useState } from "react";
import { useDroppable } from "@dnd-kit/core";
import type { Column as ColumnType } from "@/lib/types";
import { DraggableCard } from "./DraggableCard";

interface ColumnProps {
  column: ColumnType;
  onAddCard?: (columnId: string, title: string, details: string) => void;
  onDeleteCard?: (cardId: string) => void;
  onRenameColumn?: (columnId: string, newTitle: string) => void;
}

export function Column({ column, onAddCard, onDeleteCard, onRenameColumn }: ColumnProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [editTitle, setEditTitle] = useState(column.title);
  const { isOver, setNodeRef } = useDroppable({ id: column.id });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedTitle = title.trim();
    if (trimmedTitle && onAddCard) {
      onAddCard(column.id, trimmedTitle, details.trim());
      setTitle("");
      setDetails("");
      setIsAdding(false);
    }
  };

  const handleCancel = () => {
    setTitle("");
    setDetails("");
    setIsAdding(false);
  };

  const handleTitleSave = () => {
    const trimmed = editTitle.trim();
    if (trimmed && trimmed !== column.title && onRenameColumn) {
      onRenameColumn(column.id, trimmed);
    }
    setEditTitle(column.title);
    setIsEditingTitle(false);
  };

  const handleTitleClick = () => {
    if (onRenameColumn) {
      setEditTitle(column.title);
      setIsEditingTitle(true);
    }
  };

  return (
    <div
      ref={setNodeRef}
      data-testid="column"
      className={`flex min-w-[280px] max-w-[280px] flex-col rounded-lg border bg-gray-50/50 transition-colors ${
        isOver ? "border-accent-yellow border-2 bg-accent-yellow/5" : "border-accent-yellow/30"
      }`}
    >
      <div className="border-b border-accent-yellow/30 px-4 py-3">
        {isEditingTitle ? (
          <input
            type="text"
            data-testid="column-title-input"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            onBlur={handleTitleSave}
            onKeyDown={(e) => e.key === "Enter" && handleTitleSave()}
            className="w-full rounded border border-blue-primary px-2 py-1 text-lg font-semibold text-dark-navy focus:outline-none"
            autoFocus
          />
        ) : (
          <h2
            onClick={handleTitleClick}
            className="cursor-pointer text-lg font-semibold text-dark-navy hover:text-blue-primary"
          >
            {column.title}
          </h2>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-2 overflow-y-auto p-3">
        {column.cards.map((card) => (
          <DraggableCard key={card.id} card={card} onDelete={onDeleteCard} />
        ))}
        {isAdding ? (
          <form onSubmit={handleSubmit} className="rounded-lg border border-gray-200 bg-white p-3">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Card title"
              className="w-full rounded border border-gray-200 px-2 py-1.5 text-sm focus:border-blue-primary focus:outline-none"
              autoFocus
              required
            />
            <textarea
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              placeholder="Details (optional)"
              rows={2}
              className="mt-2 w-full rounded border border-gray-200 px-2 py-1.5 text-sm focus:border-blue-primary focus:outline-none"
            />
            <div className="mt-2 flex gap-2">
              <button
                type="submit"
                className="rounded bg-purple-secondary px-3 py-1.5 text-sm font-medium text-white hover:bg-purple-secondary/90"
              >
                Add
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="rounded border border-gray-300 px-3 py-1.5 text-sm text-gray-text hover:bg-gray-100"
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <button
            type="button"
            onClick={() => setIsAdding(true)}
            className="flex items-center justify-center gap-2 rounded-lg border-2 border-dashed border-blue-primary/40 py-3 text-sm font-medium text-blue-primary transition-colors hover:border-blue-primary hover:bg-blue-primary/5"
          >
            <span>Add card</span>
          </button>
        )}
      </div>
    </div>
  );
}
