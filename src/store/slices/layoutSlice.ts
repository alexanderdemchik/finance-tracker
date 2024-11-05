import { StateCreator } from 'zustand';
import { ILayoutSlice, IRecord, IStoreState } from '../types';

export const createLayoutSlice: StateCreator<IStoreState, [], [], ILayoutSlice> = (set) => ({
  isAddingRecord: false,
  editRecordData: undefined,
  toggleAddingRecord: (editData?: IRecord) => {
    set((state) => ({
      layout: { ...state.layout, isAddingRecord: !state.layout.isAddingRecord, editRecordData: editData },
    }));
  },
});
