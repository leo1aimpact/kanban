"use client";

import type { Card as CardType } from "@/lib/types";

interface CardProps {
  card: CardType;
  onDelete?: (id: string) => void;
}

export function Card({ card, onDelete }: CardProps) {
  return (
    <div className="group rounded-lg border border-gray-200 bg-white p-3 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0 flex-1">
          <h3 className="font-medium text-dark-navy">{card.title}</h3>
          {card.details && (
            <p className="mt-1 text-sm text-gray-text">{card.details}</p>
          )}
        </div>
        {onDelete && (
          <button
            type="button"
            onClick={() => onDelete(card.id)}
            className="rounded p-1 text-gray-text opacity-0 transition-opacity hover:bg-red-50 hover:text-red-600 group-hover:opacity-100"
            aria-label={`Delete ${card.title}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 6h18" />
              <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
              <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
              <line x1="10" y1="11" x2="10" y2="17" />
              <line x1="14" y1="11" x2="14" y2="17" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}
