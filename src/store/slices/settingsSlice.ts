import { StateCreator } from 'zustand';
import { ISettingsSlice, IStoreState } from '../types';
import { CurrencyCodeEnum } from '../../constants/currencies';

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
