import { create } from 'zustand';
import { createJSONStorage, persist, StateStorage } from 'zustand/middleware';
import { deepMerge } from '@mantine/core';
import { get, set, del } from 'idb-keyval'; // can use anything: IndexedDB, Ionic Storage, etc.
import { ICategory, IStoreState } from './types';
import { createLayoutSlice } from './slices/layoutSlice';
import { createAccountSlice } from './slices/accountsSlice';
import { createRecordsSlice } from './slices/recordsSlice';
import * as recordsDb from '../db/records';
import { createSettingsSlice } from './slices/settingsSlice';
import { createCategoriesSlice } from './slices/categoriesSlice';
import { defaultCategories } from '../constants/categories';

// Custom storage object
const storage: StateStorage = {
  getItem: async (name: string): Promise<string | null> => (await get(name)) || null,
  setItem: async (name: string, value: string): Promise<void> => {
    await set(name, value);
  },
  removeItem: async (name: string): Promise<void> => {
    await del(name);
  },
};

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
      storage: createJSONStorage(() => storage),
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
