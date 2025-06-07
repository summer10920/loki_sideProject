import { createReducer, on } from '@ngrx/store';
import { initialTodoState, TodoState } from './todo.state';
import * as TodoActions from './todo.actions';

let nextId = 2;

export const todoReducer = createReducer<TodoState>(
  initialTodoState,
  on(TodoActions.addTodo, (state, { text }) => ({
    ...state,
    todos: [
      ...state.todos,
      { id: nextId++, text, completed: false },
    ],
  })),
  on(TodoActions.deleteTodo, (state, { id }) => ({
    ...state,
    todos: state.todos.filter(todo => todo.id !== id),
  })),
  on(TodoActions.toggleTodo, (state, { id }) => ({
    ...state,
    todos: state.todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ),
  })),
  on(TodoActions.updateTodo, (state, { id, text }) => ({
    ...state,
    todos: state.todos.map(todo =>
      todo.id === id ? { ...todo, text } : todo
    ),
  })),
); 