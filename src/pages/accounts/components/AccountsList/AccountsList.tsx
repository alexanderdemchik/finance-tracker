import { Button, Group, Stack } from '@mantine/core';
import { useToggle } from '@mantine/hooks';
import { useAccounts } from '../../../../hooks/useAccounts';
import { AccountItem } from './AccountItem';
import { SlideUpOverlay } from '../../../../layout/SlideUpOverlay/SlideUpOverlay';
import { AddAccount } from '../../../../overlays/AddAccount/AddAccount';

export function AccountsList() {
  const { accounts } = useAccounts();
  const [isAddAccount, toggleAddAccount] = useToggle();

  return (
    <Stack gap={0}>
      {accounts.map((el) => (
        <AccountItem account={el} key={el.id} />
      ))}
      <Group m="md" className="center nowrap" gap="xs">
        <Button variant="outline" onClick={() => toggleAddAccount()} fullWidth>
          Добавить счёт
        </Button>
        <Button variant="outline" fullWidth>
          Управление счетами
        </Button>
      </Group>

      <SlideUpOverlay open={isAddAccount} onClose={() => toggleAddAccount()} id="add-account">
        <AddAccount />
      </SlideUpOverlay>
    </Stack>
  );
}
