import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Todo } from '@/types';

const TODOS_KEY = '@todos';

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem(TODOS_KEY)
      .then((data) => {
        if (data) setTodos(JSON.parse(data));
      })
      .finally(() => setLoaded(true));
  }, []);

  const persist = useCallback(async (updated: Todo[]) => {
    await AsyncStorage.setItem(TODOS_KEY, JSON.stringify(updated));
    setTodos(updated);
  }, []);

  const addTodo = useCallback(
    async (title: string, dueDate?: string) => {
      const todo: Todo = {
        id: Date.now().toString(),
        title: title.trim(),
        completed: false,
        createdAt: new Date().toISOString(),
        dueDate: dueDate?.trim() || undefined,
      };
      await persist([todo, ...todos]);
    },
    [todos, persist],
  );

  const toggleTodo = useCallback(
    async (id: string) => {
      const updated = todos.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t,
      );
      await persist(updated);
    },
    [todos, persist],
  );

  const deleteTodo = useCallback(
    async (id: string) => {
      await persist(todos.filter((t) => t.id !== id));
    },
    [todos, persist],
  );

  const completedCount = todos.filter((t) => t.completed).length;
  const pendingCount = todos.length - completedCount;

  return {
    todos,
    loaded,
    addTodo,
    toggleTodo,
    deleteTodo,
    completedCount,
    pendingCount,
  };
}
