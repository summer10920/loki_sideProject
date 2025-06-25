import { Outlet, Link, useLocation } from 'react-router';
import { 
  Box, 
  Typography, 
  Breadcrumbs, 
  Paper, 
  Tabs, 
  Tab,
  Container 
} from '@mui/material';
import { MdSchool, MdHome, MdCheckBox } from 'react-icons/md';

export default function LearnLayout() {
  const location = useLocation();
  
  // 判斷當前活動的 tab
  const currentTab = location.pathname.split('/').pop() || 'index';
  
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* 麵包屑導航 */}
      <Breadcrumbs sx={{ mb: 3 }}>
        <Link 
          to="/" 
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            textDecoration: 'none', 
            color: 'inherit' 
          }}
        >
          <MdHome style={{ marginRight: 4 }} />
          首頁
        </Link>
        <Typography color="text.primary" sx={{ display: 'flex', alignItems: 'center' }}>
          <MdSchool style={{ marginRight: 4 }} />
          學習中心
        </Typography>
      </Breadcrumbs>

      {/* 頁面標題 */}
      <Typography variant="h3" component="h1" gutterBottom>
        <MdSchool style={{ marginRight: 8, verticalAlign: 'middle' }} />
        學習中心
      </Typography>
      
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        探索各種學習資源和練習專案
      </Typography>

      {/* 導航標籤 */}
      <Paper sx={{ mb: 4 }}>
        <Tabs 
          value={currentTab} 
          variant="scrollable" 
          scrollButtons="auto"
          sx={{ borderBottom: 1, borderColor: 'divider' }}
        >
          <Tab 
            component={Link} 
            to="/learn" 
            value="index" 
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
          {/* 未來可以加入更多標籤 */}
        </Tabs>
      </Paper>

      {/* 子路由內容 */}
      <Box>
        <Outlet />
      </Box>
    </Container>
  );
} 