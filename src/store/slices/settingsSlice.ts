import { StateCreator } from 'zustand';
import { CurrencyCodeEnum } from '@/enums/CurrencyCodeEnum';
import { IStoreState } from '../store';

export interface ISettingsSlice {
  currency: CurrencyCodeEnum;
  setCurrency: (c: CurrencyCodeEnum) => void;
  setInitialCurrency: (c: CurrencyCodeEnum) => void;
}

export const createSettingsSlice: StateCreator<IStoreState, [], [], ISettingsSlice> = (set) => ({
  currency: null as unknown as CurrencyCodeEnum,
  setCurrency: (currency: CurrencyCodeEnum) => set({ currency }),
  setInitialCurrency: (currency: CurrencyCodeEnum) => {
    set((state) => ({
      currency,
      accounts: state.accounts.map((el) => (el.currency === null ? { ...el, currency } : el)),
    }));
  },
});
