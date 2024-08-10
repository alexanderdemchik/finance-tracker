import { Group, Text } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { iconsToComponentsMap } from '../../../constants/iconsToComponentsMap';
import { IAccount } from '../../../store/types';
import { getDefaultGradient } from '../../../helpers/getDefaultGradient';
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
        <div style={{ background: getDefaultGradient(account.color) }} className={classes.icon}>
          <Icon />
        </div>
        <Text size="sm">
          {account.title === '_default_' ? t('default-account-name') : account.title}
        </Text>
      </Group>
      <Text size="sm">
        {account.currency} {account.balance}
      </Text>
    </Group>
  );
}
