import { create } from 'zustand';
import { IHomeStore } from '../types';

export const useHomeStore = create<IHomeStore>()((set, get) => ({
  selectedDate: new Date(),
  setSelectedDate: (date: Date) => set({ selectedDate: date }),
}));
