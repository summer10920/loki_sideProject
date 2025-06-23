import { FaHome, FaInfoCircle, FaGraduationCap } from 'react-icons/fa';
import { IconType } from 'react-icons/lib';

interface MenuConfig {
  label: string;
  path: string;
  icon?: IconType;
  children?: MenuConfig[];
}

export const menuConfig: MenuConfig[] = [
  {
    label: '首頁',
    path: '/',
    icon: FaHome,
  },
  {
    label: '關於',
    path: '/about',
    icon: FaInfoCircle,
  },
  {
    label: '學習專區',
    path: '/learn',
    icon: FaGraduationCap,
    children: [
      {
        label: 'Todo 清單',
        path: '/learn/todo',
      },
    ],
  },
];
