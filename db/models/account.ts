import { connectToDb } from '..';

export enum AccountType {
  SAVINGS = 'savings',
  CHECKING = 'checking'
}

export interface Account {
  id: number;
  type: string;
  balance: number;
  userId: number;
  createdAt: Date;
}

export async function getUserAccounts(
  userId: string
): Promise<Account[] | unknown[]> {
  const db = connectToDb();

  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM accounts WHERE userId = ?', [userId], (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
}
