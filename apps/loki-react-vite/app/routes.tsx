import {
  type RouteConfig,
  RouteConfigEntry,
  index,
  route,
} from '@react-router/dev/routes';
import { MenuItem, menuConfig } from './theme/config/menu';

function processRoute(item: MenuItem, routes: RouteConfigEntry[]) {
  if (item.children && item.children.length > 0) {
    // 處理有子路由的項目
    const childRoutes: RouteConfigEntry[] = [];
    
    item.children.forEach((child) => {
      if (child.component) {
        if (child.path === item.path) {
          // 這是 index 路由
          childRoutes.push(index(child.component));
        } else {
          // 這是子路由
          const childPath = child.path.replace(item.path + '/', '');
          childRoutes.push(route(childPath, child.component));
        }
      }
    });
    
    // 確保 component 存在才創建路由
    if (item.component) {
      routes.push(route(item.path.substring(1), item.component, childRoutes));
    }
  } else if (item.component) {
    // 處理沒有子路由的項目
    routes.push(
      item.path === '/'
        ? index(item.component)
        : route(item.path.substring(1), item.component)
    );
  }
}

const generateRoutes = () => {
  const routes: RouteConfigEntry[] = [];

  menuConfig.forEach((item) => processRoute(item, routes));
  routes.push(route('*', './routes/404.tsx'));

  return routes;
};

export default generateRoutes() satisfies RouteConfig;

// export default [
//   index('./app.tsx'),
//   route('about', './routes/about.tsx'),
//   route('learn', './routes/learn.tsx', [
//     route('todo', './routes/learn/todo.tsx'),
//   ]),
//   // Catch-all route for unmatched paths (like DevTools requests)
//   route('*', './routes/404.tsx'),
// ] satisfies RouteConfig;
