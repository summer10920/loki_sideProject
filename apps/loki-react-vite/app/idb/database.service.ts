import { openDB, DBSchema, IDBPDatabase } from 'idb';
import { Todo } from './model';

interface LokiDBSchema extends DBSchema {
  todos: {
    key: number;
    value: Todo;
    indexes: {
      'by-completed': 'completed';
      'by-created': 'createdAt';
      'by-synced': 'synced';
    };
  };
}

class DatabaseService {
  private db: IDBPDatabase<LokiDBSchema> | null = null;
  private readonly DB_NAME = 'LokiSideProjectDB';
  private readonly DB_VERSION = 1;

  async init(): Promise<IDBPDatabase<LokiDBSchema>> {
    if (this.db) return this.db;

    this.db = await openDB<LokiDBSchema>(this.DB_NAME, this.DB_VERSION, {
      upgrade(db) {
        // 建立 todos 物件儲存
        const todoStore = db.createObjectStore('todos', {
          keyPath: 'id',
        });

        // 建立索引
        todoStore.createIndex('by-completed', 'completed');
        todoStore.createIndex('by-created', 'createdAt');
        todoStore.createIndex('by-synced', 'synced');
      },
    });

    return this.db;
  }

  async getDB(): Promise<IDBPDatabase<LokiDBSchema>> {
    if (!this.db) {
      await this.init();
    }
    if (!this.db) {
      throw new Error('Failed to initialize database');
    }
    return this.db;
  }
}

export const databaseService = new DatabaseService();
