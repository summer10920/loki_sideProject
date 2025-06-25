import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Checkbox,
  Paper,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  Divider
} from '@mui/material';
import {
  MdAdd,
  MdDelete,
  MdEdit,
  MdCheck,
  MdClose,
  MdCheckBox,
  MdInfo
} from 'react-icons/md';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
  createdAt: Date;
}

export default function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editText, setEditText] = useState('');
  const [showInfo, setShowInfo] = useState(false);

  // 從 localStorage 載入 todos
  useEffect(() => {
    const savedTodos = localStorage.getItem('loki-todos');
    if (savedTodos) {
      const parsedTodos = JSON.parse(savedTodos);
      // 將日期字串轉回 Date 物件
      const todosWithDates = parsedTodos.map((todo: any) => ({
        ...todo,
        createdAt: new Date(todo.createdAt)
      }));
      setTodos(todosWithDates);
    }
  }, []);

  // 儲存 todos 到 localStorage
  useEffect(() => {
    if (todos.length > 0) {
      localStorage.setItem('loki-todos', JSON.stringify(todos));
    }
  }, [todos]);

  // 新增 todo
  const addTodo = () => {
    if (newTodo.trim() === '') return;

    const todo: Todo = {
      id: Date.now(),
      text: newTodo.trim(),
      completed: false,
      createdAt: new Date()
    };

    setTodos([...todos, todo]);
    setNewTodo('');
  };

  // 刪除 todo
  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  // 切換完成狀態
  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  // 開始編輯
  const startEdit = (id: number, text: string) => {
    setEditingId(id);
    setEditText(text);
  };

  // 完成編輯
  const finishEdit = () => {
    if (editText.trim() === '') {
      setEditingId(null);
      return;
    }

    setTodos(todos.map(todo =>
      todo.id === editingId ? { ...todo, text: editText.trim() } : todo
    ));
    setEditingId(null);
    setEditText('');
  };

  // 取消編輯
  const cancelEdit = () => {
    setEditingId(null);
    setEditText('');
  };

  // 統計
  const completedCount = todos.filter(todo => todo.completed).length;
  const totalCount = todos.length;
  const pendingCount = totalCount - completedCount;

  return (
    <Box>
      {/* 頁面標題和說明 */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
        <Box>
          <Typography variant="h4" component="h2" gutterBottom>
            <MdCheckBox style={{ marginRight: 8, verticalAlign: 'middle' }} />
            Todo 應用程式
          </Typography>
          <Typography variant="body1" color="text.secondary">
            學習 React 狀態管理和本地儲存的實作練習
          </Typography>
        </Box>
        <Button
          variant="outlined"
          startIcon={<MdInfo />}
          onClick={() => setShowInfo(true)}
        >
          功能說明
        </Button>
      </Box>

      {/* 統計資訊 */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <Chip label={`總計: ${totalCount}`} color="primary" />
          <Chip label={`待完成: ${pendingCount}`} color="warning" />
          <Chip label={`已完成: ${completedCount}`} color="success" />
        </Box>
      </Paper>

      {/* 新增 Todo */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          新增待辦事項
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <TextField
            fullWidth
            placeholder="輸入新的待辦事項..."
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addTodo()}
            size="small"
          />
          <Button
            variant="contained"
            startIcon={<MdAdd />}
            onClick={addTodo}
            disabled={newTodo.trim() === ''}
          >
            新增
          </Button>
        </Box>
      </Paper>

      {/* Todo 清單 */}
      <Paper sx={{ mb: 3 }}>
        <Typography variant="h6" sx={{ p: 2, pb: 1 }}>
          待辦清單
        </Typography>
        <Divider />
        
        {todos.length === 0 ? (
          <Box sx={{ p: 4, textAlign: 'center' }}>
            <Typography color="text.secondary">
              還沒有任何待辦事項，快來新增一個吧！
            </Typography>
          </Box>
        ) : (
          <List>
            {todos.map((todo, index) => (
              <ListItem key={todo.id} divider={index < todos.length - 1}>
                <Checkbox
                  checked={todo.completed}
                  onChange={() => toggleTodo(todo.id)}
                  color="primary"
                />
                
                {editingId === todo.id ? (
                  <Box sx={{ flexGrow: 1, display: 'flex', gap: 1, ml: 1 }}>
                    <TextField
                      fullWidth
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') finishEdit();
                        if (e.key === 'Escape') cancelEdit();
                      }}
                      size="small"
                      autoFocus
                    />
                    <IconButton onClick={finishEdit} color="primary" size="small">
                      <MdCheck />
                    </IconButton>
                    <IconButton onClick={cancelEdit} color="secondary" size="small">
                      <MdClose />
                    </IconButton>
                  </Box>
                ) : (
                  <ListItemText
                    primary={todo.text}
                    secondary={`建立時間：${todo.createdAt.toLocaleString()}`}
                    sx={{
                      textDecoration: todo.completed ? 'line-through' : 'none',
                      opacity: todo.completed ? 0.6 : 1
                    }}
                  />
                )}

                {editingId !== todo.id && (
                  <ListItemSecondaryAction>
                    <IconButton
                      onClick={() => startEdit(todo.id, todo.text)}
                      color="primary"
                      size="small"
                      sx={{ mr: 1 }}
                    >
                      <MdEdit />
                    </IconButton>
                    <IconButton
                      onClick={() => deleteTodo(todo.id)}
                      color="error"
                      size="small"
                    >
                      <MdDelete />
                    </IconButton>
                  </ListItemSecondaryAction>
                )}
              </ListItem>
            ))}
          </List>
        )}
      </Paper>

      {/* 功能說明對話框 */}
      <Dialog open={showInfo} onClose={() => setShowInfo(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Todo 應用程式功能說明</DialogTitle>
        <DialogContent>
          <Alert severity="info" sx={{ mb: 2 }}>
            這個 Todo 應用程式展示了 React 的核心概念和實用功能
          </Alert>
          
          <Typography variant="h6" gutterBottom>
            主要功能：
          </Typography>
          <Box component="ul" sx={{ pl: 2 }}>
            <li>✅ 新增待辦事項</li>
            <li>✏️ 編輯現有事項（雙擊或點擊編輯按鈕）</li>
            <li>🗑️ 刪除事項</li>
            <li>☑️ 標記為完成/未完成</li>
            <li>💾 自動儲存到瀏覽器本地儲存</li>
            <li>📊 即時統計顯示</li>
          </Box>

          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            技術特色：
          </Typography>
          <Box component="ul" sx={{ pl: 2 }}>
            <li>React Hooks (useState, useEffect)</li>
            <li>TypeScript 型別安全</li>
            <li>Material-UI 設計系統</li>
            <li>Local Storage 資料持久化</li>
            <li>響應式設計</li>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowInfo(false)}>關閉</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
} 