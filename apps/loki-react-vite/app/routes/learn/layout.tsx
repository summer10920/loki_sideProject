import { Outlet, Link, useLocation } from 'react-router';
import { Typography, Breadcrumbs, Paper, Tabs, Tab } from '@mui/material';
import { MdSchool, MdHome, MdCheckBox } from 'react-icons/md';

export default function LearnLayout() {
  const location = useLocation();

  // 判斷當前活動的 tab
  const currentTab = location.pathname.split('/').pop() || 'index';

  return (
    <>
      <Breadcrumbs sx={{ mb: 2 }}>
        <Link to="/" className="flex items-center no-underline text-inherit">
          <MdHome className="mr-1" />
          首頁
        </Link>
        <Typography color="text.primary" className="flex items-center">
          <MdSchool className="mr-1" />
          學習中心
        </Typography>
      </Breadcrumbs>
      <Paper className="mb-8 overflow-hidden">
        <Tabs
          value={currentTab}
          variant="scrollable"
          scrollButtons="auto"
          className="border-b border-gray-200 dark:border-gray-700"
          sx={{
            minHeight: '38px',
            '& .MuiTab-root': { minHeight: '36px' },
          }}
        >
          <Tab
            component={Link}
            to="/learn"
            value="learn"
            label="概覽"
            icon={<MdSchool />}
            iconPosition="start"
          />
          <Tab
            component={Link}
            to="/learn/todo"
            value="todo"
            label="Todo 應用"
            icon={<MdCheckBox />}
            iconPosition="start"
          />
        </Tabs>
      </Paper>
      <Outlet />
    </>
  );
}
