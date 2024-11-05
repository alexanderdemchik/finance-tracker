import { Button, Group, Input, Modal, SimpleGrid, Stack, Text } from '@mantine/core';
import { FaCheck, FaDivide, FaEquals, FaMinus, FaPlus, FaStarOfLife } from 'react-icons/fa6';
import { FaBackspace, FaCalendarAlt } from 'react-icons/fa';
import { ReactElement, useEffect, useMemo, useState } from 'react';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import classes from './AddEditRecordCalculator.module.css';
import { useAccounts } from '../../hooks/useAccounts';
import { CurrencyCodeEnum } from '../../constants/currencies';
import { PartialSlideUpOverlay } from '@/layout/SlideUpOverlay/PartialSlideUpOverlay';
import { DefaultHeaderLayout } from '@/layout/DefaultHeaderLayout';
import { BackButton } from '@/components/BackButton/BackButton';
import { CurrencySelect } from '@/components/CurrencySelect/CurrencySelect';
import { getAccountTitle } from '@/helpers/account';
import { ICategory, IRecord } from '@/store/types';
import { getIconComponent } from '@/helpers/icons';
import {
  ARITHMETIC_CHARACTERS_REGEX,
  SupportedCalculatorCharacterType,
  useCalculatorController,
} from './useCalculatorController';
import { useCurrencyConverter } from '@/hooks/useCurrencyConverter';
import { EditCurrencyValue } from './EditCurrencyValue';
import { Calendar } from '@mantine/dates';
import dayjs from 'dayjs';
import { useLocalStore } from '@/store/useLocalStore';
import { AccountItem } from '@/pages/accounts/components/AccountsList/AccountItem';

type ExtendedCalculatorCharactersType = SupportedCalculatorCharacterType | 'date' | 'accept';

const buttons: (ExtendedCalculatorCharactersType | number)[] = [
  7,
  8,
  9,
  'date',
  4,
  5,
  6,
  '+',
  1,
  2,
  3,
  '-',
  '.',
  0,
  'back',
  'accept',
];

const calculatorCharacterContentMap: Record<string, ReactElement | string> = {
  '+': <FaPlus />,
  '-': <FaMinus />,
  '*': <FaStarOfLife />,
  '/': <FaDivide />,
  '.': ',',
  back: <FaBackspace />,
  accept: <FaCheck />,
  '=': <FaEquals />,
};

const renderCalculatorField = (val: string) => {
  const operator = val.match(ARITHMETIC_CHARACTERS_REGEX)?.[0];
  const handleNum = (num: string) => num.replace('.', ',');

  if (operator) {
    const [num1, num2] = val.split(ARITHMETIC_CHARACTERS_REGEX);

    return (
      <>
        {`${handleNum(num1)} `}
        {calculatorCharacterContentMap[operator]}
        {` ${handleNum(num2)}`}
      </>
    );
  }

  return handleNum(val);
};

interface ILocalState {
  selectedAccId: string;
  isCurrencySelectOpen: boolean;
  selectedCurrency?: CurrencyCodeEnum | null;
  setSelectedAccId: (id: string) => void;
}

interface IAddRecordCalculatorProps {
  editData?: IRecord;
  onAccept: (data: {
    value: number;
    currency: CurrencyCodeEnum;
    accId?: string;
    originalValue?: number;
    originalCurrency?: CurrencyCodeEnum;
    date: number;
  }) => void;
  category: ICategory;
}

