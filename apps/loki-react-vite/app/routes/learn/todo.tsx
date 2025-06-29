import { useState } from 'react';
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
  Divider,
  CircularProgress,
} from '@mui/material';
import {
  MdAdd,
  MdDelete,
  MdEdit,
  MdCheck,
  MdClose,
  MdCheckBox,
  MdInfo,
} from 'react-icons/md';
import { useTodos } from '../../hooks/useIndexedDB';

export default function TodoApp() {
  const { todos, loading, error, addTodo, updateTodo, deleteTodo } = useTodos();
  const [newTodo, setNewTodo] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editText, setEditText] = useState('');
  const [showInfo, setShowInfo] = useState(false);

  // event method
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

  const toggleTodo = async (id: number) => {
    const todo = todos.find((t) => t.id === id);
    if (todo) {
      await updateTodo(id, { completed: !todo.completed });
    }
  };

  const startEdit = (id: number, text: string) => {
    setEditingId(id);
    setEditText(text);
  };

  const finishEdit = async () => {
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

  const cancelEdit = () => {
    setEditingId(null);
    setEditText('');
  };

  // render
  // -----------------------------------------------------------------------
  // 載入中狀態
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
        <Typography sx={{ ml: 2 }}>載入中...</Typography>
      </Box>
    );
  }

  // 錯誤狀態
  if (error) {
    return (
      <Box sx={{ mt: 4 }}>
        <Alert severity="error">錯誤: {error}</Alert>
      </Box>
    );
  }

  // 統計
  const completedCount = todos.filter((todo) => todo.completed).length;
  const totalCount = todos.length;
  const pendingCount = totalCount - completedCount;

  return (
    <Box>
      {/* 頁面標題和說明 */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          mb: 3,
        }}
      >
        <Box>
          <Typography variant="h4" component="h2" gutterBottom>
            <MdCheckBox style={{ marginRight: 8, verticalAlign: 'middle' }} />
            Todo 應用程式 (IndexedDB)
          </Typography>
          <Typography variant="body1" color="text.secondary">
            使用 IndexedDB 進行本地資料儲存的 Todo 應用程式
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
            onKeyPress={(e) => e.key === 'Enter' && handleAddTodo()}
            size="small"
          />
          <Button
            variant="contained"
            startIcon={<MdAdd />}
            onClick={handleAddTodo}
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
                    <IconButton
                      onClick={finishEdit}
                      color="primary"
                      size="small"
                    >
                      <MdCheck />
                    </IconButton>
                    <IconButton
                      onClick={cancelEdit}
                      color="secondary"
                      size="small"
                    >
                      <MdClose />
                    </IconButton>
                  </Box>
                ) : (
                  <ListItemText
                    primary={todo.text}
                    secondary={`建立時間：${todo.createdAt.toLocaleString()}`}
                    sx={{
                      textDecoration: todo.completed ? 'line-through' : 'none',
                      opacity: todo.completed ? 0.6 : 1,
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
                      onClick={() => handleDeleteTodo(todo.id)}
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
      <Dialog
        open={showInfo}
        onClose={() => setShowInfo(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Todo 應用程式功能說明</DialogTitle>
        <DialogContent>
          <Alert severity="info" sx={{ mb: 2 }}>
            這個 Todo 應用程式使用 IndexedDB 進行資料儲存
          </Alert>

          <Typography variant="h6" gutterBottom>
            主要功能：
          </Typography>
          <Box component="ul" sx={{ pl: 2 }}>
            <li>✅ 新增待辦事項</li>
            <li>✏️ 編輯現有事項（點擊編輯按鈕）</li>
            <li>🗑️ 刪除事項</li>
            <li>☑️ 標記為完成/未完成</li>
            <li>💾 使用 IndexedDB 本地儲存</li>
            <li>📊 即時統計顯示</li>
          </Box>

          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            技術特色：
          </Typography>
          <Box component="ul" sx={{ pl: 2 }}>
            <li>React Hooks (useState, useEffect, useCallback)</li>
            <li>TypeScript 型別安全</li>
            <li>Material-UI 設計系統</li>
            <li>IndexedDB 資料持久化</li>
            <li>自訂 React Hook 封裝</li>
            <li>錯誤處理和載入狀態</li>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowInfo(false)}>關閉</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
