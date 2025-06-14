import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { toSignal } from '@angular/core/rxjs-interop';
import { Todo, selectAllTodos, selectTodoState } from './_state/todo.selectors';
import * as TodoActions from './_state/todo.actions';

// Material 模組
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'loki-todo',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
    MatListModule,
    MatFormFieldModule
  ],
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})
export class TodoComponent implements OnInit {
  private store = inject(Store);
  
  todos = toSignal(this.store.select(selectAllTodos), { initialValue: [] as Todo[] });
  newTodo = signal('');
  editingTodo = signal<Todo | null>(null);
  editingText = signal('');

  ngOnInit() {
    console.log('TodoComponent initialized');
    
    // Debug: 監聽整個 feature state
    this.store.select(selectTodoState).subscribe(state => {
      console.log('Todo Feature State:', state);
    });
  }

  addTodo() {
    const todoText = this.newTodo();
    if (todoText.trim()) {
      this.store.dispatch(TodoActions.addTodo({ text: todoText.trim() }));
      this.newTodo.set('');
    }
  }

  deleteTodo(id: number) {
    this.store.dispatch(TodoActions.deleteTodo({ id }));
  }

  toggleComplete(todo: Todo) {
    this.store.dispatch(TodoActions.toggleTodo({ id: todo.id }));
  }

  editTodo(todo: Todo) {
    this.editingTodo.set(todo);
    this.editingText.set(todo.text);
  }

  updateTodo() {
    const currentEditingTodo = this.editingTodo();
    const currentEditingText = this.editingText();
    
    if (currentEditingTodo && currentEditingText.trim()) {
      this.store.dispatch(
        TodoActions.updateTodo({
          id: currentEditingTodo.id,
          text: currentEditingText.trim(),
        })
      );
      this.cancelEdit();
    }
  }

  cancelEdit() {
    this.editingTodo.set(null);
    this.editingText.set('');
  }
}
