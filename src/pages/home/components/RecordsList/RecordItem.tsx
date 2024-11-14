import { Button, Group, Stack, Text } from '@mantine/core';
import { motion, useAnimation } from 'framer-motion';
import { FaEdit } from 'react-icons/fa';
import { FaTrash } from 'react-icons/fa6';
import { useTranslation } from 'react-i18next';
import classes from './RecordItem.module.css';
import { signByCurrencyCode } from '../../../../constants/currencies';
import { ColoredIcon } from '../../../../components/ColoredIcon/ColoredIcon';
import { useMainCurrency } from '@/hooks/useMainCurrency';
import { useCurrencyConverter } from '@/hooks/useCurrencyConverter';
import { swipePower } from '@/helpers/animation';
import { ConfirmationModal } from '@/components/ConfirmationModal/ConfirmationModal';
import { useAppStore } from '@/store/store';
import { useAccounts } from '@/hooks/useAccounts';
import { getAccountTitle } from '@/helpers/account';
import { useCategories } from '@/hooks/useCategories';
import { IRecord } from '@/types/IRecord';
import { RecordTypeEnum } from '@/enums/RecordTypeEnum';

interface Props {
  record: IRecord;
}

export const RecordItem = ({ record }: Props) => {
  const { t } = useTranslation();
  const mainCurrency = useMainCurrency();
  const { convert } = useCurrencyConverter();
  const { accountsById } = useAccounts();
  const { categoriesById } = useCategories();

  const toggleAddingRecord = useAppStore((state) => state.layout.toggleAddingRecord);
  const delRecord = useAppStore((state) => state.delRecord);
  const isCurrencyDiffersFromMain = (record.originalCurrency || record.currency) !== mainCurrency;

  const prefix = record.type === RecordTypeEnum.EXPENSES ? <>&#8722;</> : '+';
  const convertedCurrency = convert(record.value, record.currency, mainCurrency);

  const animation = useAnimation();
  const targetAcc = accountsById[record.targetAccId || ''];
  const category = categoriesById[record.catId || ''];
  const isTranfer = !!record.targetAccId;

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
            {isTranfer ? (
              <>
                <ColoredIcon icon={targetAcc.icon} color={targetAcc.color} />
                <Text fw={500}>{getAccountTitle(targetAcc?.title, t)}</Text>
              </>
            ) : (
              <>
                <ColoredIcon icon={category.icon} color={category.color} />
                <Text fw={500}>{category?.title}</Text>
              </>
            )}
          </Group>
          <Group align="flex-end">
            <Stack gap="xxxs">
              <Text lh={1} ta="end">
                {prefix}
                {convertedCurrency} {signByCurrencyCode[mainCurrency]}
              </Text>
              {isCurrencyDiffersFromMain && (
                <Text size="xs" c="dimmed" lh={1} ta="end">
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
