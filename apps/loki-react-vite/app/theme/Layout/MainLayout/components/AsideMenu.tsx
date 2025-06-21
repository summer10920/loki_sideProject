import { Link, useMatches } from 'react-router';
import { useState } from 'react';
import React from 'react';
import { FaChevronDown, FaChevronRight } from 'react-icons/fa';
import { menuConfig } from '../config/menu.config';

// Types
interface MenuItemProps {
  item: (typeof menuConfig)[0];
  currentPath: string;
  isSidebarOpen: boolean;
  openSubmenus: Set<string>;
  onToggleSubmenu: (path: string, event: React.MouseEvent) => void;
  onNavigate: (path: string, event: React.MouseEvent) => void;
}

// Sub-components
// -------------------------------------------------------------------------------------------
const SimpleMenuItem = ({
  item,
  currentPath,
  isSidebarOpen,
  onNavigate,
}: MenuItemProps) => (
  <Link
    to={item.path}
    onClick={(e) => onNavigate(item.path, e)}
    className={`p-4 hover:bg-gray-300 dark:hover:bg-gray-600 flex items-center gap-2 overflow-hidden whitespace-nowrap ${
      currentPath === item.path ? 'bg-gray-200 dark:bg-gray-700' : ''
    }`}
  >
    {item.icon && <item.icon className="h-6" />}
    {isSidebarOpen && <span>{item.label}</span>}
  </Link>
);

const MenuItemWithChildren = ({
  item,
  currentPath,
  isSidebarOpen,
  openSubmenus,
  onToggleSubmenu,
  onNavigate,
}: MenuItemProps) => (
  <div>
    <div
      className="cursor-pointer p-4 hover:bg-gray-300 dark:hover:bg-gray-600 flex items-center gap-2 overflow-hidden whitespace-nowrap"
      onClick={(e) => isSidebarOpen && onToggleSubmenu(item.path, e)}
    >
      {item.icon && <item.icon className="h-6" />}
      {isSidebarOpen && (
        <>
          <span>{item.label}</span>
          {openSubmenus.has(item.path) ? (
            <FaChevronDown className="ml-auto" />
          ) : (
            <FaChevronRight className="ml-auto" />
          )}
        </>
      )}
    </div>

    {isSidebarOpen && openSubmenus.has(item.path) && (
      <ul className="mt-1 space-y-1">
        {item.children?.map((child) => (
          <li key={child.path} className="submenu-item">
            <Link
              to={child.path}
              onClick={(e) => onNavigate(child.path, e)}
              className={`block p-4 hover:bg-gray-300 dark:hover:bg-gray-600 before:content-[''] before:w-6 before:inline-block ${
                currentPath === child.path ? 'bg-gray-200 dark:bg-gray-700' : ''
              }`}
            >
              {child.label}
            </Link>
          </li>
        ))}
      </ul>
    )}
  </div>
);

// Main component
// -------------------------------------------------------------------------------------------
export const AsideMenu = () => {
  // Hooks
  const matches = useMatches();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [openSubmenus, setOpenSubmenus] = useState<Set<string>>(new Set());

  // Computed values
  const currentPath = matches[matches.length - 1]?.pathname || '';

  // Event handlers
  // -------------------------------------------------------------------------------------------
  const handleToggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleToggleSubmenu = (path: string, event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();

    setOpenSubmenus((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(path)) {
        newSet.delete(path);
      } else {
        newSet.add(path);
      }
      return newSet;
    });
  };

  const handleNavigate = (path: string, event: React.MouseEvent) => {
    if (event.currentTarget.closest('.submenu-item')) {
      return;
    }
  };

  const handleKeyUp = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      handleToggleSidebar();
    }
  };

  // Render
  // -------------------------------------------------------------------------------------------
  return (
    <aside
      className={`${
        isSidebarOpen ? 'w-64' : 'w-[52px]'
      } bg-white dark:bg-gray-800 transition-all duration-300 ease-in-out shadow-md relative`}
      onClick={handleToggleSidebar}
      onKeyUp={handleKeyUp}
      tabIndex={0}
    >
      <nav>
        <ul>
          {menuConfig.map((item) => (
            <li key={item.path}>
              {!item.children ? (
                <SimpleMenuItem
                  item={item}
                  currentPath={currentPath}
                  isSidebarOpen={isSidebarOpen}
                  openSubmenus={openSubmenus}
                  onToggleSubmenu={handleToggleSubmenu}
                  onNavigate={handleNavigate}
                />
              ) : (
                <MenuItemWithChildren
                  item={item}
                  currentPath={currentPath}
                  isSidebarOpen={isSidebarOpen}
                  openSubmenus={openSubmenus}
                  onToggleSubmenu={handleToggleSubmenu}
                  onNavigate={handleNavigate}
                />
              )}
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};
