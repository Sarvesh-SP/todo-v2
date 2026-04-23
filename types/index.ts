export type Todo = {
  id: string;
  title: string;
  completed: boolean;
  createdAt: string;
  dueDate?: string;
};

export type User = {
  id: string;
  name: string;
  email: string;
};

export type FilterType = 'all' | 'active' | 'completed';
