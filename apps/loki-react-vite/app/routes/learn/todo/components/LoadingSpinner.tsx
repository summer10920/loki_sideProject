import { CircularProgress, Typography } from '@mui/material';

export default function LoadingSpinner() {
  return (
    <div className="flex justify-center mt-8">
      <CircularProgress />
      <Typography className="ml-4">載入中...</Typography>
    </div>
  );
}
