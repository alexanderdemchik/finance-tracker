import { Button, Group, Stack } from '@mantine/core';
import { useToggle } from '@mantine/hooks';
import { useAccounts } from '../../../hooks/useAccounts';
import { AccountItem } from './AccountItem';
import { SlideUpOverlay } from '../../../layout/SlideUpOverlay/SlideUpOverlay';
import { AddAccount } from '../../overlays/AddAccount/AddAccount';

export function AccountsList() {
  const { accounts } = useAccounts();
  const [isAddAccount, toggle] = useToggle();
  return (
    <Stack gap={0}>
      {accounts.map((el) => (
        <AccountItem account={el} key={el.id} />
      ))}
      <Group m="md">
        <Button variant="outline" onClick={() => toggle()}>
          Добавить счёт
        </Button>
        <Button variant="outline">Управление счетами</Button>
      </Group>

      <SlideUpOverlay open={isAddAccount} onClose={() => toggle()} id="add-account">
        <AddAccount />
      </SlideUpOverlay>
    </Stack>
  );
}
