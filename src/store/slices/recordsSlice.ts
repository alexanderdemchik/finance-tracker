import { StateCreator } from 'zustand';
import * as recordsDb from '../../db/records';
import { IStoreState } from '../store';
import { IRecord } from '@/types/IRecord';
import { RecordTypeEnum } from '@/enums/RecordTypeEnum';

export interface IRecordsSlice {
  records: IRecord[];
  addRecord: (rec: IRecord) => void;
  delRecord: (rec: IRecord) => void;
  editRecord: (rec: IRecord) => void;
}

export const createRecordsSlice: StateCreator<IStoreState, [], [], IRecordsSlice> = (set, get) => ({
  records: [],
  addRecord: async (record: IRecord) => {
    await recordsDb.set(record);
    set((state) => ({ records: [...state.records, record] }));

    if (!record.accId) return;

    if (record.type === RecordTypeEnum.TRANSFER) {
      get().updateAccountBalance(record.accId, +record.value);
      get().updateAccountBalance(record.sourceAccId!, -record.sourceValue!);
    } else if (record.type === RecordTypeEnum.CORRECTION) {
      get().updateAccountBalance(record.accId, record.value);
    } else {
      get().updateAccountBalance(record.accId, record.type === RecordTypeEnum.INCOME ? record.value : -record.value);
    }
  },
  delRecord: async (record: IRecord) => {
    await recordsDb.del(record.id);
    set((state) => ({ records: state.records.filter((el) => el.id !== record.id) }));

    if (!record.accId) return;

    if (record.type === RecordTypeEnum.TRANSFER) {
      get().updateAccountBalance(record.accId, -record.value);
      get().updateAccountBalance(record.sourceAccId!, record.sourceValue!);
    } else {
      get().updateAccountBalance(record.accId, -record.value);
    }
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

    // return accounts balance to before record state
    if (record.type === RecordTypeEnum.TRANSFER) {
      get().updateAccountBalance(recordBeforeUpdate.accId!, -record.value);
      get().updateAccountBalance(recordBeforeUpdate.sourceAccId!, +record.sourceValue!);
    } else {
      get().updateAccountBalance(recordBeforeUpdate.accId!, record.type === RecordTypeEnum.INCOME ? -record.value : +record.value);
    }

    // apply add logic TODO: DRY
    if (record.type === RecordTypeEnum.TRANSFER) {
      get().updateAccountBalance(record.accId!, record.value);
      get().updateAccountBalance(record.sourceAccId!, -record.sourceValue!);
    } else {
      get().updateAccountBalance(record.accId!, record.type === RecordTypeEnum.INCOME ? record.value : -record.value);
    }
  },
});
