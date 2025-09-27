import * as SQLite from 'expo-sqlite/legacy';

export class DatabaseService {
  private db: SQLite.WebSQLDatabase;

  constructor() {
    this.db = SQLite.openDatabase('restaurant.db');
    this.initializeTables();
  }

  private initializeTables() {
    // Tabla de productos del menú
    this.db.transaction((tx) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS menu_items (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          description TEXT,
          price REAL NOT NULL,
          category TEXT,
          available BOOLEAN DEFAULT 1,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );`
      );

      // Tabla de pedidos
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS orders (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          table_number INTEGER,
          total_amount REAL,
          status TEXT DEFAULT 'pending',
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );`
      );

      // Tabla de items del pedido
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS order_items (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          order_id INTEGER,
          menu_item_id INTEGER,
          quantity INTEGER,
          unit_price REAL,
          total_price REAL,
          FOREIGN KEY (order_id) REFERENCES orders (id),
          FOREIGN KEY (menu_item_id) REFERENCES menu_items (id)
        );`
      );

      // Tabla de inventario
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS inventory (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          category TEXT,
          quantity INTEGER DEFAULT 0,
          unit TEXT,
          min_quantity INTEGER DEFAULT 0,
          cost_per_unit REAL,
          supplier TEXT,
          last_updated DATETIME DEFAULT CURRENT_TIMESTAMP
        );`
      );

      // Tabla de pagos
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS payments (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          order_id INTEGER,
          amount REAL NOT NULL,
          payment_method TEXT,
          status TEXT DEFAULT 'completed',
          transaction_date DATETIME DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (order_id) REFERENCES orders (id)
        );`
      );
    });
  }

  // Métodos para el menú
  addMenuItem(name: string, description: string, price: number, category: string) {
    return new Promise<number>((resolve, reject) => {
      this.db.transaction((tx) => {
        tx.executeSql(
          'INSERT INTO menu_items (name, description, price, category) VALUES (?, ?, ?, ?)',
          [name, description, price, category],
          (_, result) => resolve(result.insertId!),
          (_, error) => {
            reject(error);
            return false;
          }
        );
      });
    });
  }

  getMenuItems() {
    return new Promise<any[]>((resolve, reject) => {
      this.db.transaction((tx) => {
        tx.executeSql(
          'SELECT * FROM menu_items WHERE available = 1 ORDER BY category, name',
          [],
          (_, { rows }) => resolve(rows._array),
          (_, error) => {
            reject(error);
            return false;
          }
        );
      });
    });
  }

  // Métodos para pedidos
  createOrder(tableNumber: number, totalAmount: number) {
    return new Promise<number>((resolve, reject) => {
      this.db.transaction((tx) => {
        tx.executeSql(
          'INSERT INTO orders (table_number, total_amount) VALUES (?, ?)',
          [tableNumber, totalAmount],
          (_, result) => resolve(result.insertId!),
          (_, error) => {
            reject(error);
            return false;
          }
        );
      });
    });
  }

  getOrders(status?: string) {
    return new Promise<any[]>((resolve, reject) => {
      const query = status 
        ? 'SELECT * FROM orders WHERE status = ? ORDER BY created_at DESC'
        : 'SELECT * FROM orders ORDER BY created_at DESC';
      const params = status ? [status] : [];

      this.db.transaction((tx) => {
        tx.executeSql(
          query,
          params,
          (_, { rows }) => resolve(rows._array),
          (_, error) => {
            reject(error);
            return false;
          }
        );
      });
    });
  }

  // Métodos para inventario
  addInventoryItem(name: string, category: string, quantity: number, unit: string, costPerUnit: number) {
    return new Promise<number>((resolve, reject) => {
      this.db.transaction((tx) => {
        tx.executeSql(
          'INSERT INTO inventory (name, category, quantity, unit, cost_per_unit) VALUES (?, ?, ?, ?, ?)',
          [name, category, quantity, unit, costPerUnit],
          (_, result) => resolve(result.insertId!),
          (_, error) => {
            reject(error);
            return false;
          }
        );
      });
    });
  }

  getInventoryItems() {
    return new Promise<any[]>((resolve, reject) => {
      this.db.transaction((tx) => {
        tx.executeSql(
          'SELECT * FROM inventory ORDER BY category, name',
          [],
          (_, { rows }) => resolve(rows._array),
          (_, error) => {
            reject(error);
            return false;
          }
        );
      });
    });
  }

  getLowStockItems() {
    return new Promise<any[]>((resolve, reject) => {
      this.db.transaction((tx) => {
        tx.executeSql(
          'SELECT * FROM inventory WHERE quantity <= min_quantity ORDER BY quantity ASC',
          [],
          (_, { rows }) => resolve(rows._array),
          (_, error) => {
            reject(error);
            return false;
          }
        );
      });
    });
  }
}