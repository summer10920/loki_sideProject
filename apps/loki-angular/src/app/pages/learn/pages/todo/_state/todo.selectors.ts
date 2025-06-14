import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TodoState } from './todo.state';

export const selectTodoState = createFeatureSelector<TodoState>('todo');

export const selectAllTodos = createSelector(
  selectTodoState,
  (state) => state.todos
);

export * from './todo.state'; 