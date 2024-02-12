import { Database } from 'sqlite3';
import { connectToDb } from '..';

export enum TransactionType {
  DEPOSIT = 'deposit',
  WITHDRAW = 'withdraw',
  TRANSFER = 'transfer'
}

export type Transaction = {
  id: number;
  type: TransactionType;
  amount: number;
  date: Date;
  accountId: number;
  toAccountId?: number;
};

export async function getUserTransactions(
  userId: string
): Promise<Transaction[] | unknown[]> {
  const db = connectToDb();

  const accountsIds: number[] = await new Promise((resolve, reject) => {
    db.all(
      'SELECT id FROM accounts WHERE userId = ?',
      [userId],
      (err, rows: Transaction[]) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows.map((row) => row.id));
        }
      }
    );
  });

  return new Promise((resolve, reject) => {
    db.all(
      `SELECT * FROM transactions WHERE accountId IN (${accountsIds.join(',')})`,
      (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      }
    );
  });
}

export async function getTransactionsFromAccount(
  accountId: number
): Promise<Transaction[] | unknown[]> {
  const db = connectToDb();

  return new Promise((resolve, reject) => {
    db.all(
      'SELECT * FROM transactions WHERE accountId = ?',
      [accountId],
      (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      }
    );
  });
}

async function depositFunds(db: Database, accountId: number, amount: number) {
  return new Promise((resolve, reject) => {
    db.run(
      'UPDATE accounts SET balance = balance + ? WHERE id = ?',
      [amount, accountId],
      (err) => {
        if (err) {
          reject(err);
        } else {
          resolve(true);
        }
      }
    );
  });
}

async function withdrawFunds(db: Database, accountId: number, amount: number) {
  return new Promise((resolve, reject) => {
    db.run(
      'UPDATE accounts SET balance = balance - ? WHERE id = ?',
      [amount, accountId],
      (err) => {
        if (err) {
          reject(err);
        } else {
          resolve(true);
        }
      }
    );
  });
}

export async function createTransaction(
  body: Omit<Transaction, 'id'>
): Promise<Transaction | unknown> {
  const db = connectToDb();

  const transaction = new Promise((resolve, reject) => {
    db.run(
      'INSERT INTO transactions (type, amount, date, accountId, toAccountId) VALUES (?, ?, ?, ?, ?)',
      [
        body.type,
        body.amount,
        new Date().toISOString(),
        body.accountId,
        body.toAccountId
      ],
      function (err) {
        if (err) {
          reject(err);
        } else {
          resolve({
            id: this.lastID,
            ...body
          });
        }
      }
    );
  });

  if (body.type === TransactionType.DEPOSIT) {
    const updated = await depositFunds(db, body.accountId, body.amount);
    if (updated) {
      return transaction;
    }

    return Promise.reject('An error occurred while processing the transaction');
  }

  if (body.type === TransactionType.WITHDRAW) {
    const updated = await withdrawFunds(db, body.accountId, body.amount);
    if (updated) {
      return transaction;
    }

    return Promise.reject('An error occurred while processing the transaction');
  }

  if (body.type === TransactionType.TRANSFER) {
    if (!body.toAccountId) {
      return Promise.reject(
        'toAccountId is required for transfer transactions'
      );
    }

    const updated = await withdrawFunds(db, body.accountId, body.amount);
    if (updated) {
      const updated = await depositFunds(db, body.toAccountId, body.amount);
      if (updated) {
        return transaction;
      }
    }

    return Promise.reject('An error occurred while processing the transaction');
  }
}
