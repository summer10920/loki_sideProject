import { type RouteConfig, index, route } from '@react-router/dev/routes';

export default [
  index('./app.tsx'),
  route('about', './routes/about.tsx'),
  // Catch-all route for unmatched paths (like DevTools requests)
  route('*', './routes/404.tsx'),
] satisfies RouteConfig;
