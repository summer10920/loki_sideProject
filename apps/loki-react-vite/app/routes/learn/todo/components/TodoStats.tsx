import { Paper, Chip } from '@mui/material';
import { TodoStatsProps } from '../models';

export default function TodoStats({
  totalCount,
  pendingCount,
  completedCount,
}: TodoStatsProps) {
  return (
    <Paper className="p-4 mb-6">
      <div className="flex gap-4 flex-wrap">
        <Chip label={`總計: ${totalCount}`} color="primary" />
        <Chip label={`待完成: ${pendingCount}`} color="warning" />
        <Chip label={`已完成: ${completedCount}`} color="success" />
      </div>
    </Paper>
  );
}
