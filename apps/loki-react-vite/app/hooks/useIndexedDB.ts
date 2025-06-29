import { useState, useEffect, useCallback } from 'react';
import { todoService } from '../idb/todo.service';
import { Todo } from '../idb/model';

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 載入所有 todos
  const loadTodos = useCallback(async () => {
    try {
      setLoading(true);
      const allTodos = await todoService.getAllTodos();
      setTodos(allTodos);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : '載入失敗');
    } finally {
      setLoading(false);
    }
  }, []);

  // 新增 todo
  const addTodo = useCallback(async (text: string) => {
    try {
      const newTodo = await todoService.addTodo({
        text,
        completed: false,
      });
      setTodos((prev) => [...prev, newTodo]);
      return newTodo;
    } catch (err) {
      setError(err instanceof Error ? err.message : '新增失敗');
      throw err;
    }
  }, []);

  // 更新 todo
  const updateTodo = useCallback(async (id: number, updates: Partial<Todo>) => {
    try {
      const updatedTodo = await todoService.updateTodo(id, updates);
      if (updatedTodo) {
        setTodos((prev) =>
          prev.map((todo) => (todo.id === id ? updatedTodo : todo))
        );
      }
      return updatedTodo;
    } catch (err) {
      setError(err instanceof Error ? err.message : '更新失敗');
      throw err;
    }
  }, []);

  // 刪除 todo
  const deleteTodo = useCallback(async (id: number) => {
    try {
      const success = await todoService.deleteTodo(id);
      if (success) {
        setTodos((prev) => prev.filter((todo) => todo.id !== id));
      }
      return success;
    } catch (err) {
      setError(err instanceof Error ? err.message : '刪除失敗');
      throw err;
    }
  }, []);

  // 初始化載入
  useEffect(() => {
    loadTodos();
  }, [loadTodos]);

  return {
    todos,
    loading,
    error,
    addTodo,
    updateTodo,
    deleteTodo,
    refreshTodos: loadTodos,
  };
}
