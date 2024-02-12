'use client'

import { ArrowDownTrayIcon, ArrowUpTrayIcon, ArrowsRightLeftIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline';
import { Callout, Divider, NumberInput, Select, SelectItem } from '@tremor/react';
import React from 'react';
import { Account } from '../../db/models/account';

interface TransferFormProps {
  accounts: Account[];
}

export default function TransferForm({ accounts }: TransferFormProps) {

  const [transactionType, setTransactionType] = React.useState('');
  const [fromAccountId, setFromAccountId] = React.useState('');
  const [toAccountId, setToAccountId] = React.useState('');
  const [amount, setAmount] = React.useState(0);
  const [error, setError] = React.useState('');
  const [success, setSuccess] = React.useState('');

  const onSubmit = async (event: any) => {
    event.preventDefault();

    if (!transactionType) {
      setError('Transaction type is required');
      return;
    }

    if (!fromAccountId) {
      setError('Account is required');
      return;
    }

    if (!amount) {
      setError('Amount is required');
      return;
    }

    if (transactionType === 'transfer' && !toAccountId) {
      setError('Recipient account is required');
      return;
    }

    try {
      const data = {
        accountId: fromAccountId,
        type: transactionType,
        toAccountId,
        amount,
      };

      const response = await fetch('http://localhost:3000/api/transactions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'user-id': '1'
        },
        body: JSON.stringify(data)
      });

      console.log('Response:', response);

      if (!response.ok) {
        throw new Error('An error occurred while processing the transaction');
      }

      const responseEvent = await response.json();

      if (!responseEvent.id) {
        throw new Error('An error occurred while processing the transaction');
      }

      setError('');
      setTransactionType('');
      setFromAccountId('');
      setToAccountId('');
      setAmount(0);
      setSuccess('Transaction sent successfully');
      setTimeout(() => {
        setSuccess('');
      }, 2500);
    } catch (error: any) {
      console.error('Error:', error);
      setError(error.message);
    }
  };

  return (
    <>
      <div className="sm:mx-auto sm:max-w-2xl">
        <h3 className="text-tremor-title font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
          Transfer
        </h3>
        <form action="#" method="post" className="mt-8" onSubmit={onSubmit}>
          <div className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-6">
            <div className="col-span-full sm:col-span-6">
              <label>
                Transaction Type
                <Select value={transactionType} onValueChange={setTransactionType}>
                  <SelectItem value="">
                    Select a transaction type
                  </SelectItem>
                  <SelectItem value="transfer" icon={ArrowsRightLeftIcon}>
                    Transfer
                  </SelectItem>
                  <SelectItem value="deposit" icon={ArrowDownTrayIcon}>
                    Deposit
                  </SelectItem>
                  <SelectItem value="withdraw" icon={ArrowUpTrayIcon}>
                    Withdraw
                  </SelectItem>
                </Select>
              </label>
            </div>
          </div>
          <div className="flex gap-x-4 gap-y-6">
            {transactionType === 'transfer' && (
              <>
                <div className="flex-1">
                  <label>
                    From
                    <Select value={fromAccountId.toString()} onValueChange={setFromAccountId}>
                      {accounts.map(account => (
                        <SelectItem key={account.id.toString()} value={account.id.toString()}>
                          Account#{account.id.toString().padStart(3, '0')} - { account.type }
                        </SelectItem>
                      ))}
                    </Select>
                  </label>
                </div>
                <div className="flex-1">
                  <label>
                    To
                    <Select value={toAccountId} onValueChange={setToAccountId}>
                      {accounts.filter(account => account.id.toString() !== fromAccountId).map(account => (
                        <SelectItem key={account.id.toString()} value={account.id.toString()}>
                          Account#{account.id.toString().padStart(3, '0')} - { account.type }
                        </SelectItem>
                      ))}
                    </Select>
                  </label>
                </div>
              </>
            )}

            {(transactionType === 'deposit' || transactionType === 'withdraw') && (
              <div className="w-1/2">
                <div className="flex-1">
                  <label>
                      Account
                      <Select value={fromAccountId.toString()} onValueChange={setFromAccountId}>
                        {accounts.map(account => (
                          <SelectItem key={account.id.toString()} value={account.id.toString()}>
                            Account#{account.id.toString().padStart(3, '0')} - { account.type }
                          </SelectItem>
                        ))}
                      </Select>
                    </label>
                </div>
              </div>
            )}

            {transactionType && (
              <div className="flex-1">
                <label>
                  Amount
                  <NumberInput
                    value={amount}
                    onValueChange={setAmount}
                    enableStepper={false}
                    icon={CurrencyDollarIcon}
                    placeholder="Amount" />
                </label>
              </div>
            )}
          </div>
          <Divider />
          <div className="flex items-center justify-end space-x-4">
            <button
              type="submit"
              onSubmit={onSubmit}
              className="whitespace-nowrap rounded-tremor-default bg-tremor-brand px-4 py-2.5 text-tremor-default font-medium text-tremor-brand-inverted shadow-tremor-input hover:bg-tremor-brand-emphasis dark:bg-dark-tremor-brand dark:text-dark-tremor-brand-inverted dark:shadow-dark-tremor-input dark:hover:bg-dark-tremor-brand-emphasis"
            >
              Send
            </button>
          </div>
          {error && (
            <Callout title="Error" color="red">
              {error}
            </Callout>
          )}
          {success && (
            <Callout title="Transaction Sent" color="green">
              {success}
            </Callout>
          )}
        </form>
      </div>
    </>
  );
}
