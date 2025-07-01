import { Alert } from '@mui/material';
import { ErrorDisplayProps } from '../models';

export default function ErrorDisplay({ error }: ErrorDisplayProps) {
  return (
    <div className="mt-8">
      <Alert severity="error">錯誤: {error}</Alert>
    </div>
  );
}
