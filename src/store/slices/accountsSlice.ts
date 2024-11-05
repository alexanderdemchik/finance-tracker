import { StateCreator } from 'zustand';
import { v4 } from 'uuid';
import { IAccount, IAccountsSlice, IStoreState, RecordTypeEnum } from '../types';
import { CurrencyCodeEnum } from '@/constants/currencies';

export const BASE_ACCOUNT_TITLE = '_default_';

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
  updateAccountBalance: (accId: string, change: number, type: RecordTypeEnum) =>
    set((state) => ({
      accounts: state.accounts.map((el) => {
        if (el.id === accId) {
          return {
            ...el,
            balance: type === RecordTypeEnum.INCOME ? el.balance + change : el.balance - change,
          };
        }

        return el;
      }),
    })),
});
