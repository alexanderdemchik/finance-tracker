import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { deepMerge } from '@mantine/core';
import { createLayoutSlice, ILayoutSlice } from './slices/layoutSlice';
import { createAccountSlice, IAccountsSlice } from './slices/accountsSlice';
import { createRecordsSlice, IRecordsSlice } from './slices/recordsSlice';
import * as recordsDb from '../db/records';
import { createSettingsSlice, ISettingsSlice } from './slices/settingsSlice';
import { createCategoriesSlice, ICategoriesSlice } from './slices/categoriesSlice';
import { defaultCategories } from '../constants/categories';
import { ICategory } from '@/types/ICategory';

export interface IStoreState extends IAccountsSlice, IRecordsSlice, ISettingsSlice, ICategoriesSlice {
  layout: ILayoutSlice;
  _hasHydrated: boolean;
  setHasHydrated: (a: boolean) => void;
}

export const useAppStore = create<IStoreState>()(
  persist(
    (...a) => ({
      layout: createLayoutSlice(...a),
      ...createAccountSlice(...a),
      ...createRecordsSlice(...a),
      ...createSettingsSlice(...a),
      ...createCategoriesSlice(...a),
      _hasHydrated: false,
      setHasHydrated: (val) => {
        a[0]({ _hasHydrated: val });
      },
    }),
    {
      name: 'storage',
      storage: createJSONStorage(() => localStorage),
      merge: (persistedState, currentState) => deepMerge(currentState, persistedState),
      partialize: (state) =>
        Object.fromEntries(
          Object.entries(state).filter(([key]) => !['records', 'layout', '_hasHydrated'].includes(key))
        ),
      onRehydrateStorage: () => (state) => {
        state?.setCategories(mergeCategoriesWithDefaultCategories(state.categories, defaultCategories));
        state?.setHasHydrated(true);
      },
    }
  )
);

export function mergeCategoriesWithDefaultCategories(cats: ICategory[], defCats: ICategory[]): ICategory[] {
  const catsIds = cats.map((el) => el.id);
  const defCatsToAdd = defCats.filter((el) => !catsIds.includes(el.id));

  return [...cats, ...defCatsToAdd];
}

recordsDb.getAll().then((records) => useAppStore.setState({ records }));
