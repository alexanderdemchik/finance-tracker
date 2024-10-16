import { Group, Text } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { iconsToComponentsMap } from '../../../../constants/iconsToComponentsMap';
import { IAccount } from '../../../../store/types';
import classes from './AccountItem.module.css';

interface IAccountItemProps {
  account: IAccount;
}

export function AccountItem({ account }: IAccountItemProps) {
  const { t } = useTranslation();
  const Icon = iconsToComponentsMap[account.icon];

  return (
    <Group justify="space-between" p="md" className={classes.wrapper}>
      <Group gap="xs">
        <div
          style={{ '--color': account.color || 'var(--mantine-primary-color-filled)' }}
          className={classes.icon}
        >
          <Icon />
        </div>
        <Text>{account.title === '_default_' ? t('default-account-name') : account.title}</Text>
      </Group>
      <Text>
        {account.currency} {account.balance}
      </Text>
    </Group>
  );
}
