import { CurrencyCodeEnum } from '../constants/currencies';
import { CurrencyConvertFn } from '../hooks/useCurrencyConverter';
import { IRecord, RecordTypeEnum } from '../store/types';

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
          expenses: acc.expenses + converter(curr.value, curr.currency, defaultCurrency),
        };
      }

      return { ...acc, income: acc.income + converter(curr.value, curr.currency, defaultCurrency) };
    },
    {
      expenses: 0,
      income: 0,
    }
  );
}
