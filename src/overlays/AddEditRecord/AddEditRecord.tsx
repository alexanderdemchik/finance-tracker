import { Box, Flex, Group, SegmentedControl, Stack, Text } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { useDidUpdate } from '@mantine/hooks';
import { useNavigate } from 'react-router-dom';
import { v4 } from 'uuid';
import { FaAngleRight, FaPlus } from 'react-icons/fa6';
import { CategorySelect } from './CategorySelect';
import { SwipeableTabs } from '../../layout/SwipeableTabs/SwipeableTabs';
import { useCategories } from '../../hooks/useCategories';
import { AddEditRecordCalculator } from './AddEditRecordCalculator';
import { useAppStore } from '../../store/store';
import { RoutesPathsEnum } from '../../constants/routes';
import { PageHeaderLayout } from '../../layout/PageHeaderLayout/PageHeaderLayout';
import { BackButton } from '../../components/BackButton/BackButton';
import classes from './AddEditRecord.module.css';
import { PartialSlideUpOverlay } from '@/layout/SlideUpOverlay/PartialSlideUpOverlay';
import { useAccounts } from '@/hooks/useAccounts';
import { AccountItem } from '@/components/AccountsList/AccountItem';
import { getAccountTitle } from '@/helpers/account';
import { getIconComponent } from '@/helpers/icons';
import { useLocalStore } from '@/hooks/useLocalStore';
import { IRecord } from '@/types/IRecord';
import { RecordTypeEnum } from '@/enums/RecordTypeEnum';

interface IAddEditRecordProps {
  editData?: IRecord;
}

interface IAddEditRecordLocalStore {
  sourceAccId?: string;
  targetAccId?: string;
  selectedCategoryId?: string;
  isAccountsSelectOpen?: 'to' | 'from';
  tabs: RecordTypeEnum[];
  tab: RecordTypeEnum;
}

export const AddEditRecord = ({ editData }: IAddEditRecordProps) => {
  const { t } = useTranslation(undefined, { keyPrefix: 'common' });
  const { t: baseT } = useTranslation();

  const {
    tab,
    tabs,
    setTab: toggleTab,
    sourceAccId,
    targetAccId,
    selectedCategoryId,
    setSelectedCategoryId,
    setIsAccountsSelectOpen,
    isAccountsSelectOpen,
    ...store
  } = useLocalStore<IAddEditRecordLocalStore>({
    tabs: [RecordTypeEnum.EXPENSES, RecordTypeEnum.INCOME, RecordTypeEnum.TRANSFER],
    tab: editData?.type || RecordTypeEnum.EXPENSES,
    selectedCategoryId: undefined,
    sourceAccId: editData?.type === RecordTypeEnum.TRANSFER ? editData.sourceAccId : undefined,
    targetAccId: editData?.type === RecordTypeEnum.TRANSFER ? editData.accId : undefined,
    isAccountsSelectOpen: undefined,
  });

  const { toggleAddingRecord } = useAppStore((state) => state.layout);

  const { displayedAccounts: accounts, accountsById } = useAccounts();
  const navigate = useNavigate();
  const category = useCategories().categoriesById[selectedCategoryId || ''];

  const addRecord = useAppStore((state) => state.addRecord);
  const editRecord = useAppStore((state) => state.editRecord);

  useDidUpdate(() => {
    setSelectedCategoryId(undefined);
    store.setSourceAccId(undefined);
    store.setTargetAccId(undefined);
  }, [tab]);

  return (
    <>
      <PageHeaderLayout title={editData ? 'Редактирование' : t('add')} left={<BackButton />}>
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
      </PageHeaderLayout>

      <div style={{ flexGrow: 1, overflowY: 'auto', overflowX: 'hidden' }}>
        <SwipeableTabs value={tabs.indexOf(tab)} onChange={(i: number) => toggleTab(tabs[i])}>
          <CategorySelect type={RecordTypeEnum.EXPENSES} value={selectedCategoryId} onChange={setSelectedCategoryId} />
          <CategorySelect type={RecordTypeEnum.INCOME} value={selectedCategoryId} onChange={setSelectedCategoryId} />
          <Group style={{ height: '100%' }} p="md" align="center" justify="center">
            {sourceAccId ? (
              <Stack className={classes['transfer-item']} onClick={() => setIsAccountsSelectOpen('from')}>
                <Flex className={classes.plus}>{getIconComponent(accountsById[sourceAccId].icon)}</Flex>
                <Text size="sm" c="dimmed">
                  {getAccountTitle(accountsById[sourceAccId].title, baseT)}
                </Text>
              </Stack>
            ) : (
              <Stack className={classes['transfer-item']} onClick={() => setIsAccountsSelectOpen('from')}>
                <Flex className={classes.plus}>
                  <FaPlus />
                </Flex>
                <Text size="sm" c="dimmed">
                  Выберите счет
                </Text>
              </Stack>
            )}

            <Box c="dimmed">
              <FaAngleRight />
            </Box>
            {targetAccId ? (
              <Stack className={classes['transfer-item']} onClick={() => setIsAccountsSelectOpen('from')}>
                <Flex className={classes.plus}>{getIconComponent(accountsById[targetAccId].icon)}</Flex>
                <Text size="sm" c="dimmed">
                  {getAccountTitle(accountsById[targetAccId].title, baseT)}
                </Text>
              </Stack>
            ) : (
              <Stack className={classes['transfer-item']} onClick={() => setIsAccountsSelectOpen('to')}>
                <Flex className={classes.plus}>
                  <FaPlus />
                </Flex>
                <Text size="sm" c="dimmed">
                  Выберите счет
                </Text>
              </Stack>
            )}
          </Group>
        </SwipeableTabs>
      </div>

      <PartialSlideUpOverlay id="acc-select" open={!!isAccountsSelectOpen} onClose={() => setIsAccountsSelectOpen()} maxHeight={30}>
        {accounts.map((account) => {
          const func = store[isAccountsSelectOpen === 'from' ? 'setSourceAccId' : 'setTargetAccId'];
          const selected = isAccountsSelectOpen === 'from' ? sourceAccId : targetAccId;

          return (
            <AccountItem
              account={account}
              key={account.id}
              selected={selected === account.id}
              onClick={(id) => {
                func(id);
                setIsAccountsSelectOpen();
              }}
            />
          );
        })}
      </PartialSlideUpOverlay>

      {(!!category || (sourceAccId && targetAccId)) && (
        <AddEditRecordCalculator
          category={category}
          sourceAccId={sourceAccId}
          targetAccId={targetAccId}
          editData={editData}
          onAccept={({ value, currency, accId, originalCurrency, originalValue, date }) => {
            const data: Omit<IRecord, 'id'> = {
              catId: selectedCategoryId,
              accId: accId!,
              value,
              currency,
              date,
              type: tab,
              sourceAccId,
              sourceCurrency: originalCurrency,
              sourceValue: originalValue,
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
