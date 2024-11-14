import { StateCreator } from 'zustand';
import { v4 } from 'uuid';
import { CurrencyCodeEnum } from '@/enums/CurrencyCodeEnum';
import { IStoreState } from '../store';
import { IAccount } from '@/types/IAccount';

export const BASE_ACCOUNT_TITLE = '_default_';

export interface IAccountsSlice {
  accounts: IAccount[];
  createAccount: (ac: IAccount) => void;
  updateAccountBalance: (id: string, change: number) => void;
}

export const createAccountSlice: StateCreator<IStoreState, [], [], IAccountsSlice> = (set) => ({
  accounts: [
    {
      id: v4(),
      title: BASE_ACCOUNT_TITLE,
      currency: null as unknown as CurrencyCodeEnum,
      default: true,
      icon: 'moneyStack',
      balance: 0,
    },
  ],
  createAccount: (acc: IAccount) => {
    set((state) => ({ accounts: [...state.accounts, acc] }));
  },
  updateAccountBalance: (accId: string, change: number) =>
    set((state) => ({
      accounts: state.accounts.map((el) => {
        if (el.id === accId) {
          return {
            ...el,
            balance: el.balance + change,
          };
        }

        return el;
      }),
    })),
});
