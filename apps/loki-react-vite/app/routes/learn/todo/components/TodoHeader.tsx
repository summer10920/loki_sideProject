import { Typography, Button } from '@mui/material';
import { MdCheckBox, MdInfo } from 'react-icons/md';
import { TodoHeaderProps } from '../models';

export default function TodoHeader({ onShowInfo }: TodoHeaderProps) {
  return (
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
        onClick={onShowInfo}
      >
        功能說明
      </Button>
    </div>
  );
} 