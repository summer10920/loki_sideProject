import {
  Component,
  OnInit,
  inject,
  signal,
  computed,
  ViewChild,
  ElementRef,
} from '@angular/core';
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
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'loki-todo',
  standalone: true,
  imports: [
    FormsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
    MatFormFieldModule,
  ],
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})
export class TodoComponent implements OnInit {
  private store = inject(Store);

  @ViewChild('todoInput') todoInput!: ElementRef<HTMLInputElement>;

  todos = toSignal(this.store.select(selectAllTodos), {
    initialValue: [] as Todo[],
  });

  inputTodo = signal('');
  editingTodo = signal<Todo | null>(null);
  editingText = signal('');

  // life cycle
  // ------------------------------------------------------------
  ngOnInit() {
    console.log('TodoComponent initialized');

    // Debug: 監聽整個 feature state
    this.store.select(selectTodoState).subscribe((state) => {
      console.log('Todo Feature State:', state);
    });
  }

  // event handler
  // ------------------------------------------------------------
  submitTodo() {
    const todoText = this.inputTodo();
    if (!todoText.trim()) return;
    const hasEditingTodo = this.editingTodo()?.id;

    if (hasEditingTodo) {
      this.store.dispatch(
        TodoActions.updateTodo({
          id: hasEditingTodo,
          text: todoText.trim(),
        })
      );
      this.editingTodo.set(null);
    } else {
      this.store.dispatch(TodoActions.addTodo({ text: todoText.trim() }));
    }
    this.inputTodo.set('');
  }

  deleteTodo(id: number) {
    this.store.dispatch(TodoActions.deleteTodo({ id }));
  }

  toggleComplete(todo: Todo) {
    this.store.dispatch(TodoActions.toggleTodo({ id: todo.id }));
  }

  editTodo(todo: Todo) {
    this.editingTodo.set(todo);
    this.inputTodo.set(todo.text);
    this.todoInput?.nativeElement.focus();
  }
}
