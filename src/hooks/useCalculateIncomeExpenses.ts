import { useMemo } from 'react';
import { IRecord } from '../store/types';
import { calculateRecordsIncomeExpenses } from '../helpers/calculateRecordsIncomeExpenses';
import { useDefaultCurrency } from './useDefaultCurrency';
import { useCurrencyConverter } from './useCurrencyConverter';

export function useCalculateIncomeExpenses(records: IRecord[]) {
  const defaultCurrency = useDefaultCurrency();
  const { convert } = useCurrencyConverter();

  return useMemo(
    () => calculateRecordsIncomeExpenses(records, defaultCurrency, convert),
    [records]
  );
}
