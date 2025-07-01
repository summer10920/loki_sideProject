import { Paper, TextField, Button } from '@mui/material';
import { MdAdd } from 'react-icons/md';
import { TodoFormProps } from '../models';

export default function TodoForm({
  newTodo,
  onNewTodoChange,
  onAddTodo,
}: TodoFormProps) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onAddTodo();
    }
  };

  return (
    <Paper className="p-6 mb-6">
      <div className="flex gap-4">
        <TextField
          className="flex-grow"
          placeholder="輸入新的待辦事項..."
          value={newTodo}
          onChange={(e) => onNewTodoChange(e.target.value)}
          onKeyDown={handleKeyDown}
          size="small"
          label="新增待辦事項"
          variant="outlined"
        />
        <Button
          variant="contained"
          startIcon={<MdAdd />}
          onClick={onAddTodo}
          disabled={newTodo.trim() === ''}
        >
          新增
        </Button>
      </div>
    </Paper>
  );
}
