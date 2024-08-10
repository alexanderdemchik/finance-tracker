import { StateCreator } from 'zustand';
import { IRecord, IRecordsSlice, IStoreState } from '../types';
import * as recordsDb from '../../db/records';

export const createRecordsSlice: StateCreator<IStoreState, [], [], IRecordsSlice> = (set, get) => ({
  records: [],
  addRecord: (record: IRecord) => {
    recordsDb.add(record);
    set((state) => ({ records: [...state.records, record] }));
    get().updateAccountBalance(record.id, record.value, record.type);
  },
});
