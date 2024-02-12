import { test } from 'vitest';
import {
  TransactionType,
  createTransaction
} from '../../db/models/transaction';

test('createTransaction - deposit transaction', async () => {
  const transaction = await createTransaction({
    type: TransactionType.DEPOSIT,
    amount: 100,
    date: new Date(),
    accountId: 1
  });

  expect(transaction).toHaveProperty('id');
  expect(transaction).toHaveProperty('type', TransactionType.DEPOSIT);
  expect(transaction).toHaveProperty('amount', 100);
  expect(transaction).toHaveProperty('accountId', 1);
});

test('createTransaction - withdraw transaction', async () => {
  const transaction = await createTransaction({
    type: TransactionType.WITHDRAW,
    amount: 100,
    date: new Date(),
    accountId: 1
  });

  expect(transaction).toHaveProperty('id');
  expect(transaction).toHaveProperty('type', TransactionType.WITHDRAW);
  expect(transaction).toHaveProperty('amount', 100);
  expect(transaction).toHaveProperty('accountId', 1);
});

test('createTransaction - transfer transaction', async () => {
  const transaction = await createTransaction({
    type: TransactionType.TRANSFER,
    amount: 100,
    date: new Date(),
    accountId: 1,
    toAccountId: 2
  });

  expect(transaction).toHaveProperty('id');
  expect(transaction).toHaveProperty('type', TransactionType.TRANSFER);
  expect(transaction).toHaveProperty('amount', 100);
  expect(transaction).toHaveProperty('accountId', 1);
  expect(transaction).toHaveProperty('toAccountId', 2);
});

test('createTransaction - error if toAccountId is not provided for transfer transactions', async () => {
  await expect(
    createTransaction({
      type: TransactionType.TRANSFER,
      amount: 100,
      date: new Date(),
      accountId: 1
    })
  ).rejects.toThrow('toAccountId is required for transfer transactions');
});
