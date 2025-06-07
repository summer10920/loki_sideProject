import { createAction, props } from '@ngrx/store';

export const addTodo = createAction('[Todo] Add', props<{ text: string }>());
export const deleteTodo = createAction('[Todo] Delete', props<{ id: number }>());
export const toggleTodo = createAction('[Todo] Toggle', props<{ id: number }>());
export const updateTodo = createAction('[Todo] Update', props<{ id: number; text: string }>()); 