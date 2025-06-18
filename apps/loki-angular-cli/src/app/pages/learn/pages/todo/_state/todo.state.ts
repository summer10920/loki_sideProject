import { provideState } from '@ngrx/store';
import { todoReducer } from './todo.reducer';

export interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export interface TodoState {
  todos: Todo[];
}

export const initialTodoState: TodoState = {
  todos: [{ id: 1, text: 'Hello, world!', completed: false }],
};

export const provideTodoState = () =>
  provideState('todo', todoReducer, {
    initialState: initialTodoState
  }); 