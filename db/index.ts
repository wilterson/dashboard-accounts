import { Database } from 'sqlite3';

let db: Database;

export function connectToDb() {
  if (!db) {
    db = new Database('./database.sqlite3');
  }

  return db;
}

export function getAllFromTable(tableName: string): Promise<any[]> {
  return new Promise((resolve, reject) => {
    const db = connectToDb();
    db.all(`SELECT * FROM ${tableName}`, [], (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
}
