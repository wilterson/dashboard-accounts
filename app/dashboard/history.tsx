import {
  Table,
  TableHead,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
  Text,
  Card,
  Divider,
  Title
} from '@tremor/react';
import currency from 'currency.js';
import { Transaction } from '../../db/models/transaction';
import { TransactionTypeTag } from './tag';
import { format } from 'date-fns';

export default function HistoryTable({ transactions }: { transactions: Transaction[] }) {
  return (
    <>
      <Divider />
      <Card className='space-y-4'>
        <Title>History</Title>
        <Table>
          <TableHead>
            <TableRow>
              <TableHeaderCell>#</TableHeaderCell>
              <TableHeaderCell>Type</TableHeaderCell>
              <TableHeaderCell>Amount</TableHeaderCell>
              <TableHeaderCell>Account</TableHeaderCell>
              <TableHeaderCell>Date</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions.map((transaction: Transaction) => (
              <TableRow key={transaction.id}>
                <TableCell>{transaction.id}</TableCell>
                <TableCell>
                  <TransactionTypeTag type={transaction.type} />
                </TableCell>
                <TableCell>
                  <Text>{currency(transaction.amount).format()}</Text>
                </TableCell>
                <TableCell>{transaction.accountId}</TableCell>
                <TableCell>{format(transaction.date, 'MMM dd y')}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </>
  );
}
