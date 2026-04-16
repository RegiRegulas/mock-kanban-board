'use client';

import { useState } from 'react';
import { DndContext, DragEndEvent, closestCenter } from '@dnd-kit/core';
import { useKanban } from '@/lib/context/KanbanContext';
import { Column as ColumnType } from '@/lib/types';
import Column from './Column';
import CardModal from './CardForm'; // Renamed for clarity

const columns: ColumnType[] = [
  { id: 'pending', title: 'Pending' },
  { id: 'in-progress', title: 'In Progress' },
  { id: 'completed', title: 'Completed' },
];

export default function KanbanBoard() {
  const { state, dispatch } = useKanban();
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);

  const filteredCards = state.cards.filter(card =>
    card.title.toLowerCase().includes(search.toLowerCase()) ||
    card.description.toLowerCase().includes(search.toLowerCase())
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;
    const cardId = active.id as string;
    const newColumn = over.id as ColumnType['id'];
    dispatch({ type: 'MOVE_CARD', payload: { id: cardId, column: newColumn } });
  };

  if (state.loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h1 className="text-2xl font-bold text-gray-900">Kanban Board</h1>
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              placeholder="Search cards..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            />
            <button
              onClick={() => setShowForm(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add Card
            </button>
          </div>
        </div>

        {/* Board */}
        <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <div className="flex flex-col lg:flex-row gap-6 overflow-x-auto lg:overflow-x-visible pb-4">
            {columns.map(column => (
              <Column
                key={column.id}
                column={column}
                cards={filteredCards.filter(card => card.column === column.id)}
              />
            ))}
          </div>
        </DndContext>

        {/* Modal */}
        {showForm && <CardModal onClose={() => setShowForm(false)} />}
      </div>
    </div>
  );
}