import { Group, Text } from '@mantine/core';
import { ICategory, IRecord, RecordTypeEnum } from '../../../../store/types';
import classes from './RecordItem.module.css';
import { signByCurrencyCode } from '../../../../constants/currencies';
import { CategoryIcon } from '../../../../components/CategoryIcon/CategoryIcon';

interface Props {
  record: IRecord;
  category: ICategory;
}

export const RecordItem = ({ record, category }: Props) => (
  <Group p="xs" align="center" gap="xs" justify="space-between" className={classes.wrapper}>
    <Group gap="xs">
      <CategoryIcon icon={category.icon} color={category.color} />
      <Text fw={500}>{category?.title}</Text>
    </Group>
    <Group align="flex-end">
      <Text>
        {signByCurrencyCode[record.currency]}{' '}
        {record.type === RecordTypeEnum.EXPENSES ? <>&#8722;</> : '+'}
        {record.value}
      </Text>
    </Group>
  </Group>
);
