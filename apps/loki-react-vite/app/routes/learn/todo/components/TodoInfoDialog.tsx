import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Alert,
} from '@mui/material';
import { TodoInfoDialogProps } from '../models';

export default function TodoInfoDialog({ open, onClose }: TodoInfoDialogProps) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
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
        <Button onClick={onClose}>關閉</Button>
      </DialogActions>
    </Dialog>
  );
}
