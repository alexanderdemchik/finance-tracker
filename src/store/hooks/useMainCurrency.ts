import { useAppStore } from '../store';

export function useMainCurrency() {
  return useAppStore((state) => state.currency);
}
