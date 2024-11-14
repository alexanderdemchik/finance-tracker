import { Button, Group, Input, Modal, SimpleGrid, Stack, Text } from '@mantine/core';
import { FaCheck, FaDivide, FaEquals, FaMinus, FaPlus, FaStarOfLife } from 'react-icons/fa6';
import { FaBackspace, FaCalendarAlt } from 'react-icons/fa';
import { ReactElement, useEffect, useMemo, useState } from 'react';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';
import { Calendar } from '@mantine/dates';
import classes from './AddEditRecordCalculator.module.css';
import { useAccounts } from '../../hooks/useAccounts';
import { CurrencyCodeEnum } from '@/enums/CurrencyCodeEnum';
import { PartialSlideUpOverlay } from '@/layout/SlideUpOverlay/PartialSlideUpOverlay';
import { DefaultHeaderLayout } from '@/layout/DefaultHeaderLayout';
import { BackButton } from '@/components/BackButton/BackButton';
import { CurrencySelect } from '@/components/CurrencySelect/CurrencySelect';
import { getAccountTitle } from '@/helpers/account';
import { getIconComponent } from '@/helpers/icons';
import {
  ARITHMETIC_CHARACTERS_REGEX,
  SupportedCalculatorCharacterType,
  useCalculatorController,
} from './useCalculatorController';
import { useCurrencyConverter } from '@/hooks/useCurrencyConverter';
import { EditCurrencyValue } from './EditCurrencyValue';
import { useLocalStore } from '@/hooks/useLocalStore';
import { AccountItem } from '@/pages/accounts/components/AccountsList/AccountItem';
import { IRecord } from '@/types/IRecord';
import { ICategory } from '@/types/ICategory';

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

