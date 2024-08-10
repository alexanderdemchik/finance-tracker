import { useMemo } from 'react';
import { useAppStore } from '../store/store';
import { IRecord } from '../store/types';

export const useRecords = () => {
  const records = useAppStore((state) => state.records);
  const byId = useMemo(
    () =>
      records.reduce((acc, curr) => ({ ...acc, [curr.id]: curr }), {} as Record<string, IRecord>),
    [records]
  );

  return {
    raw: records,
    byId,
  };
};
