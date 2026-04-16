'use client';

import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { Card } from '@/lib/types';

type State = {
  cards: Card[];
  loading: boolean;
};

type Action =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'LOAD_CARDS'; payload: Card[] }
  | { type: 'ADD_CARD'; payload: Card }
  | { type: 'UPDATE_CARD'; payload: Card }
  | { type: 'DELETE_CARD'; payload: string }
  | { type: 'MOVE_CARD'; payload: { id: string; column: Card['column'] } };

const initialState: State = {
  cards: [],
  loading: true,
};

function kanbanReducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'LOAD_CARDS':
      return { ...state, cards: action.payload, loading: false };
    case 'ADD_CARD':
      return { ...state, cards: [...state.cards, action.payload] };
    case 'UPDATE_CARD':
      return {
        ...state,
        cards: state.cards.map(card =>
          card.id === action.payload.id ? action.payload : card
        ),
      };
    case 'DELETE_CARD':
      return {
        ...state,
        cards: state.cards.filter(card => card.id !== action.payload),
      };
    case 'MOVE_CARD':
      return {
        ...state,
        cards: state.cards.map(card =>
          card.id === action.payload.id
            ? { ...card, column: action.payload.column }
            : card
        ),
      };
    default:
      return state;
  }
}

const KanbanContext = createContext<{
  state: State;
  dispatch: React.Dispatch<Action>;
} | null>(null);

export function KanbanProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(kanbanReducer, initialState);

  useEffect(() => {
    const stored = localStorage.getItem('kanban-cards');
    if (stored) {
      dispatch({ type: 'LOAD_CARDS', payload: JSON.parse(stored) });
    } else {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }, []);

  useEffect(() => {
    if (!state.loading) {
      localStorage.setItem('kanban-cards', JSON.stringify(state.cards));
    }
  }, [state.cards, state.loading]);

  return (
    <KanbanContext.Provider value={{ state, dispatch }}>
      {children}
    </KanbanContext.Provider>
  );
}

export function useKanban() {
  const context = useContext(KanbanContext);
  if (!context) {
    throw new Error('useKanban must be used within KanbanProvider');
  }
  return context;
}