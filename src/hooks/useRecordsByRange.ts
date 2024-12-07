import dayjs from 'dayjs';
import { useMemo } from 'react';
import { DateRangeEnum } from '@/enums/DateRangeEnum';
import { useAppStore } from '@/store/store';

export function useRecordsByRange(date: Date, rangeType: DateRangeEnum) {
  const records = useAppStore((state) => state.records);

  return useMemo(() => {
    const dayjsDate = dayjs(date);
    return records.filter((el) => dayjsDate.isSame(el.date, rangeType === DateRangeEnum.MONTH ? 'month' : 'year'));
  }, [records, date, rangeType]);
}
