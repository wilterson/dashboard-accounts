import { Badge } from "@tremor/react";

export function AccountTypeTag({ type }: { type: string }) {
  const colorMap: { [key: string]: string } = {
    'savings': 'green',
    'checking': 'blue',
    'default': 'gray',
  };

  const color = colorMap[type] || colorMap['default'];

  return (
    <Badge color={color}>
      {type}
    </Badge>
  );
}
