import {
  ListItem,
  ListItemText,
  IconButton,
  Checkbox,
  TextField,
} from '@mui/material';
import { MdEdit, MdDelete, MdCheck, MdClose } from 'react-icons/md';
import { TodoItemProps } from '../models';

export default function TodoItem({
  todo,
  isEditing,
  editText,
  onEditTextChange,
  onToggleComplete,
  onStartEdit,
  onFinishEdit,
  onCancelEdit,
  onDelete,
}: TodoItemProps) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onFinishEdit();
    }
    if (e.key === 'Escape') {
      onCancelEdit();
    }
  };

  return (
    <ListItem
      secondaryAction={
        !isEditing && (
          <div>
            <IconButton
              onClick={() => onStartEdit(todo.id, todo.text)}
              color="primary"
              size="small"
              className="mr-2"
            >
              <MdEdit />
            </IconButton>
            <IconButton
              onClick={() => onDelete(todo.id)}
              color="error"
              size="small"
            >
              <MdDelete />
            </IconButton>
          </div>
        )
      }
    >
      <Checkbox
        checked={todo.completed}
        onChange={() => onToggleComplete(todo.id)}
        color="primary"
      />

      {isEditing ? (
        <div className="flex-grow flex gap-2 ml-2">
          <TextField
            fullWidth
            value={editText}
            onChange={(e) => onEditTextChange(e.target.value)}
            onKeyDown={handleKeyDown}
            size="small"
            autoFocus
          />
          <IconButton onClick={onFinishEdit} color="primary" size="small">
            <MdCheck />
          </IconButton>
          <IconButton onClick={onCancelEdit} color="secondary" size="small">
            <MdClose />
          </IconButton>
        </div>
      ) : (
        <ListItemText
          primary={todo.text}
          secondary={`建立時間：${todo.createdAt.toLocaleString()}`}
          className={`${todo.completed ? 'line-through opacity-60' : ''}`}
        />
      )}
    </ListItem>
  );
}
