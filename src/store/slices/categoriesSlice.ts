import { StateCreator } from 'zustand';
import { ICategoriesSlice, ICategory, IStoreState } from '../types';

export const BASE_ACCOUNT_TITLE = '_default_';

export const createCategoriesSlice: StateCreator<IStoreState, [], [], ICategoriesSlice> = (
  set
) => ({
  categories: [],
  setCategories: (categories: ICategory[]) => set({ categories }),
  toggleCategoryVisibility: (id: string) =>
    set((state) => ({
      categories: state.categories.map((el) => ({
        ...el,
        hidden: el.id === id ? !el.hidden : el.hidden,
      })),
    })),

  addCategory: (cat: ICategory) => {
    set((state) => ({ categories: [...state.categories, cat] }));
  },
});
