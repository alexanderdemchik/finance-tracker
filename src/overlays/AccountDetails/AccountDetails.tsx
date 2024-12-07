import { Button, Divider, Group, Modal, Paper, Stack, Text } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { FaCaretDown, FaPencil } from 'react-icons/fa6';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { MonthPicker } from '@mantine/dates';
import { useToggle } from '@mantine/hooks';
import { v4 } from 'uuid';
import { BackButton } from '@/components/BackButton/BackButton';
import { RecordsList } from '@/components/RecordsList/RecordsList';
import { useAccounts } from '@/hooks/useAccounts';
import { PageHeaderLayout } from '@/layout/PageHeaderLayout/PageHeaderLayout';
import { PageLayout } from '@/layout/PageLayout/PageLayout';
import { getAccountTitle } from '@/helpers/account';
import { ColoredIcon } from '@/components/ColoredIcon/ColoredIcon';
import { useCalculateIncomeExpenses } from '@/hooks/useCalculateIncomeExpenses';
import { useLocalStore } from '@/hooks/useLocalStore';
import { PartialSlideUpOverlay } from '@/layout/SlideUpOverlay/PartialSlideUpOverlay';
import { EditCurrencyValue } from '@/components/EditCurrencyValue/EditCurrencyValue';
import { useAppStore } from '@/store/store';
import { RecordTypeEnum } from '@/enums/RecordTypeEnum';
import { useRecordsByRange } from '@/hooks/useRecordsByRange';
import { DateRangeEnum } from '@/enums/DateRangeEnum';

interface IAccountDetailsProps {
  id: string;
}

export const AccountDetails = ({ id: propId }: IAccountDetailsProps) => {
  const { t } = useTranslation();
  const { accountsById } = useAccounts();

  const { selectedDate, setSelectedDate, calendarDate, setCalendarDate, isDateSelectOpen, toggleIsDateSelectOpen, id, isEditBalance, toggleIsEditBalance } =
    useLocalStore({
      selectedDate: new Date(),
      calendarDate: new Date(),
      isDateSelectOpen: false,
      id: propId,
      isEditBalance: false,
    });

  const account = accountsById[id];

  const records = useRecordsByRange(selectedDate, DateRangeEnum.MONTH).filter((el) => el.accId === id);

  const addRecord = useAppStore((state) => state.addRecord);

  const { income, expenses } = useCalculateIncomeExpenses(records);

  const getIncomeExpensesTitle = () => {
    let title = '';

    if (expenses > 0) {
      title += `Расходы: ${expenses}  `;
    }

    if (income > 0) {
      title += `Доходы: ${income}`;
    }

    return title.trim();
  };

  const handleUpdateBalance = (newVal: string) => {
    const diff = Number(newVal) - account.balance;
    addRecord({
      value: diff,
      id: v4(),
      currency: account.currency,
      accId: account.id,
      date: new Date().getTime(),
      type: RecordTypeEnum.CORRECTION,
    });
  };

  return (
    <PageLayout header={<PageHeaderLayout left={<BackButton />} title="Подробности" />}>
      <Paper radius="md" m="sm" p="sm" withBorder>
        <Stack>
          <Group justify="space-between">
            <Text fw={500}>{getAccountTitle(account.title, t)}</Text>
            <ColoredIcon icon={account.icon} color={account.color} />
          </Group>
          <Group gap="xxxs" align="center" onClick={() => toggleIsEditBalance()}>
            <Text size="xs" c="dimmed">
              {account.currency}
            </Text>
            <Text>{account.balance}</Text>
            <Text size="xs" ml="xxs" display="flex">
              <FaPencil />
            </Text>
          </Group>
        </Stack>
      </Paper>
      <Group justify="space-between" mx="xs" my="xs" mb="xxs">
        <Text
          size="xs"
          fw={500}
          onClick={() => {
            setCalendarDate(new Date());
            toggleIsDateSelectOpen();
          }}
        >
          {`${dayjs(selectedDate).format('MMM YYYY')} `} <FaCaretDown />
        </Text>
        <Text size="xs" fw={500}>
          {getIncomeExpensesTitle()}
        </Text>
      </Group>
      <Divider />
      <RecordsList records={records} />

      <Modal
        opened={isDateSelectOpen}
        onClose={() => toggleIsDateSelectOpen()}
        withCloseButton={false}
        centered
        size="auto"
        zIndex="var(--mantine-z-index-modal)"
      >
        <MonthPicker value={calendarDate} onChange={(val) => setCalendarDate(val || undefined)} />
        <Group justify="center">
          <Button variant="subtle" onClick={() => toggleIsDateSelectOpen()}>
            Отмена
          </Button>
          <Button
            variant="subtle"
            onClick={() => {
              setSelectedDate(calendarDate || new Date());
              toggleIsDateSelectOpen();
            }}
          >
            Принять
          </Button>
        </Group>
      </Modal>

      <PartialSlideUpOverlay
        open={isEditBalance}
        onClose={() => {
          toggleIsEditBalance();
        }}
        id="edit-currency"
        height="auto"
      >
        <EditCurrencyValue
          defaultValue={`${account.balance}`}
          currency={account.currency}
          onAccept={(newVal) => {
            handleUpdateBalance(newVal);
            toggleIsEditBalance();
          }}
        />
      </PartialSlideUpOverlay>
    </PageLayout>
  );
};
