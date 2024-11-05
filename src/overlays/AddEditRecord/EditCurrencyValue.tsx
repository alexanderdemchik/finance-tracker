import { FaCheck, FaDivide, FaEquals, FaMinus, FaPlus, FaStarOfLife } from 'react-icons/fa6';
import {
  ARITHMETIC_CHARACTERS_REGEX,
  SupportedCalculatorCharacterType,
  useCalculatorController,
} from './useCalculatorController';
import { FaBackspace } from 'react-icons/fa';
import { ReactElement } from 'react';
import { Button, Group, SimpleGrid, Stack, Text } from '@mantine/core';
import { CurrencyCodeEnum } from '@/constants/currencies';
import classes from './AddEditRecordCalculator.module.css';

type ExtendedCalculatorCharactersType = SupportedCalculatorCharacterType | 'reset' | 'accept';

const buttons: (ExtendedCalculatorCharactersType | number)[] = [
  7,
  8,
  9,
  'reset',
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
  reset: 'reset',
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

interface IEditCurrencyValueProps {
  defaultValue: string;
  currency: CurrencyCodeEnum;
  onAccept: (val: string) => void;
}

export function EditCurrencyValue({ defaultValue, onAccept, currency }: IEditCurrencyValueProps) {
  const { result, isContainsArithmeticOperation, isValid, handleInput, modify } = useCalculatorController(defaultValue);

  const handleButtonClick = (val: number | ExtendedCalculatorCharactersType) => {
    switch (val) {
      case 'reset':
        modify(defaultValue);
        break;
      case 'accept':
        onAccept(Number(result).toFixed(2));
        break;
    }

    // default handlers
    handleInput(val as SupportedCalculatorCharacterType);
  };

  const renderButton = (el: number | ExtendedCalculatorCharactersType) => {
    if (el === 'reset') {
      return (
        <Button color="dark.6" fz="xs" p="0" onClick={() => handleButtonClick('reset')}>
          Сбросить
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
          disabled={!isContainsArithmeticOperation && !isValid}
          color={isContainsArithmeticOperation || isValid ? undefined : 'dark.6'}
          onClick={() => handleButtonClick(type)}
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

  return (
    <Stack p="xs" bg="dark.9" gap="xxs">
      <Group gap="xxs" justify="flex-end" align="center">
        <Text fw={400} component="span" size="xs" c="dimmed">
          {currency}
        </Text>
        <Text fw={500} size="lg" lh="xs" className={classes['calc-field']}>
          {renderCalculatorField(result)}
        </Text>
      </Group>
      <SimpleGrid cols={4} spacing={4}>
        {buttons.map(renderButton)}
      </SimpleGrid>
    </Stack>
  );
}
