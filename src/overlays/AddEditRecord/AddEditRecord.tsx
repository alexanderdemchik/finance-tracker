import { Box, Flex, Group, SegmentedControl, Stack, Text } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { useDidUpdate, useToggle } from '@mantine/hooks';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 } from 'uuid';
import { CategorySelect } from './CategorySelect';
import { SwipeableTabs } from '../../components/SwipeableTabs/SwipeableTabs';
import { useCategories } from '../../hooks/useCategories';
import { AddEditRecordCalculator } from './AddEditRecordCalculator';
import { useAppStore } from '../../store/store';
import { RoutesPathsEnum } from '../../constants/routes';
import { IRecord, RecordTypeEnum } from '../../store/types';
import { DefaultHeaderLayout } from '../../layout/DefaultHeaderLayout';
import { BackButton } from '../../components/BackButton/BackButton';
import { FaAngleRight, FaPlus } from 'react-icons/fa6';
import classes from './AddEditRecord.module.css';
import { PartialSlideUpOverlay } from '@/layout/SlideUpOverlay/PartialSlideUpOverlay';
import { IBaseLocalStore, useLocalStore } from '@/store/useLocalStore';

interface IAddEditRecordProps {
  editData?: IRecord;
}

interface IAddEditRecordLocalStore extends IBaseLocalStore {
  transferFrom?: string;
  transferTo?: string;
  selectedCategoryId?: string;
  tabs: RecordTypeEnum[];
  tab: RecordTypeEnum;
}

export const AddEditRecord = ({ editData }: IAddEditRecordProps) => {
  const { t } = useTranslation(undefined, { keyPrefix: 'add-screen' });

  const {
    tab,
    tabs,
    setTab: toggleTab,
    transferFrom,
    transferTo,
    selectedCategoryId,
    setSelectedCategoryId,
  } = useLocalStore<IAddEditRecordLocalStore>({
    tabs: [RecordTypeEnum.EXPENSES, RecordTypeEnum.INCOME, RecordTypeEnum.TRANSFER],
    tab: editData?.type || RecordTypeEnum.EXPENSES,
    selectedCategoryId: undefined,
    transferFrom: undefined,
    transferTo: undefined,
  })();

  const { toggleAddingRecord } = useAppStore((state) => state.layout);

  const navigate = useNavigate();
  const category = useCategories().byId[selectedCategoryId || ''];

  const addRecord = useAppStore((state) => state.addRecord);
  const editRecord = useAppStore((state) => state.editRecord);

  useDidUpdate(() => {
    setSelectedCategoryId(undefined);
  }, [tab]);

  return (
    <>
      <DefaultHeaderLayout title={editData ? 'Редактирование' : t('add')} left={<BackButton />}>
        <SegmentedControl
          styles={{ root: { borderRadius: 0 } }}
          value={tab}
          onChange={(val) => toggleTab(val as RecordTypeEnum)}
          data={[
            { label: t('expenses'), value: RecordTypeEnum.EXPENSES },
            { label: t('income'), value: RecordTypeEnum.INCOME },
            { label: t('transfer'), value: RecordTypeEnum.TRANSFER },
          ]}
          fullWidth
        />
      </DefaultHeaderLayout>

      <div style={{ flexGrow: 1, overflowY: 'auto', overflowX: 'hidden' }}>
        <SwipeableTabs value={tabs.indexOf(tab)} onChange={(i: number) => toggleTab(tabs[i])}>
          <CategorySelect type={RecordTypeEnum.EXPENSES} value={selectedCategoryId} onChange={setSelectedCategoryId} />
          <CategorySelect type={RecordTypeEnum.INCOME} value={selectedCategoryId} onChange={setSelectedCategoryId} />
          <Group style={{ height: '100%' }} p="md" align="center" justify="center">
            <Stack className={classes['transfer-item']}>
              <Flex className={classes.plus}>
                <FaPlus />
              </Flex>
              <Text size="sm" c="dimmed">
                Выберите счет
              </Text>
            </Stack>
            <Box c="dimmed">
              <FaAngleRight />
            </Box>
            <Stack className={classes['transfer-item']}>
              <Flex className={classes.plus}>
                <FaPlus />
              </Flex>
              <Text size="sm" c="dimmed">
                Выберите счет
              </Text>
            </Stack>
          </Group>
        </SwipeableTabs>
      </div>

      <PartialSlideUpOverlay id="acc-select"></PartialSlideUpOverlay>

      {!!category && (
        <AddEditRecordCalculator
          category={category}
          editData={editData}
          onAccept={({ value, currency, accId, originalCurrency, originalValue, date }) => {
            const data = {
              catId: selectedCategoryId!,
              accId: accId!,
              value,
              currency,
              date,
              type: category.type,
              originalCurrency,
              originalValue,
            };

            if (!editData) {
              addRecord({ id: v4(), ...data });
            } else {
              editRecord({ id: editData.id, ...data });
            }

            toggleAddingRecord();
            navigate(RoutesPathsEnum.HOME);
          }}
        />
      )}
    </>
  );
};