export const AddEditRecordCalculator = ({ onAccept, category, editData }: IAddRecordCalculatorProps) => {
  const { t } = useTranslation();

  const { accounts, defaultAccount } = useAccounts();

  const {
    selectedAccountId,
    setSelectedAccountId,
    isCurrencyEditOpen,
    toggleIsCurrencyEditOpen,
    isCurrencySelectOpen,
    toggleIsCurrencySelectOpen,
    selectedCurrency,
    setSelectedCurrency,
    convertedCurrency,
    setConvertedCurrency,
    selectedDate,
    setSelectedDate,
    isDatesModalOpen,
    toggleIsDatesModalOpen,
    isAccountSelectOpen,
    toggleIsAccountSelectOpen,
  } = useLocalStore({
    selectedAccountId: editData ? editData.accId : defaultAccount?.id,
    isCurrencySelectOpen: false,
    isCurrencyEditOpen: false,
    selectedCurrency: editData
      ? editData.originalCurrency || editData.currency
      : accounts.find((el) => el.id === defaultAccount?.id)?.currency,
    convertedCurrency: `${editData?.value || 0}`,
    isDatesModalOpen: false,
    selectedDate: editData ? new Date(editData.date) : new Date(),
    isAccountSelectOpen: false,
  })();

  const { result, isContainsArithmeticOperation, isValid, handleInput, enteredNumber } = useCalculatorController(
    `${editData?.originalValue || editData?.value || 0}`
  );

  const { convert } = useCurrencyConverter();

  const selectedAcc = accounts.find((el) => el.id === selectedAccountId);
  const isCurrencyDiffersFromAccount = selectedCurrency !== selectedAcc?.currency;

  const displayDate = useMemo(() => {
    if (dayjs(selectedDate).isSame(new Date(), 'day')) {
      return 'Сегодня';
    } else {
      return dayjs(selectedDate).format('DD.MM.YYYY');
    }
  }, [selectedDate]);

  const isToday = useMemo(() => {
    return dayjs(selectedDate).isSame(new Date(), 'day');
  }, [selectedDate]);

  const handleButtonClick = (val: number | ExtendedCalculatorCharactersType) => {
    switch (val) {
      case 'accept':
        const value = Number(convertedCurrency);
        const currency = selectedAcc!.currency!;

        onAccept(
          isCurrencyDiffersFromAccount
            ? {
                value,
                accId: selectedAcc!.id,
                currency,
                originalValue: enteredNumber,
                originalCurrency: selectedCurrency,
                date: selectedDate.getTime(),
              }
            : {
                value: enteredNumber,
                accId: selectedAcc!.id,
                currency: selectedAcc!.currency!,
                date: selectedDate.getTime(),
              }
        );
        break;
      case 'date':
        toggleIsDatesModalOpen();
    }

    // default handlers
    handleInput(val as SupportedCalculatorCharacterType);
  };

  const renderButton = (el: number | ExtendedCalculatorCharactersType) => {
    if (el === 'date') {
      return (
        <Button color="dark.6" fz="lg" p="0" onClick={() => handleButtonClick(el)}>
          <Group gap="2" c="brand">
            {isToday ? (
              <>
                <FaCalendarAlt size={14} />
                <Text fz="xs">{displayDate}</Text>
              </>
            ) : (
              <Text fz="xs">{displayDate}</Text>
            )}
          </Group>
        </Button>
      );
    }

    if (el === '+') {
      return (
        <Group gap={4}>
          <Button color="dark.6" fz="lg" p="0" onClick={() => handleButtonClick(el)} flex={1}>
            {calculatorCharacterContentMap[el]}
          </Button>
          <Button color="dark.6" fz="lg" p="0" onClick={() => handleButtonClick('*')} flex={1}>
            {calculatorCharacterContentMap['*']}
          </Button>
        </Group>
      );
    }

    if (el === '-') {
      return (
        <Group gap={4}>
          <Button color="dark.6" fz="lg" p="0" onClick={() => handleButtonClick(el)} flex={1}>
            {calculatorCharacterContentMap[el]}
          </Button>
          <Button color="dark.6" fz="lg" p="0" onClick={() => handleButtonClick('/')} flex={1}>
            {calculatorCharacterContentMap['/']}
          </Button>
        </Group>
      );
    }

    if (el === 'accept') {
      const type = isContainsArithmeticOperation ? '=' : 'accept';

      return (
        <Button
          fz="lg"
          p="0"
          onClick={() => handleButtonClick(type)}
          disabled={!isContainsArithmeticOperation && !isValid}
          color={isContainsArithmeticOperation || isValid ? undefined : 'dark.6'}
        >
          {calculatorCharacterContentMap[type]}
        </Button>
      );
    }

    return (
      <Button color="dark.6" fz="lg" p="0" onClick={() => handleButtonClick(el)}>
        {typeof el === 'number' ? el : calculatorCharacterContentMap[el]}
      </Button>
    );
  };

  useEffect(() => {
    setConvertedCurrency(`${convert(enteredNumber || 0, selectedCurrency!, selectedAcc!.currency!)}`);
  }, [isCurrencyDiffersFromAccount, enteredNumber, selectedCurrency, selectedAcc!.currency!]);

  return (
    <>
      <Group gap={0} className={classes.direction}>
        <Group
          gap="xxs"
          key={selectedAccountId}
          className={clsx(classes.account)}
          style={{ '--color': selectedAcc?.color! }}
          onClick={() => toggleIsAccountSelectOpen()}
          flex={1}
        >
          {getIconComponent(selectedAcc?.icon)}
          <Text size="xs">{getAccountTitle(selectedAcc?.title || '', t)}</Text>
        </Group>
        <Group
          gap="xxs"
          key={category.id}
          className={clsx(classes.account)}
          style={{ '--color': category?.color! }}
          flex={1}
        >
          {getIconComponent(category.icon)}
          <Text size="xs">{category.title}</Text>
        </Group>
      </Group>

      <Stack p="xs" pt={0} gap="xxs" className={classes.wrapper}>
        <Stack mt="xxs" gap={0}>
          {isCurrencyDiffersFromAccount && (
            <Group
              align="center"
              gap="xxs"
              justify="flex-end"
              bg="dark.6"
              p="xxs"
              py="xxxs"
              mb="xxxs"
              style={{ borderRadius: 'var(--mantine-radius-default)' }}
              onClick={() => toggleIsCurrencyEditOpen()}
            >
              <Text fw={400} component="span" size="xs" c="dimmed">
                {selectedAcc?.currency || ''}
              </Text>

              <Text
                fw={500}
                size="sm"
                className={classes['calc-field']}
                lh={1}
                style={{ borderRadius: 'var(--mantine-radius-default)' }}
              >
                {convertedCurrency}
              </Text>
            </Group>
          )}

          <Group align="center" gap="xxs" justify="flex-end">
            <Text fw={400} component="span" size="sm" c="dimmed" onClick={() => toggleIsCurrencySelectOpen()} lh={1}>
              {selectedCurrency || ''}
            </Text>

            <Text fw={500} size="lg" className={classes['calc-field']} lh="xs">
              {renderCalculatorField(result)}
            </Text>
          </Group>
        </Stack>
        <Input placeholder="Введите примечание" className={classes.input} />
        <SimpleGrid cols={4} spacing={4}>
          {buttons.map(renderButton)}
        </SimpleGrid>
        <Modal
          opened={isDatesModalOpen}
          onClose={toggleIsDatesModalOpen}
          centered
          size="auto"
          zIndex={'var(--mantine-z-index-overlay)'}
          withCloseButton={false}
        >
          <Calendar
            getDayProps={(date) => ({
              onClick: () => {
                setSelectedDate(date);
                toggleIsDatesModalOpen(false);
              },
              selected: dayjs(date).isSame(new Date(), 'day'),
            })}
            getMonthControlProps={(date) => ({ selected: dayjs(date).isSame(new Date(), 'month') })}
          />
        </Modal>
      </Stack>

      <PartialSlideUpOverlay
        open={isAccountSelectOpen}
        id="account-select"
        onClose={() => toggleIsAccountSelectOpen()}
        height={'auto'}
        maxHeight={40}
      >
        <DefaultHeaderLayout title="Выбор Счёта" left={<BackButton />} size="md" />
        {accounts.map((account) => (
          <AccountItem
            account={account}
            key={account.id}
            selected={selectedAcc?.id === account.id}
            onClick={(id) => {
              setSelectedAccountId(id);
              toggleIsAccountSelectOpen();
            }}
          />
        ))}
      </PartialSlideUpOverlay>

      <PartialSlideUpOverlay
        open={isCurrencySelectOpen}
        id="currency-select"
        onClose={() => toggleIsCurrencySelectOpen()}
        height={90}
      >
        <DefaultHeaderLayout title="Валюта" left={<BackButton />} />
        <CurrencySelect
          selected={selectedCurrency}
          onChange={(code) => {
            setSelectedCurrency(code);
            toggleIsCurrencySelectOpen();
          }}
        />
      </PartialSlideUpOverlay>

      <PartialSlideUpOverlay
        height="auto"
        id="currency-val-edit"
        open={isCurrencyEditOpen}
        onClose={() => {
          toggleIsCurrencyEditOpen();
        }}
      >
        <EditCurrencyValue
          currency={selectedAcc!.currency!}
          onAccept={(val) => {
            setConvertedCurrency(val);
            toggleIsCurrencyEditOpen();
          }}
          defaultValue={convertedCurrency}
        />
      </PartialSlideUpOverlay>
    </>
  );
};
