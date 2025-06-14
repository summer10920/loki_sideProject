import { Injectable, inject, computed } from '@angular/core';
import { Store } from '@ngrx/store';
import { toSignal } from '@angular/core/rxjs-interop';
import { Todo, selectAllTodos, selectTodoState } from './todo.selectors';
import * as TodoActions from './todo.actions';

@Injectable({
  providedIn: 'root',
})
export class TodoFacade {
  private store = inject(Store);

  // State Signals
  private todosSignal = toSignal(this.store.select(selectAllTodos), {
    initialValue: [] as Todo[],
  });

  private todoStateSignal = toSignal(this.store.select(selectTodoState), {
    initialValue: null,
  });

  // Public readonly state
  readonly todos = this.todosSignal;
  readonly todoState = this.todoStateSignal;

  // Computed values
  readonly completedTodos = computed(() =>
    this.todosSignal().filter((todo) => todo.completed)
  );

  readonly activeTodos = computed(() =>
    this.todosSignal().filter((todo) => !todo.completed)
  );

  readonly totalTodos = computed(() => this.todosSignal().length);

  readonly completedCount = computed(() => this.completedTodos().length);

  // Actions
  addTodo(text: string) {
    if (!text.trim()) return;
    this.store.dispatch(TodoActions.addTodo({ text: text.trim() }));
  }

  deleteTodo(id: number) {
    this.store.dispatch(TodoActions.deleteTodo({ id }));
  }

  toggleTodo(id: number) {
    this.store.dispatch(TodoActions.toggleTodo({ id }));
  }

  updateTodo(id: number, text: string) {
    if (!text.trim()) return;
    this.store.dispatch(TodoActions.updateTodo({ id, text: text.trim() }));
  }

  // Utility methods
  getTodoById(id: number): Todo | undefined {
    return this.todosSignal().find((todo) => todo.id === id);
  }

  clearCompleted() {
    const completedIds = this.completedTodos().map((todo) => todo.id);
    completedIds.forEach((id) => this.deleteTodo(id));
  }

  // Debug method
  logState() {
    console.log('Todo State:', this.todoStateSignal());
    console.log('Todos:', this.todosSignal());
    console.log('Total:', this.totalTodos());
    console.log('Completed:', this.completedCount());
  }
}
