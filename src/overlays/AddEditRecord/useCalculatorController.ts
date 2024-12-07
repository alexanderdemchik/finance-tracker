import { useState } from 'react';
import { applyOperation } from '@/helpers/math';

export const ARITHMETIC_CHARACTERS_REGEX = /(?<=.)[*/+-]/gi;

export type SupportedCalculatorCharacterType = '/' | '*' | '+' | '-' | '=' | '.' | 'back';

export const extractNumberFromString = (numstr: string = '') => Number(numstr) ?? NaN;
export const numberToString = (num: number) => Number(num.toFixed(2)).toString();

export function useCalculatorController(defaultValue = '0') {
  const [result, setResult] = useState(defaultValue);

  const isContainsArithmeticOperation = result.match(ARITHMETIC_CHARACTERS_REGEX);

  const enteredNumber = extractNumberFromString(result);
  const isValid = !Number.isNaN(enteredNumber);

  const handleInput = (val: number | SupportedCalculatorCharacterType) => {
    const getCurrentNumberStr = () => result.split(ARITHMETIC_CHARACTERS_REGEX).pop() || '';

    const isEmptyNumber = (numstr: string) => numstr === '0' || numstr === '';

    const getNumbers = (str: string): [number, number] => {
      const pieces = str.split(ARITHMETIC_CHARACTERS_REGEX);
      return [extractNumberFromString(pieces[0]), extractNumberFromString(pieces[1])];
    };

    const getArithmeticOperation = (str: string) => str.match(ARITHMETIC_CHARACTERS_REGEX)?.[0];

    setResult((old) => {
      const lastElem = getCurrentNumberStr();

      if (typeof val === 'number') {
        if (isEmptyNumber(lastElem)) {
          return old.slice(0, old.length - lastElem.length).concat(`${val}`);
        }

        return old + val;
      }

      switch (val as SupportedCalculatorCharacterType) {
        case '.': {
          if (lastElem === '') {
            return `${old}0.`;
          }

          if (!lastElem?.includes('.')) {
            return `${old}.`;
          }

          break;
        }
        case '+':
        case '-':
        case '*':
        case '/': {
          if (isContainsArithmeticOperation) {
            return `${numberToString(applyOperation(...getNumbers(old), getArithmeticOperation(old)))}${val}`;
          }

          return `${old}${val}`;
        }
        case 'back': {
          const newVal = old.slice(0, -1);

          return newVal || '0';
        }
        case '=': {
          return `${numberToString(applyOperation(...getNumbers(old), getArithmeticOperation(old)))}`;
        }
      }

      return old;
    });
  };

  const modify = (val: string) => {
    setResult(val);
  };

  return {
    result,
    setResult,
    isValid,
    handleInput,
    isContainsArithmeticOperation,
    enteredNumber,
    modify,
  };
}
