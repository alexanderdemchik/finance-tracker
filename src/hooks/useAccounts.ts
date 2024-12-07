import { useMemo } from 'react';
import { useAppStore } from '../store/store';
import { IAccount } from '@/types/IAccount';

export const useAccounts = () => {
  const accounts = useAppStore((state) => state.accounts);
  const accountsById = useMemo(() => accounts.reduce((acc, curr) => ({ ...acc, [curr.id]: curr }), {} as Record<string, IAccount>), [accounts]);
  const displayedAccounts = useMemo(() => accounts.filter((acc) => !acc.hidden), [accounts]);
  const hiddenAccounts = useMemo(() => accounts.filter((acc) => acc.hidden), [accounts]);

  const createAccount = useAppStore((state) => state.createAccount);
  const setAccounts = useAppStore((state) => state.setAccounts);
  const editAccount = useAppStore((state) => state.editAccount);

  return {
    accounts,
    accountsById,
    defaultAccount: accounts.find((el) => el.default),
    displayedAccounts,
    hiddenAccounts,
    createAccount,
    setAccounts,
    editAccount,
  };
};
