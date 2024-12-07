import { Stack } from '@mantine/core';
import { useAccounts } from '../../hooks/useAccounts';
import { AccountItem } from './AccountItem';

interface IAccountsListProps {
  onItemClick: (id: string) => void;
}

export function AccountsList({ onItemClick }: IAccountsListProps) {
  const { displayedAccounts } = useAccounts();

  return (
    <Stack gap={0}>
      {displayedAccounts.map((el) => (
        <AccountItem account={el} key={el.id} onClick={() => onItemClick(el.id)} />
      ))}
    </Stack>
  );
}
