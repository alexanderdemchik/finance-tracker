import { Group, Text } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { FaCheck } from 'react-icons/fa6';
import { iconsToComponentsMap } from '../../constants/iconsToComponentsMap';
import classes from './AccountItem.module.css';
import { IAccount } from '@/types/IAccount';

interface IAccountItemProps {
  account: IAccount;
  selected?: boolean;
  onClick?: (id: string) => void;
}

export function AccountItem({ account, selected, onClick }: IAccountItemProps) {
  const { t } = useTranslation();
  const Icon = iconsToComponentsMap[account.icon];

  return (
    <Group justify="space-between" p="md" className={classes.wrapper} onClick={() => onClick?.(account.id)}>
      <Group gap="xs">
        <div style={{ '--color': account.color || 'var(--mantine-primary-color-filled)' }} className={classes.icon}>
          <Icon />
        </div>
        <Text>{account.title === '_default_' ? t('default-account-name') : account.title}</Text>
        {!!selected && <FaCheck className={classes['select-icon']} />}
      </Group>
      <Text size="sm">
        {account.currency} {account.balance}
      </Text>
    </Group>
  );
}
