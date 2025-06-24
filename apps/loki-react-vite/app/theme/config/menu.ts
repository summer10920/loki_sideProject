import { FaHome, FaInfoCircle, FaGraduationCap } from 'react-icons/fa';
import { IconType } from 'react-icons/lib';

export interface MenuItem {
  label: string;
  component?: string;
  path: string;
  icon?: IconType;
  children?: MenuItem[];
}

export const menuConfig: MenuItem[] = [
  {
    label: '首頁',
    component: './app.tsx',
    path: '/',
    icon: FaHome,
  },
  {
    label: '關於',
    component: './routes/about.tsx',
    path: '/about',
    icon: FaInfoCircle,
  },
  {
    label: '學習專區',
    component: './routes/learn.tsx',
    path: '/learn',
    icon: FaGraduationCap,
    children: [
      {
        label: 'Todo 清單',
        component: './routes/learn/todo.tsx',
        path: '/learn/todo',
      },
    ],
  },
];
