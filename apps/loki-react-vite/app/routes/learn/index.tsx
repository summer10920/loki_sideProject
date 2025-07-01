import { Link } from 'react-router';
import {
  Grid,
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Chip,
  Box,
} from '@mui/material';
import { MdCheckBox, MdCode, MdWeb, MdArrowForward } from 'react-icons/md';

export default function LearnIndex() {
  const learningProjects = [
    {
      id: 'todo',
      title: 'Todo 應用程式',
      description:
        '學習如何建立一個功能完整的待辦事項應用程式，包括 CRUD 操作、狀態管理和本地儲存。',
      path: '/learn/todo',
      icon: <MdCheckBox />,
      difficulty: '初級',
      tags: ['React', 'State Management', 'Local Storage'],
      color: 'primary',
    },
    {
      id: 'javascript',
      title: 'JavaScript 基礎',
      description:
        '深入了解 JavaScript 的核心概念，包括變數、函數、物件和原型鏈。',
      path: '/learn/javascript',
      icon: <MdCode />,
      difficulty: '初級',
      tags: ['JavaScript', 'ES6+', 'Fundamentals'],
      color: 'warning',
      comingSoon: true,
    },
    {
      id: 'typescript',
      title: 'TypeScript 進階',
      description: '掌握 TypeScript 的進階功能，包括泛型、裝飾器和型別推斷。',
      path: '/learn/typescript',
      icon: <MdWeb />,
      difficulty: '中級',
      tags: ['TypeScript', 'Generic', 'Type System'],
      color: 'info',
      comingSoon: true,
    },
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case '初級':
        return 'success';
      case '中級':
        return 'warning';
      case '高級':
        return 'error';
      default:
        return 'default';
    }
  };

  return (
    <Box>
      <Typography variant="h4" component="h2" gutterBottom>
        學習專案
      </Typography>

      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        透過實作練習來提升您的開發技能
      </Typography>

      <Grid container spacing={3}>
        {learningProjects.map((project) => (
          <Grid key={project.id} size={{ xs: 12, md: 6, lg: 4 }}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                ...(project.comingSoon && {
                  opacity: 0.7,
                  '&::after': {
                    content: '"即將推出"',
                    position: 'absolute',
                    top: 16,
                    right: 16,
                    backgroundColor: 'grey.400',
                    color: 'white',
                    padding: '4px 8px',
                    borderRadius: 1,
                    fontSize: '0.75rem',
                    fontWeight: 'bold',
                  },
                }),
              }}
            >
              <CardContent sx={{ flexGrow: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Box
                    sx={{
                      mr: 2,
                      color: `${project.color}.main`,
                      fontSize: '2rem',
                    }}
                  >
                    {project.icon}
                  </Box>
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" component="h3">
                      {project.title}
                    </Typography>
                    <Chip
                      label={project.difficulty}
                      size="small"
                      color={getDifficultyColor(project.difficulty)}
                      sx={{ mt: 0.5 }}
                    />
                  </Box>
                </Box>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 2 }}
                >
                  {project.description}
                </Typography>

                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {project.tags.map((tag) => (
                    <Chip
                      key={tag}
                      label={tag}
                      size="small"
                      variant="outlined"
                    />
                  ))}
                </Box>
              </CardContent>

              <CardActions>
                {project.comingSoon ? (
                  <Button disabled size="small">
                    即將推出
                  </Button>
                ) : (
                  <Button
                    component={Link}
                    to={project.path}
                    size="small"
                    color={project.color as any}
                    endIcon={<MdArrowForward />}
                  >
                    開始學習
                  </Button>
                )}
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
