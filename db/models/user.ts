import { connectToDb } from '../';

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

export async function getUsers(): Promise<User[] | unknown[]> {
  const db = connectToDb();

  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM users', (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
}

export async function getUser(id: number): Promise<User[] | unknown[]> {
  const db = connectToDb();

  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM users WHERE id = ?', [id], (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
}
