'use client';

import { useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Card as CardType } from '@/lib/types';
import { useKanban } from '@/lib/context/KanbanContext';
import CardModal from './CardForm';
import ConfirmDialog from './ConfirmDialog';

interface CardItemProps {
  card: CardType;
}

export default function CardItem({ card }: CardItemProps) {
  const { dispatch } = useKanban();
  const [editing, setEditing] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: card.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleDelete = () => {
    dispatch({ type: 'DELETE_CARD', payload: card.id });
    setShowDelete(false);
  };

  if (editing) {
    return <CardModal card={card} onClose={() => setEditing(false)} />;
  }

  return (
    <>
      <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        className={`bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md cursor-move transition-all duration-200 ${
          isDragging ? 'opacity-50 rotate-2 scale-105' : 'hover:scale-[1.02]'
        }`}
      >
        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{card.title}</h3>
        {card.description && (
          <p className="text-sm text-gray-600 mb-3 line-clamp-3">{card.description}</p>
        )}
        <div className="flex items-center justify-between">
          <div className="flex gap-1">
            <button
              onClick={(e) => { e.stopPropagation(); setEditing(true); }}
              className="text-blue-600 hover:text-blue-700 text-sm font-medium px-2 py-1 rounded hover:bg-blue-50 transition-colors"
            >
              Edit
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); setShowDelete(true); }}
              className="text-red-600 hover:text-red-700 text-sm font-medium px-2 py-1 rounded hover:bg-red-50 transition-colors"
            >
              Delete
            </button>
          </div>
          <div className="text-xs text-gray-400">
            <svg className="w-4 h-4 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
            </svg>
          </div>
        </div>
      </div>
      {showDelete && (
        <ConfirmDialog
          message="Are you sure you want to delete this card?"
          onConfirm={handleDelete}
          onCancel={() => setShowDelete(false)}
        />
      )}
    </>
  );
}