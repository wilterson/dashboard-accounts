import { Card, Title, Text, Grid, Flex, Metric } from '@tremor/react';
import currency from 'currency.js';
import HistoryTable from './history';

async function getTransactions() {
  const res = await fetch('http://localhost:3000/api/transactions', {
    headers: {
      'user-id': '1',
    },
  })
  const data = await res.json()

  return data
}

async function getAccountData() {
  const res = await fetch('http://localhost:3000/api/accounts', {
    headers: {
      'user-id': '1',
    },
  })
  const data = await res.json()

  return data.map((item: any) => ({
    accountType: item.type,
    balance: currency(item.balance).format(),
  }))
}

export default async function IndexPage() {
  const transactions = await getTransactions()
  const data = await getAccountData()

  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <Grid numItemsSm={2} numItemsLg={2} className="gap-6">
        {data.map((item: any) => (
          <Card key={item.accountType}>
            <Title>{item.accountType}</Title>
            <Flex
              justifyContent="start"
              alignItems="baseline"
              className="space-x-2"
            >
              <Metric>{item.balance}</Metric>
              <Text>Total balance</Text>
            </Flex>
          </Card>
        ))}
      </Grid>
      <HistoryTable transactions={transactions} />
    </main>
  );
}
