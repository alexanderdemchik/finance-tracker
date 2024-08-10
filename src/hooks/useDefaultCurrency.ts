import { useAppStore } from '../store/store';

export function useDefaultCurrency() {
  return useAppStore((state) => state.currency);
}
