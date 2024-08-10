import { Button, Flex, Group, Input, SimpleGrid, Stack, Text } from '@mantine/core';
import { FaCheck, FaEquals, FaMinus, FaPlus } from 'react-icons/fa6';
import { FaBackspace, FaCalendarAlt } from 'react-icons/fa';
import { useState } from 'react';
import clsx from 'clsx';
import classes from './AddRecordCalculator.module.css';
import { applyOperation } from '../../../helpers/math';
import { useAccounts } from '../../../hooks/useAccounts';
import { iconsToComponentsMap } from '../../../constants/iconsToComponentsMap';
import { CurrencyCodeEnum, signByCurrencyCode } from '../../../constants/currencies';

enum SpecialButtonsEnum {
  DATE = 'DATE',
  PLUS = 'PLUS',
  MINUS = 'MINUS',
  COMMA = 'COMMA',
  BACK = 'BACK',
  ACCEPT = 'ACCEPT',
  EQUALS = 'EQUALS',
}

const buttons = [
  7,
  8,
  9,
  SpecialButtonsEnum.DATE,
  4,
  5,
  6,
  SpecialButtonsEnum.PLUS,
  1,
  2,
  3,
  SpecialButtonsEnum.MINUS,
  SpecialButtonsEnum.COMMA,
  0,
  SpecialButtonsEnum.BACK,
  SpecialButtonsEnum.ACCEPT,
];

const specialButtonsContent = {
  [SpecialButtonsEnum.PLUS]: <FaPlus />,
  [SpecialButtonsEnum.MINUS]: <FaMinus />,
  [SpecialButtonsEnum.COMMA]: ',',
  [SpecialButtonsEnum.BACK]: <FaBackspace />,
  [SpecialButtonsEnum.ACCEPT]: <FaCheck />,
  [SpecialButtonsEnum.EQUALS]: <FaEquals />,
};

const ARITHMETIC_CHARACTERS_REGEX = /[+-]/gi;

const extractNumberFromString = (numstr: string = '') => Number(numstr.replace(',', '.')) || 0;
const numberToString = (num: number) => `${num}`.replace('.', ',');

interface IAddRecordCalculatorProps {
  onAccept: (val: number, currency: CurrencyCodeEnum, catId?: string) => void;
}

export const AddRecordCalculator = ({ onAccept }: IAddRecordCalculatorProps) => {
  const [resultField, setResultField] = useState('0');
  const { accounts, defaultAccount } = useAccounts();

  const isContainsArithmeticOperation = resultField.match(ARITHMETIC_CHARACTERS_REGEX);
  const isValidNumber = !isContainsArithmeticOperation && extractNumberFromString(resultField);
  const [selectedAccountId, setSelectedAccountId] = useState(defaultAccount?.id);
  const selectedAcc = accounts.find((el) => el.id === selectedAccountId);

  const handleButtonClick = (val: number | SpecialButtonsEnum) => {
    const getCurrentNumberStr = () => resultField.split(ARITHMETIC_CHARACTERS_REGEX).pop() || '';

    const isEmptyNumber = (numstr: string) => numstr === '0' || numstr === '';

    const getNumbers = (str: string): [number, number] => {
      const pieces = str.split(ARITHMETIC_CHARACTERS_REGEX);
      return [extractNumberFromString(pieces[0]), extractNumberFromString(pieces[1])];
    };

    const getArithmeticOperation = (str: string) => str.match(ARITHMETIC_CHARACTERS_REGEX)?.[0];

    if (val === SpecialButtonsEnum.ACCEPT) {
      if (selectedAcc) {
        onAccept(extractNumberFromString(resultField), selectedAcc.currency!, selectedAcc.id);
      }
      return;
    }

    setResultField((old) => {
      const lastElem = getCurrentNumberStr();

      if (typeof val === 'number') {
        if (isEmptyNumber(lastElem)) {
          return old.slice(0, old.length - lastElem.length).concat(`${val}`);
        }

        return old + val;
      }

      switch (val as SpecialButtonsEnum) {
        case SpecialButtonsEnum.COMMA: {
          if (lastElem === '') {
            return `${old}0,`;
          }

          if (!lastElem?.includes(',')) {
            return `${old},`;
          }

          break;
        }
        case SpecialButtonsEnum.PLUS: {
          if (isContainsArithmeticOperation) {
            return `${numberToString(applyOperation(...getNumbers(old), getArithmeticOperation(old)))}+`;
          }

          return `${old}+`;
        }
        case SpecialButtonsEnum.MINUS: {
          if (isContainsArithmeticOperation) {
            return `${numberToString(applyOperation(...getNumbers(old), getArithmeticOperation(old)))}-`;
          }

          return `${old}-`;
        }
        case SpecialButtonsEnum.BACK: {
          const newVal = old.slice(0, -1);

          return newVal || '0';
        }
        case SpecialButtonsEnum.EQUALS: {
          return `${numberToString(applyOperation(...getNumbers(old), getArithmeticOperation(old)))}`;
        }
      }

      return old;
    });
  };

  const renderButton = (el: number | SpecialButtonsEnum) => {
    if (el === SpecialButtonsEnum.DATE) {
      return (
        <Button color="dark.6" fz="lg" p="0" onClick={() => handleButtonClick(el)}>
          <Group gap="2" c="brand">
            <FaCalendarAlt size={14} style={{ paddingRight: '4px' }} />
            <Text fz="xs">Сегодня</Text>
          </Group>
        </Button>
      );
    }

    if (el === SpecialButtonsEnum.ACCEPT) {
      const type = isContainsArithmeticOperation
        ? SpecialButtonsEnum.EQUALS
        : SpecialButtonsEnum.ACCEPT;

      return (
        <Button
          fz="lg"
          p="0"
          onClick={() => handleButtonClick(type)}
          disabled={!isContainsArithmeticOperation && !isValidNumber}
          color={isContainsArithmeticOperation || isValidNumber ? undefined : 'dark.6'}
        >
          {specialButtonsContent[type]}
        </Button>
      );
    }

    return (
      <Button color="dark.6" fz="lg" p="0" onClick={() => handleButtonClick(el)}>
        {typeof el === 'number' ? el : specialButtonsContent[el]}
      </Button>
    );
  };

  return (
    <Stack p="xs" gap="xs" className={classes.wrapper}>
      <Group justify="space-between">
        <Group gap="xs">
          {accounts.map((acc) => {
            const Icon = iconsToComponentsMap[acc.icon];
            return (
              <Flex
                key={acc.id}
                className={clsx(classes.account, {
                  [classes.selected]: selectedAccountId === acc.id,
                })}
                onClick={() => setSelectedAccountId(acc.id)}
              >
                <Icon />
              </Flex>
            );
          })}
        </Group>
        <Text fw={500} size="lg">
          {!!selectedAcc && signByCurrencyCode[selectedAcc.currency!]} {resultField}
        </Text>
      </Group>
      <Input placeholder="Введите примечание" className={classes.input} />
      <SimpleGrid cols={4} spacing={4}>
        {buttons.map(renderButton)}
      </SimpleGrid>
    </Stack>
  );
};
