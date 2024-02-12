import { Database } from 'sqlite3';
import { Transaction, TransactionType } from './models/transaction';
import { User } from './models/user';
import { Account, AccountType } from './models/account';

const db = new Database('./database.sqlite3');

const users = [
  { id: 1, name: 'John Doe', email: 'john@example.com' },
  { id: 2, name: 'Jane Doe', email: 'jane@example.com' },
  { id: 3, name: 'John Smith', email: 'johnsmith@example.com' },
  { id: 4, name: 'Jane Smith', email: 'janesmith@example.com' }
];

const transactions: Transaction[] = [
  {
    id: 1,
    type: TransactionType.DEPOSIT,
    amount: 1000,
    accountId: 1,
    toAccountId: undefined,
    date: new Date('2024-02-07')
  },
  {
    id: 2,
    type: TransactionType.WITHDRAW,
    amount: 250,
    accountId: 2,
    toAccountId: undefined,
    date: new Date('2024-02-08')
  },
  {
    id: 3,
    type: TransactionType.TRANSFER,
    amount: 200,
    accountId: 1,
    toAccountId: 2,
    date: new Date('2024-02-10')
  }
];

const accounts: Account[] = [
  {
    id: 1,
    userId: 1,
    type: AccountType.CHECKING,
    balance: 2160.12,
    createdAt: new Date()
  },
  {
    id: 2,
    type: AccountType.SAVINGS,
    balance: 56220.0,
    userId: 1,
    createdAt: new Date()
  }
];

db.serialize(() => {
  // Create and populate the users table
  db.run(
    'CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, name TEXT, email TEXT)'
  );

  let stmt = db.prepare('INSERT INTO users VALUES (?, ?, ?)');
  for (const user of users) {
    stmt.run(user.id, user.name, user.email);
  }
  stmt.finalize();

  // Create and populate the transactions table
  db.run(
    'CREATE TABLE IF NOT EXISTS transactions (id INTEGER PRIMARY KEY, type TEXT, amount INTEGER, accountId INTEGER, toAccountId INTEGER, date TEXT)'
  );

  stmt = db.prepare('INSERT INTO transactions VALUES (?, ?, ?, ?, ?, ?)');
  for (const transaction of transactions) {
    stmt.run(
      transaction.id,
      transaction.type,
      transaction.amount,
      transaction.accountId,
      transaction.toAccountId,
      transaction.date.toISOString()
    );
  }
  stmt.finalize();

  // Create and populate the accounts table
  db.run(
    'CREATE TABLE IF NOT EXISTS accounts (id INTEGER PRIMARY KEY, type TEXT, balance REAL, userId INTEGER, createdAt TEXT)'
  );

  stmt = db.prepare('INSERT INTO accounts VALUES (?, ?, ?, ?, ?)');
  for (const account of accounts) {
    stmt.run(
      account.id,
      account.type,
      account.balance,
      account.userId,
      account.createdAt.toISOString()
    );
  }
  stmt.finalize();

  // Print out the users
  db.each('SELECT id, name, email FROM users', (err, row: User) => {
    console.log(`${row.id}: ${row.name} (${row.email})`);
  });

  // Print out the transactions
  db.each(
    'SELECT id, type, amount, accountId, date FROM transactions',
    (err, row: Transaction) => {
      console.log(
        `${row.id}: ${row.type} (${row.amount}) (${row.accountId}) (${row.date})`
      );
    }
  );

  // Print out the accounts
  db.each(
    'SELECT id, type, balance, userId, createdAt FROM accounts',
    (err, row: Account) => {
      console.log(
        `${row.id}: ${row.type} (${row.balance}) (${row.userId}) (${row.createdAt})`
      );
    }
  );
});

db.close();
