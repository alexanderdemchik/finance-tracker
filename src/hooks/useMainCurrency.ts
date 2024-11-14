import { useAppStore } from '../store/store';

export function useMainCurrency() {
  return useAppStore((state) => state.currency);
}
