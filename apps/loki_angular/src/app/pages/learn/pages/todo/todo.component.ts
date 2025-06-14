import {
  Component,
  OnInit,
  inject,
  signal,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TodoFacade } from './_state/todo.facade';
import { Todo } from './_state/todo.selectors';

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
  private todoFacade = inject(TodoFacade);

  @ViewChild('todoInput') todoInput!: ElementRef<HTMLInputElement>;

  // 從 facade 獲取狀態
  readonly todos = this.todoFacade.todos;
  readonly completedCount = this.todoFacade.completedCount;
  readonly totalTodos = this.todoFacade.totalTodos;
  readonly activeTodos = this.todoFacade.activeTodos;

  // Component 本地狀態
  inputTodo = signal('');
  editingTodo = signal<Todo | null>(null);

  // life cycle
  // ------------------------------------------------------------
  ngOnInit() {
    console.log('TodoComponent initialized');
    // 使用 facade 的 debug 方法
    this.todoFacade.logState();
  }

  // event handler
  // ------------------------------------------------------------
  submitTodo() {
    const todoText = this.inputTodo();
    if (!todoText.trim()) return;

    const currentEditingTodo = this.editingTodo();
    if (currentEditingTodo) {
      this.todoFacade.updateTodo(currentEditingTodo.id, todoText);
      this.editingTodo.set(null);
    } else {
      this.todoFacade.addTodo(todoText);
    }
    this.inputTodo.set('');
  }

  deleteTodo(id: number) {
    this.todoFacade.deleteTodo(id);
  }

  toggleComplete(todo: Todo) {
    this.todoFacade.toggleTodo(todo.id);
  }

  editTodo(todo: Todo) {
    this.editingTodo.set(todo);
    this.inputTodo.set(todo.text);
    
    setTimeout(() => {
      this.todoInput?.nativeElement.focus();
      this.todoInput?.nativeElement.select();
    });
  }

  cancelEdit() {
    this.editingTodo.set(null);
    this.inputTodo.set('');
  }

  clearCompleted() {
    this.todoFacade.clearCompleted();
  }
}