interface IAddRecordCalculatorProps {
  editData?: IRecord;
  targetAccId?: string;
  sourceAccId?: string;
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

export const AddEditRecordCalculator = ({
  onAccept,
  category,
  editData,
  sourceAccId,
  targetAccId,
}: IAddRecordCalculatorProps) => {
  const { t } = useTranslation();

  const isTransferMode = sourceAccId && targetAccId;

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
    targetAccountId: undefined,
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

  const sourceAccountId = isTransferMode ? sourceAccId : selectedAccountId;
  const sourceAccount = accounts.find((el) => el.id === sourceAccountId);
  const targetAccount = accounts.find((el) => el.id === targetAccId);

  const sourceCurrency = isTransferMode ? sourceAccount?.currency : selectedCurrency;
  const targetCurrency = isTransferMode ? targetAccount?.currency : sourceAccount?.currency;

  const isCurrencyDiffersFromAccount = sourceCurrency !== targetCurrency;

  const displayDate = useMemo(() => {
    if (dayjs(selectedDate).isSame(new Date(), 'day')) {
      return 'Сегодня';
    }

    return dayjs(selectedDate).format('DD.MM.YYYY');
  }, [selectedDate]);

  const isToday = useMemo(() => dayjs(selectedDate).isSame(new Date(), 'day'), [selectedDate]);

  const handleCalculatorButtonClick = (val: number | ExtendedCalculatorCharactersType) => {
    const value = isCurrencyDiffersFromAccount ? Number(convertedCurrency) : enteredNumber;
    const currency = targetCurrency!;

    switch (val) {
      case 'accept':
        onAccept({
          value,
          currency,
          accId: sourceAccountId,
          originalValue: isCurrencyDiffersFromAccount ? enteredNumber : undefined,
          originalCurrency: isCurrencyDiffersFromAccount ? sourceCurrency : undefined,
          date: selectedDate.getTime(),
        });

        break;
      case 'date':
        toggleIsDatesModalOpen();
    }

    // default handlers
    handleInput(val as SupportedCalculatorCharacterType);
  };

  const renderCalculatorButton = (el: number | ExtendedCalculatorCharactersType) => {
    if (el === 'date') {
      return (
        <Button color="dark.6" fz="lg" p="0" onClick={() => handleCalculatorButtonClick(el)}>
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
          <Button color="dark.6" fz="lg" p="0" onClick={() => handleCalculatorButtonClick(el)} flex={1}>
            {calculatorCharacterContentMap[el]}
          </Button>
          <Button color="dark.6" fz="lg" p="0" onClick={() => handleCalculatorButtonClick('*')} flex={1}>
            {calculatorCharacterContentMap['*']}
          </Button>
        </Group>
      );
    }

    if (el === '-') {
      return (
        <Group gap={4}>
          <Button color="dark.6" fz="lg" p="0" onClick={() => handleCalculatorButtonClick(el)} flex={1}>
            {calculatorCharacterContentMap[el]}
          </Button>
          <Button color="dark.6" fz="lg" p="0" onClick={() => handleCalculatorButtonClick('/')} flex={1}>
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
          onClick={() => handleCalculatorButtonClick(type)}
          disabled={!isContainsArithmeticOperation && !isValid}
          color={isContainsArithmeticOperation || isValid ? undefined : 'dark.6'}
        >
          {calculatorCharacterContentMap[type]}
        </Button>
      );
    }

    return (
      <Button color="dark.6" fz="lg" p="0" onClick={() => handleCalculatorButtonClick(el)}>
        {typeof el === 'number' ? el : calculatorCharacterContentMap[el]}
      </Button>
    );
  };

  useEffect(() => {
    setConvertedCurrency(`${convert(enteredNumber || 0, sourceCurrency!, targetCurrency!)}`);
  }, [isCurrencyDiffersFromAccount, enteredNumber, sourceCurrency, sourceAccount!.currency!]);

  return (
    <>
      <Group gap={0} className={classes.direction}>
        <Group
          gap="xxs"
          key={sourceAccountId}
          className={clsx(classes.account)}
          style={{ '--color': sourceAccount?.color! }}
          onClick={() => {
            if (!isTransferMode) {
              toggleIsAccountSelectOpen();
            }
          }}
          flex={1}
        >
          {getIconComponent(sourceAccount?.icon)}
          <Text size="xs">{getAccountTitle(sourceAccount?.title || '', t)}</Text>
        </Group>

        {!isTransferMode ? (
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
        ) : (
          <Group
            gap="xxs"
            key={targetAccount!.id}
            className={clsx(classes.account)}
            style={{ '--color': targetAccount!.color! }}
            flex={1}
          >
            {getIconComponent(targetAccount!.icon)}
            <Text size="xs">{getAccountTitle(targetAccount?.title || '', t)}</Text>
          </Group>
        )}
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
                {targetCurrency}
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
            <Text
              fw={400}
              component="span"
              size="sm"
              c="dimmed"
              onClick={() => !isTransferMode && toggleIsCurrencySelectOpen()}
              lh={1}
            >
              {sourceCurrency || ''}
            </Text>

            <Text fw={500} size="lg" className={classes['calc-field']} lh="xs">
              {renderCalculatorField(result)}
            </Text>
          </Group>
        </Stack>
        <Input placeholder="Введите примечание" className={classes.input} />
        <SimpleGrid cols={4} spacing={4}>
          {buttons.map(renderCalculatorButton)}
        </SimpleGrid>
        <Modal
          opened={isDatesModalOpen}
          onClose={toggleIsDatesModalOpen}
          centered
          size="auto"
          zIndex="var(--mantine-z-index-overlay)"
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
        height="auto"
        maxHeight={40}
      >
        <DefaultHeaderLayout title="Выбор Счёта" left={<BackButton />} size="md" />
        {accounts.map((account) => (
          <AccountItem
            account={account}
            key={account.id}
            selected={sourceAccount?.id === account.id}
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
          selected={sourceCurrency}
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
          currency={targetCurrency!}
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
