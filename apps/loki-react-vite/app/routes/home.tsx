import { Link } from 'react-router';
import {
  Button,
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
} from '@mui/material';
import { MdExplore, MdInfo, MdDashboard, MdSchool } from 'react-icons/md';
import { useTheme } from '@mui/material/styles';

export function Home() {
  const muiTheme = useTheme();

  return (
    <div>
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-8 rounded-lg shadow-lg max-w-4xl mx-auto mt-8">
        <h1 className="text-4xl font-bold mb-4 loki">
          <span className="block text-yellow-300 text-2xl font-normal mb-2">
            Hello there,
          </span>
          Welcome loki-react-vite 👋
        </h1>
        <div className="mt-6 p-4 bg-white/20 rounded-md backdrop-blur-sm">
          <p className="text-lg">
            <span role="img" aria-label="慶祝">
              🎉
            </span>{' '}
            如果你看到漂亮的漸層背景和樣式，Tailwind v4 就成功運作了！
          </p>
          <button className="mt-4 bg-white text-blue-600 px-6 py-2 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-200">
            測試按鈕
          </button>
        </div>

        {/* MUI 元件區域 */}
        <Box sx={{ mt: 4 }}>
          <Typography
            variant="h4"
            component="h2"
            gutterBottom
            sx={{ color: 'white' }}
          >
            <span role="img" aria-label="調色盤">
              🎨
            </span>{' '}
            MUI + Tailwind 整合展示
          </Typography>

          <Grid container spacing={3} sx={{ mt: 2 }}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <MdSchool
                      style={{
                        marginRight: 8,
                        color: muiTheme.palette.success.main,
                      }}
                    />
                    <Typography variant="h6">學習中心</Typography>
                  </Box>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 2 }}
                  >
                    探索各種學習專案和練習，包括 Todo 應用、JavaScript 基礎等。
                  </Typography>
                  <Button
                    component={Link}
                    to="/learn"
                    variant="contained"
                    color="success"
                    startIcon={<MdSchool />}
                    fullWidth
                  >
                    開始學習
                  </Button>
                </CardContent>
              </Card>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <MdDashboard
                      style={{
                        marginRight: 8,
                        color: muiTheme.palette.primary.main,
                      }}
                    />
                    <Typography variant="h6">MUI 元件</Typography>
                  </Box>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 2 }}
                  >
                    探索 Material-UI 的豐富元件庫，包括按鈕、卡片、表單等等。
                  </Typography>
                  <Button
                    component={Link}
                    to="/mui-demo"
                    variant="contained"
                    startIcon={<MdExplore />}
                    fullWidth
                  >
                    查看 MUI 示範
                  </Button>
                </CardContent>
              </Card>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <MdInfo
                      style={{
                        marginRight: 8,
                        color: muiTheme.palette.secondary.main,
                      }}
                    />
                    <Typography variant="h6">關於頁面</Typography>
                  </Box>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 2 }}
                  >
                    了解更多關於這個專案的技術架構和特色功能。
                  </Typography>
                  <Button
                    component={Link}
                    to="/about"
                    variant="outlined"
                    fullWidth
                  >
                    了解更多
                  </Button>
                </CardContent>
              </Card>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    技術堆疊
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    • React Router v7
                    <br />
                    • Tailwind CSS v4
                    <br />
                    • Material-UI v7
                    <br />
                    • TypeScript
                    <br />• Vite
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </div>
    </div>
  );
}

export default Home;
