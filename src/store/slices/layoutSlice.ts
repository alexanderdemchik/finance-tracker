import { StateCreator } from 'zustand';
import { ILayoutSlice, IStoreState } from '../types';

export const createLayoutSlice: StateCreator<IStoreState, [], [], ILayoutSlice> = (set) => ({
  isAddingRecord: false,
  toggleAddingRecord: () => {
    set((state) => ({ layout: { ...state.layout, isAddingRecord: !state.layout.isAddingRecord } }));
  },
});
