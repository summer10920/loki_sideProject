export interface MenuItem {
  label: string;
  icon?: string;
  routePath?: string;
  children?: MenuItem[];
  iconClassName?: string;
}

export const MenuConfig: MenuItem[] = [
  {
    label: 'Home',
    icon: 'faHouse',
    routePath: '/home',
    iconClassName: 'text-blue-500 dark:text-blue-300',
  },
  {
    label: 'Mini Learning',
    icon: 'faCoffee',
    iconClassName: 'text-amber-600 dark:text-amber-300',
    children: [
      {
        label: 'Todo List',
        routePath: '/profile',
        iconClassName: 'text-green-600 dark:text-green-300',
      },
      {
        label: 'Tasks',
        routePath: '/tasks',
        iconClassName: 'text-pink-600 dark:text-pink-300',
      },
    ],
  },
];
