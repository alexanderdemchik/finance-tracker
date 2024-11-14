import { StateCreator } from 'zustand';
import { IStoreState } from '../store';
import { ICategory } from '@/types/ICategory';

export const BASE_ACCOUNT_TITLE = '_default_';

export interface ICategoriesSlice {
  categories: ICategory[];
  setCategories: (cats: ICategory[]) => void;
  toggleCategoryVisibility: (id: string) => void;
  addCategory: (cat: ICategory) => void;
}

export const createCategoriesSlice: StateCreator<IStoreState, [], [], ICategoriesSlice> = (set) => ({
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
