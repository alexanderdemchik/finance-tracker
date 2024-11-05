import { Button, Group, Stack, Text } from '@mantine/core';
import { ICategory, IRecord, RecordTypeEnum } from '../../../../store/types';
import classes from './RecordItem.module.css';
import { signByCurrencyCode } from '../../../../constants/currencies';
import { CategoryIcon } from '../../../../components/CategoryIcon/CategoryIcon';
import { useMainCurrency } from '@/store/hooks/useMainCurrency';
import { useCurrencyConverter } from '@/hooks/useCurrencyConverter';
import { motion, useAnimation } from 'framer-motion';
import { FaEdit } from 'react-icons/fa';
import { FaTrash } from 'react-icons/fa6';
import { swipePower } from '@/helpers/animation';
import { ConfirmationModal } from '@/components/ConfirmationModal/ConfirmationModal';
import { useAppStore } from '@/store/store';

interface Props {
  record: IRecord;
  category: ICategory;
}

export const RecordItem = ({ record, category }: Props) => {
  const mainCurrency = useMainCurrency();
  const { convert } = useCurrencyConverter();
  const toggleAddingRecord = useAppStore((state) => state.layout.toggleAddingRecord);
  const delRecord = useAppStore((state) => state.delRecord);
  const isCurrencyDiffersFromMain = (record.originalCurrency || record.currency) !== mainCurrency;

  const prefix = record.type === RecordTypeEnum.EXPENSES ? <>&#8722;</> : '+';
  const convertedCurrency = convert(record.value, record.currency, mainCurrency);

  const animation = useAnimation();

  return (
    <div style={{ overflow: 'hidden' }}>
      <motion.div
        drag="x"
        style={{
          touchAction: 'pan-y',
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'nowrap',
        }}
        dragElastic={{ left: 0.1, right: 0 }}
        dragConstraints={{ left: -140, right: 0 }}
        animate={animation}
        onDragEnd={(e, i) => {
          if (swipePower(i.offset.x, -140) > 40) {
            animation.start({ x: -140 });
          } else {
            animation.start({ x: 0 });
          }
        }}
      >
        <Group p="xs" align="center" gap="xs" justify="space-between" className={classes.wrapper}>
          <Group gap="xs">
            <CategoryIcon icon={category.icon} color={category.color} />
            <Text fw={500}>{category?.title}</Text>
          </Group>
          <Group align="flex-end">
            <Stack gap={'xxxs'}>
              <Text lh={1} ta={'end'}>
                {prefix}
                {convertedCurrency} {signByCurrencyCode[mainCurrency]}
              </Text>
              {isCurrencyDiffersFromMain && (
                <Text size="xs" c="dimmed" lh={1} ta={'end'}>
                  {prefix}
                  {record.originalValue || record.value}{' '}
                  {signByCurrencyCode[record.originalCurrency || record.currency]}
                </Text>
              )}
            </Stack>
          </Group>
        </Group>
        <motion.button
          className={classes['action-btn']}
          onTap={() => {
            toggleAddingRecord(record);
            animation.start({ x: 0 });
          }}
        >
          <FaEdit />
        </motion.button>
        <ConfirmationModal
          title="Вы действительно хотите удалить запись?"
          actions={(toggle) => [
            <Button
              key={0}
              variant="subtle"
              onClick={() => {
                toggle();
                animation.start({ x: 0 });
              }}
            >
              Закрыть
            </Button>,
            <Button
              key={1}
              color="error"
              variant="subtle"
              onClick={() => {
                toggle();
                delRecord(record);
              }}
            >
              Удалить
            </Button>,
          ]}
        >
          {({ toggle }) => (
            <motion.button className={classes['action-btn']} onTap={() => toggle()}>
              <FaTrash />
            </motion.button>
          )}
        </ConfirmationModal>
      </motion.div>
    </div>
  );
};
