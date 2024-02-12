import { Card, Title } from '@tremor/react';
import TransferForm from './form';

async function getAccounts() {
  const res = await fetch('http://localhost:3000/api/accounts', {
    headers: {
      'user-id': '1',
    },
  });
  const data = await res.json();

  return data;
}

export default async function TransferPage() {
  const accounts = await getAccounts();

  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <Title>Transfer</Title>
      <Card className="mt-6">
        <TransferForm accounts={accounts}/>
      </Card>
    </main>
  );
}
