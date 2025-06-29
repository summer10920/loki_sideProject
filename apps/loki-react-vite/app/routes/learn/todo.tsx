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
      <div className="flex justify-center mt-8">
        <CircularProgress />
        <Typography className="ml-4">載入中...</Typography>
      </div>
    );
  }

  // 錯誤狀態
  if (error) {
    return (
      <div className="mt-8">
        <Alert severity="error">錯誤: {error}</Alert>
      </div>
    );
  }

  // 統計
  const completedCount = todos.filter((todo) => todo.completed).length;
  const totalCount = todos.length;
  const pendingCount = totalCount - completedCount;

  return (
    <div>
      {/* 頁面標題和說明 */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <Typography variant="h4" component="h2" className="mb-2">
            <MdCheckBox className="mr-2 align-middle" />
            Todo 應用程式 (IndexedDB)
          </Typography>
          <Typography variant="body1" color="text.secondary">
            使用 IndexedDB 進行本地資料儲存的 Todo 應用程式
          </Typography>
        </div>
        <Button
          variant="outlined"
          startIcon={<MdInfo />}
          onClick={() => setShowInfo(true)}
        >
          功能說明
        </Button>
      </div>

      {/* 統計資訊 */}
      <Paper className="p-4 mb-6">
        <div className="flex gap-4 flex-wrap">
          <Chip label={`總計: ${totalCount}`} color="primary" />
          <Chip label={`待完成: ${pendingCount}`} color="warning" />
          <Chip label={`已完成: ${completedCount}`} color="success" />
        </div>
      </Paper>

      {/* 新增 Todo */}
      <Paper className="p-6 mb-6">
        <Typography variant="h6" className="mb-4">
          新增待辦事項
        </Typography>
        <div className="flex gap-4">
          <TextField
            className="flex-grow"
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
        </div>
      </Paper>

      {/* Todo 清單 */}
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
              <ListItem key={todo.id} divider={index < todos.length - 1}>
                <Checkbox
                  checked={todo.completed}
                  onChange={() => toggleTodo(todo.id)}
                  color="primary"
                />

                {editingId === todo.id ? (
                  <div className="flex-grow flex gap-2 ml-2">
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
                  </div>
                ) : (
                  <ListItemText
                    primary={todo.text}
                    secondary={`建立時間：${todo.createdAt.toLocaleString()}`}
                    className={`${
                      todo.completed 
                        ? 'line-through opacity-60' 
                        : ''
                    }`}
                  />
                )}

                {editingId !== todo.id && (
                  <ListItemSecondaryAction>
                    <IconButton
                      onClick={() => startEdit(todo.id, todo.text)}
                      color="primary"
                      size="small"
                      className="mr-2"
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
          <Alert severity="info" className="mb-4">
            這個 Todo 應用程式使用 IndexedDB 進行資料儲存
          </Alert>

          <Typography variant="h6" gutterBottom>
            主要功能：
          </Typography>
          <ul className="pl-4">
            <li>✅ 新增待辦事項</li>
            <li>✏️ 編輯現有事項（點擊編輯按鈕）</li>
            <li>🗑️ 刪除事項</li>
            <li>☑️ 標記為完成/未完成</li>
            <li>💾 使用 IndexedDB 本地儲存</li>
            <li>📊 即時統計顯示</li>
          </ul>

          <Typography variant="h6" gutterBottom className="mt-4">
            技術特色：
          </Typography>
          <ul className="pl-4">
            <li>React Hooks (useState, useEffect, useCallback)</li>
            <li>TypeScript 型別安全</li>
            <li>Material-UI 設計系統</li>
            <li>IndexedDB 資料持久化</li>
            <li>自訂 React Hook 封裝</li>
            <li>錯誤處理和載入狀態</li>
          </ul>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowInfo(false)}>關閉</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
