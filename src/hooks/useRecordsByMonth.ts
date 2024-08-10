import { useMemo } from 'react';
import dayjs from 'dayjs';
import { useRecords } from './useRecords';

export const useRecordsByMonth = (month: number) => {
  const { raw: records } = useRecords();

  return useMemo(() => records.filter((el) => dayjs(el.date).month() === month), [records, month]);
};
