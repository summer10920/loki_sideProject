// Todo 資料模型
export interface Todo {
  id: number;
  text: string;
  completed: boolean;
  createdAt: Date;
}

// 元件 Props 介面
export interface TodoHeaderProps {
  onShowInfo: () => void;
}

export interface TodoStatsProps {
  totalCount: number;
  pendingCount: number;
  completedCount: number;
}

export interface TodoFormProps {
  newTodo: string;
  onNewTodoChange: (value: string) => void;
  onAddTodo: () => void;
}

export interface TodoItemProps {
  todo: Todo;
  isEditing: boolean;
  editText: string;
  onEditTextChange: (text: string) => void;
  onToggleComplete: (id: number) => void;
  onStartEdit: (id: number, text: string) => void;
  onFinishEdit: () => void;
  onCancelEdit: () => void;
  onDelete: (id: number) => void;
}

export interface TodoListProps {
  todos: Todo[];
  editingId: number | null;
  editText: string;
  onEditTextChange: (text: string) => void;
  onToggleComplete: (id: number) => void;
  onStartEdit: (id: number, text: string) => void;
  onFinishEdit: () => void;
  onCancelEdit: () => void;
  onDelete: (id: number) => void;
}

export interface TodoInfoDialogProps {
  open: boolean;
  onClose: () => void;
}

export interface ErrorDisplayProps {
  error: string;
}

// 事件處理器類型
export type TodoEventHandlers = {
  onAddTodo: () => void;
  onDeleteTodo: (id: number) => void;
  onToggleComplete: (id: number) => void;
  onStartEdit: (id: number, text: string) => void;
  onFinishEdit: () => void;
  onCancelEdit: () => void;
};
