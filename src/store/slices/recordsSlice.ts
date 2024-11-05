import { StateCreator } from 'zustand';
import { IRecord, IRecordsSlice, IStoreState } from '../types';
import * as recordsDb from '../../db/records';

export const createRecordsSlice: StateCreator<IStoreState, [], [], IRecordsSlice> = (set, get) => ({
  records: [],
  addRecord: async (record: IRecord) => {
    await recordsDb.set(record);
    set((state) => ({ records: [...state.records, record] }));
    record.accId && get().updateAccountBalance(record.accId, record.value, record.type);
  },
  delRecord: async (record: IRecord) => {
    await recordsDb.del(record.id);
    set((state) => ({ records: state.records.filter((el) => el.id !== record.id) }));
    record.accId && get().updateAccountBalance(record.accId, -record.value, record.type);
  },
  editRecord: async (record: IRecord) => {
    const recordBeforeUpdate = get().records.find((el) => el.id === record.id)!;

    await recordsDb.set(record);
    set((state) => ({
      records: state.records.map((el) => {
        if (el.id === record.id) {
          return record;
        }

        return el;
      }),
    }));

    record.accId && get().updateAccountBalance(record.accId, -recordBeforeUpdate.value + record.value, record.type);
  },
});

