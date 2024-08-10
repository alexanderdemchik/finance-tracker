import { SegmentedControl } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { useDidUpdate, useToggle } from '@mantine/hooks';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 } from 'uuid';
import { CategorySelect } from './CategorySelect';
import { SwipeableTabs } from '../../SwipeableTabs/SwipeableTabs';
import { useCategories } from '../../../hooks/useCategories';
import { AddRecordCalculator } from './AddRecordCalculator';
import { useAppStore } from '../../../store/store';
import { RoutesPathsEnum } from '../../../constants/routes';
import { RecordTypeEnum } from '../../../store/types';
import { DefaultHeaderLayout } from '../../../layout/DefaultHeaderLayout';
import { BackButton } from '../../BackButton/BackButton';

enum TAB_ITEMS {
  EXPENSES = 'EXPENSES',
  INCOME = 'INCOME',
  TRANSFER = 'TRANSFER',
}

export const AddRecord = () => {
  const { t } = useTranslation(undefined, { keyPrefix: 'add-screen' });
  const tabs = [TAB_ITEMS.EXPENSES, TAB_ITEMS.INCOME, TAB_ITEMS.TRANSFER];
  const [tab, toggleTab] = useToggle(tabs);

  const { toggleAddingRecord } = useAppStore((state) => state.layout);

  const [selectedCategoryId, setSelectedCategoryId] = useState<string>();
  const navigate = useNavigate();
  const category = useCategories().byId[selectedCategoryId || ''];

  const addRecord = useAppStore((state) => state.addRecord);

  useDidUpdate(() => {
    setSelectedCategoryId(undefined);
  }, [tab]);

  return (
    <>
      <DefaultHeaderLayout title={t('add')} left={<BackButton />}>
        <SegmentedControl
          styles={{ root: { borderRadius: 0 } }}
          value={tab}
          onChange={(val) => toggleTab(val as TAB_ITEMS)}
          size="xs"
          data={[
            { label: t('expenses'), value: TAB_ITEMS.EXPENSES },
            { label: t('income'), value: TAB_ITEMS.INCOME },
          ]}
          fullWidth
        />
      </DefaultHeaderLayout>

      <div style={{ flexGrow: 1, overflowY: 'auto', overflowX: 'hidden' }}>
        <SwipeableTabs value={tabs.indexOf(tab)} onChange={(i: number) => toggleTab(tabs[i])}>
          <CategorySelect
            type={RecordTypeEnum.EXPENSES}
            value={selectedCategoryId}
            onChange={setSelectedCategoryId}
          />
          <CategorySelect
            type={RecordTypeEnum.INCOME}
            value={selectedCategoryId}
            onChange={setSelectedCategoryId}
          />
        </SwipeableTabs>
      </div>

      {selectedCategoryId && (
        <AddRecordCalculator
          onAccept={(val, currency, accId) => {
            addRecord({
              id: v4(),
              categoryId: selectedCategoryId,
              accountId: accId!,
              value: val,
              currency,
              date: Date.now(),
              type: category.type,
            });
            toggleAddingRecord();
            navigate(RoutesPathsEnum.HOME);
          }}
        />
      )}
    </>
  );
};
