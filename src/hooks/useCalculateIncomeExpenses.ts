import { useMemo } from 'react';
import { calculateRecordsIncomeExpenses } from '../helpers/calculateRecordsIncomeExpenses';
import { useDefaultCurrency } from './useDefaultCurrency';
import { useCurrencyConverter } from './useCurrencyConverter';
import { IRecord } from '@/types/IRecord';

export function useCalculateIncomeExpenses(records: IRecord[]) {
  const defaultCurrency = useDefaultCurrency();
  const { convert } = useCurrencyConverter();

  return useMemo(
    () => calculateRecordsIncomeExpenses(records, defaultCurrency, convert),
    [records]
  );
}
