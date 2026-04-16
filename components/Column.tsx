'use client';

import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Column as ColumnType, Card } from '@/lib/types';
import CardItem from './Card';
import { useState } from 'react';
import CardModal from './CardForm';

interface ColumnProps {
  column: ColumnType;
  cards: Card[];
}

export default function Column({ column, cards }: ColumnProps) {
  const { setNodeRef } = useDroppable({
    id: column.id,
  });
  const [showForm, setShowForm] = useState(false);

  return (
    <>
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 flex flex-col min-h-[600px] w-full lg:w-80 flex-shrink-0">
        {/* Column Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">{column.title}</h2>
            <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
              {cards.length}
            </span>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="mt-3 w-full bg-gray-50 hover:bg-gray-100 text-gray-700 px-3 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 text-sm"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Card
          </button>
        </div>

        {/* Cards Container */}
        <div ref={setNodeRef} className="flex-1 p-4 space-y-3 overflow-y-auto">
          <SortableContext items={cards.map(c => c.id)} strategy={verticalListSortingStrategy}>
            {cards.length === 0 ? (
              <div className="text-gray-400 text-center py-8 text-sm">
                No cards yet
              </div>
            ) : (
              cards.map(card => <CardItem key={card.id} card={card} />)
            )}
          </SortableContext>
        </div>
      </div>

      {/* Modal */}
      {showForm && (
        <CardModal
          initialColumn={column.id}
          onClose={() => setShowForm(false)}
        />
      )}
    </>
  );
}