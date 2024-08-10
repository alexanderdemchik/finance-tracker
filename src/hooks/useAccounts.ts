import { useAppStore } from '../store/store';

export const useAccounts = () => {
  const accounts = useAppStore((state) => state.accounts);
  const createAccount = useAppStore((state) => state.createAccount);

  return {
    accounts,
    defaultAccount: accounts.find((el) => el.default),
    createAccount,
  };
};
