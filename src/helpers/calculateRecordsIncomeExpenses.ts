import { CurrencyCodeEnum } from '@/enums/CurrencyCodeEnum';
import { CurrencyConvertFn } from '../hooks/useCurrencyConverter';
import { formatNumber } from './numbers';
import { IRecord } from '@/types/IRecord';
import { RecordTypeEnum } from '@/enums/RecordTypeEnum';

export function calculateRecordsIncomeExpenses(
  recs: IRecord[],
  defaultCurrency: CurrencyCodeEnum,
  converter: CurrencyConvertFn
) {
  return recs.reduce(
    (acc, curr) => {
      if (curr.type === RecordTypeEnum.EXPENSES) {
        return {
          ...acc,
          expenses: formatNumber(acc.expenses + converter(curr.value, curr.currency, defaultCurrency)),
        };
      }

      return { ...acc, income: formatNumber(acc.income + converter(curr.value, curr.currency, defaultCurrency)) };
    },
    {
      expenses: 0,
      income: 0,
    }
  );
}
