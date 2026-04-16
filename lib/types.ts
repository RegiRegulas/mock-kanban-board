export type Card = {
  id: string;
  title: string;
  description: string;
  column: 'pending' | 'in-progress' | 'completed';
};

export type Column = {
  id: 'pending' | 'in-progress' | 'completed';
  title: string;
};