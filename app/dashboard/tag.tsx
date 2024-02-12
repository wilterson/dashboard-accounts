import { Badge } from "@tremor/react";

export function TransactionTypeTag({ type }: { type: string }) {
  const colorMap: { [key: string]: string } = {
    'deposit': 'green',
    'withdraw': 'orange',
    'transfer': 'gray',
  };
  const color = colorMap[type] || colorMap['default'];

  return (
    type === 'deposit' ? (
      <Badge color={color} >Deposit</Badge>
    ) : type === 'withdraw' ? (
      <Badge color={color}>Withdraw</Badge>
    ) : (
      <Badge color={color}>Transfer</Badge>
    )
  );
}
