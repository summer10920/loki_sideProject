import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Todo, selectAllTodos, selectTodoState } from './_state/todo.selectors';
import * as TodoActions from './_state/todo.actions';

@Component({
  selector: 'loki-todo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})
export class TodoComponent implements OnInit {
  todos$: Observable<Todo[]>;
  newTodo = '';
  editingTodo: Todo | null = null;
  editingText = '';

  constructor(private store: Store) {
    this.todos$ = this.store.select(selectAllTodos);
    
    // Debug: 監聽整個 feature state
    this.store.select(selectTodoState).subscribe(state => {
      console.log('Todo Feature State:', state);
    });
  }

  ngOnInit() {
    console.log('TodoComponent initialized');
  }

  addTodo() {
    if (this.newTodo.trim()) {
      this.store.dispatch(TodoActions.addTodo({ text: this.newTodo.trim() }));
      this.newTodo = '';
    }
  }

  deleteTodo(id: number) {
    this.store.dispatch(TodoActions.deleteTodo({ id }));
  }

  toggleComplete(todo: Todo) {
    this.store.dispatch(TodoActions.toggleTodo({ id: todo.id }));
  }

  editTodo(todo: Todo) {
    this.editingTodo = todo;
    this.editingText = todo.text;
  }

  updateTodo() {
    if (this.editingTodo && this.editingText.trim()) {
      this.store.dispatch(
        TodoActions.updateTodo({
          id: this.editingTodo.id,
          text: this.editingText.trim(),
        })
      );
      this.cancelEdit();
    }
  }

  cancelEdit() {
    this.editingTodo = null;
    this.editingText = '';
  }
}
