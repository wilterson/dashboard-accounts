import {
  createTransaction,
  getUserTransactions
} from '../../../db/models/transaction';

export async function GET(request: Request) {
  const userId = request.headers.get('user-id');

  if (!userId) {
    return Response.json({ message: 'User ID is required' }, { status: 400 });
  }

  const transactions = await getUserTransactions(userId);

  return Response.json(transactions, { status: 200 });
}

export async function POST(request: Request) {
  const userId = request.headers.get('user-id');
  const body = await request.json();

  if (!userId) {
    return Response.json({ message: 'User ID is required' }, { status: 400 });
  }

  if (!body.accountId || !body.amount) {
    return Response.json(
      { message: 'accountId and amount are required' },
      { status: 400 }
    );
  }

  const transaction = await createTransaction({
    ...body,
    userId
  });

  return Response.json(transaction, { status: 201 });
}
