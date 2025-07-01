import { type RouteConfig, index, route } from '@react-router/dev/routes';

export default [
  index('./routes/home.tsx'),
  route('about', './routes/about.tsx'),
  
  // Learn 路由群組
  route('learn', './routes/learn/layout.tsx', [
    index('./routes/learn/index.tsx'),
    route('todo', './routes/learn/todo/index.tsx'),
    // 未來可以加入更多學習相關路由
    // route('javascript', './routes/learn/javascript.tsx'),
    // route('typescript', './routes/learn/typescript.tsx'),
  ]),
  
  // Catch-all route for unmatched paths (like DevTools requests)
  route('*', './routes/404.tsx'),
] satisfies RouteConfig;
