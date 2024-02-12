'use client'

import {
  Table,
  TableHead,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
  Text,
  Button
} from '@tremor/react';
import { Account } from '../../db/models/account';
import { AccountTypeTag } from './tag';
import currency from 'currency.js';
import { useRouter } from 'next/navigation';

export default function AccountsTable({ accounts }: { accounts: Account[] }) {
  const router = useRouter();

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableHeaderCell>Account Type</TableHeaderCell>
          <TableHeaderCell>Balance</TableHeaderCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {accounts.map((account: Account) => (
          <TableRow key={account.id}>
            <TableCell>
              <AccountTypeTag type={account.type} />
            </TableCell>
            <TableCell>
              <Text>{currency(account.balance).format()}</Text>
            </TableCell>
            <TableCell style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button onClick={() => router.push(`/transfer`)}>Transfer</Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
