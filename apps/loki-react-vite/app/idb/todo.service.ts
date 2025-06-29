import { databaseService } from './database.service';
import { Todo } from './model';

class TodoService {
  async getAllTodos(): Promise<Todo[]> {
    const db = await databaseService.getDB();
    return db.getAll('todos');
  }

  async getTodo(id: number): Promise<Todo | undefined> {
    const db = await databaseService.getDB();
    return db.get('todos', id);
  }

  async addTodo(
    todo: Omit<Todo, 'id' | 'createdAt' | 'updatedAt' | 'synced'>
  ): Promise<Todo> {
    const db = await databaseService.getDB();
    const newTodo: Todo = {
      ...todo,
      id: Date.now(),
      createdAt: new Date(),
      updatedAt: new Date(),
      synced: false,
    };

    await db.add('todos', newTodo);
    return newTodo;
  }

  async updateTodo(id: number, updates: Partial<Todo>): Promise<Todo | null> {
    const db = await databaseService.getDB();
    const existingTodo = await db.get('todos', id);

    if (!existingTodo) return null;

    const updatedTodo: Todo = {
      ...existingTodo,
      ...updates,
      updatedAt: new Date(),
      synced: false, // 標記為未同步
    };

    await db.put('todos', updatedTodo);
    return updatedTodo;
  }

  async deleteTodo(id: number): Promise<boolean> {
    const db = await databaseService.getDB();
    const existingTodo = await db.get('todos', id);

    if (!existingTodo) return false;

    await db.delete('todos', id);
    return true;
  }

  async getUnsyncedTodos(): Promise<Todo[]> {
    const db = await databaseService.getDB();
    return db.getAllFromIndex('todos', 'by-synced', IDBKeyRange.only(false));
  }

  async markAsSynced(ids: number[]): Promise<void> {
    const db = await databaseService.getDB();
    const tx = db.transaction('todos', 'readwrite');

    await Promise.all(
      ids.map(async (id) => {
        const todo = await tx.store.get(id);
        if (todo) {
          await tx.store.put({ ...todo, synced: true });
        }
      })
    );

    await tx.done;
  }
}

export const todoService = new TodoService();
