import { useCallback } from 'react';
import { CurrencyCodeEnum } from "@/enums/CurrencyCodeEnum";
import { defaultConvertionRates as dfRate } from '../constants/defaultConversionRates';

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

      let rate = 1;

      if (dfRate[to]?.[from]) {
        rate = dfRate[to][from];
      } else if (dfRate[CurrencyCodeEnum.USD]?.[to] && dfRate[CurrencyCodeEnum.USD]?.[from]) {
        rate = dfRate[CurrencyCodeEnum.USD][to] / dfRate[CurrencyCodeEnum.USD][from];
      }

      return Number(Number(val / rate).toFixed(2));
    },
    []
  );

  return { convert };
}
