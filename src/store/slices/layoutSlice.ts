import { StateCreator } from 'zustand';
import { IStoreState } from '../store';
import { IRecord } from '@/types/IRecord';

export interface ILayoutSlice {
  isAddingRecord: boolean;
  editRecordData?: IRecord;
  toggleAddingRecord: (editData?: IRecord) => void;
}

export const createLayoutSlice: StateCreator<IStoreState, [], [], ILayoutSlice> = (set) => ({
  isAddingRecord: false,
  editRecordData: undefined,
  toggleAddingRecord: (editData?: IRecord) => {
    set((state) => ({
      layout: { ...state.layout, isAddingRecord: !state.layout.isAddingRecord, editRecordData: editData },
    }));
  },
});
