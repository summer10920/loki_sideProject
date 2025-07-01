import { useState } from 'react';
import { useTodos } from '../../../hooks/useIndexedDB';
import {
  TodoHeader,
  TodoStats,
  TodoForm,
  TodoList,
  TodoInfoDialog,
  LoadingSpinner,
  ErrorDisplay,
} from './components';

export default function TodoApp() {
  const { todos, loading, error, addTodo, updateTodo, deleteTodo } = useTodos();
  const [newTodo, setNewTodo] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editText, setEditText] = useState('');
  const [showInfo, setShowInfo] = useState(false);

  // Event handlers
  // -----------------------------------------------------------------------
  const handleAddTodo = async () => {
    if (newTodo.trim() === '') return;
    try {
      await addTodo(newTodo.trim());
      setNewTodo('');
    } catch (err) {
      console.error('新增失敗:', err);
    }
  };

  const handleDeleteTodo = async (id: number) => {
    try {
      await deleteTodo(id);
    } catch (err) {
      console.error('刪除失敗:', err);
    }
  };

  const handleToggleComplete = async (id: number) => {
    const todo = todos.find((t) => t.id === id);
    if (todo) {
      await updateTodo(id, { completed: !todo.completed });
    }
  };

  const handleStartEdit = (id: number, text: string) => {
    setEditingId(id);
    setEditText(text);
  };

  const handleFinishEdit = async () => {
    if (editText.trim() === '') {
      setEditingId(null);
      return;
    }

    try {
      await updateTodo(editingId!, { text: editText.trim() });
      setEditingId(null);
      setEditText('');
    } catch (err) {
      console.error('編輯失敗:', err);
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditText('');
  };

  // Render states
  // -----------------------------------------------------------------------
  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorDisplay error={error} />;
  }

  // Statistics
  const completedCount = todos.filter((todo) => todo.completed).length;
  const totalCount = todos.length;
  const pendingCount = totalCount - completedCount;

  return (
    <div>
      <TodoHeader onShowInfo={() => setShowInfo(true)} />

      <TodoStats
        totalCount={totalCount}
        pendingCount={pendingCount}
        completedCount={completedCount}
      />

      <TodoForm
        newTodo={newTodo}
        onNewTodoChange={setNewTodo}
        onAddTodo={handleAddTodo}
      />

      <TodoList
        todos={todos}
        editingId={editingId}
        editText={editText}
        onEditTextChange={setEditText}
        onToggleComplete={handleToggleComplete}
        onStartEdit={handleStartEdit}
        onFinishEdit={handleFinishEdit}
        onCancelEdit={handleCancelEdit}
        onDelete={handleDeleteTodo}
      />

      <TodoInfoDialog open={showInfo} onClose={() => setShowInfo(false)} />
    </div>
  );
}
