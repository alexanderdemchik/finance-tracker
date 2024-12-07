import { CurrencyCodeEnum } from '@/enums/CurrencyCodeEnum';
import { CurrencyConvertFn } from '../hooks/useCurrencyConverter';
import { roundMoneyValue } from './numbers';
import { IRecord } from '@/types/IRecord';
import { RecordTypeEnum } from '@/enums/RecordTypeEnum';

export function calculateRecordsIncomeExpenses(recs: IRecord[], defaultCurrency: CurrencyCodeEnum, converter: CurrencyConvertFn) {
  return recs
    .filter((el) => ![RecordTypeEnum.TRANSFER, RecordTypeEnum.CORRECTION].includes(el.type))
    .reduce(
      (acc, curr) => {
        if (curr.type === RecordTypeEnum.EXPENSES) {
          return {
            ...acc,
            expenses: roundMoneyValue(acc.expenses + converter(curr.value, curr.currency, defaultCurrency)),
          };
        }

        return { ...acc, income: roundMoneyValue(acc.income + converter(curr.value, curr.currency, defaultCurrency)) };
      },
      {
        expenses: 0,
        income: 0,
      }
    );
}
