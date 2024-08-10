import { useCallback } from 'react';
import { CurrencyCodeEnum } from '../constants/currencies';
import { defaultConvertionRates } from '../constants/defaultConversionRates';

export type CurrencyConvertFn = (
  val: number,
  from: CurrencyCodeEnum,
  to: CurrencyCodeEnum
) => number;

export function useCurrencyConverter() {
  const convert: CurrencyConvertFn = useCallback(
    (val: number, from: CurrencyCodeEnum, to: CurrencyCodeEnum) => {
      if (from === to) {
        return val;
      }

      const rate = defaultConvertionRates[to]?.[from] || 1;

      return Number(Number(val / rate).toFixed(2));
    },
    []
  );

  return { convert };
}
