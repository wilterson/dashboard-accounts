import { getUserAccounts } from '../../../db/models/account';

export async function GET(request: Request) {
  const userId = request.headers.get('user-id');

  if (!userId) {
    return Response.json({ message: 'User ID is required' }, { status: 400 });
  }

  const accounts = await getUserAccounts(userId);

  return Response.json(accounts, { status: 200 });
}
