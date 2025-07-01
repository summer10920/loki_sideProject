import { Paper, Typography, List, Divider } from '@mui/material';
import TodoItem from './TodoItem';
import { TodoListProps } from '../models';

export default function TodoList({
  todos,
  editingId,
  editText,
  onEditTextChange,
  onToggleComplete,
  onStartEdit,
  onFinishEdit,
  onCancelEdit,
  onDelete,
}: TodoListProps) {
  return (
    <Paper className="mb-6">
      <Typography variant="h6" className="p-4 pb-2">
        待辦清單
      </Typography>
      <Divider />

      {todos.length === 0 ? (
        <div className="p-8 text-center">
          <Typography color="text.secondary">
            還沒有任何待辦事項，快來新增一個吧！
          </Typography>
        </div>
      ) : (
        <List>
          {todos.map((todo, index) => (
            <div key={todo.id}>
              <TodoItem
                todo={todo}
                isEditing={editingId === todo.id}
                editText={editText}
                onEditTextChange={onEditTextChange}
                onToggleComplete={onToggleComplete}
                onStartEdit={onStartEdit}
                onFinishEdit={onFinishEdit}
                onCancelEdit={onCancelEdit}
                onDelete={onDelete}
              />
              {index < todos.length - 1 && <Divider />}
            </div>
          ))}
        </List>
      )}
    </Paper>
  );
}
