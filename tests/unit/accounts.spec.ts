import { test } from 'vitest';
import sinon from 'sinon';
import * as db from '../../db';
import { getUserAccounts, Account } from '../../db/models/account';

test('getUserAccounts returns an array of accounts', async () => {
  const stub = sinon.stub(db, 'connectToDb');

  stub.returns({
    all: (query: any, params: any, callback: any) => {
      callback(null, [
        {
          id: 1,
          type: 'savings',
          balance: 1000,
          userId: 1,
          createdAt: new Date()
        }
      ]);
    }
  } as any);

  const accounts = await getUserAccounts('1');
  expect(Array.isArray(accounts)).toBe(true);

  accounts.forEach((account: Account | unknown) => {
    expect(account).toHaveProperty('id');
    expect(account).toHaveProperty('type');
    expect(account).toHaveProperty('balance');
    expect(account).toHaveProperty('userId');
    expect(account).toHaveProperty('createdAt');
  });

  stub.restore();
});
