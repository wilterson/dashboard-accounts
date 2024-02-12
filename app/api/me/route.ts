import { getUserTransactions } from '../../../db/models/transaction';

export async function GET(request: Request) {
  const users = await getUserTransactions(1);

  return Response.json(users, { status: 200 });
}
