import { useMemo } from 'react';
import { useAppStore } from '../store/store';
import { IAccount } from '@/types/IAccount';

export const useAccounts = () => {
  const accounts = useAppStore((state) => state.accounts);
  const createAccount = useAppStore((state) => state.createAccount);
  const accountsById = useMemo(
    () => accounts.reduce((acc, curr) => ({ ...acc, [curr.id]: curr }), {} as Record<string, IAccount>),
    [accounts]
  );

  return {
    accounts,
    accountsById,
    defaultAccount: accounts.find((el) => el.default),
    createAccount,
  };
};
