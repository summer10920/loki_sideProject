import { Routes } from '@angular/router';
import { provideTodoState } from './pages/todo/_state/todo.state';

export const LearnRoutes: Routes = [
  {
    path: 'todo',
    loadComponent: () =>
      import('./pages/todo/todo.component').then((m) => m.TodoComponent),
    providers: [provideTodoState()],
  },
  {
    path: 'profile',
    loadComponent: () =>
      import('./pages/profile/profile.component').then((m) => m.ProfileComponent),
  },
  {
    path: 'tasks',
    loadComponent: () =>
      import('./pages/tasks/tasks.component').then((m) => m.TasksComponent),
  },
  { path: '', redirectTo: 'todo', pathMatch: 'full' },
];
