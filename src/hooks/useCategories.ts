import { useAppStore } from '../store/store';
import { ICategory } from '../store/types';

export function useCategories() {
  const categories = useAppStore((state) => state.categories);
  const setCategories = useAppStore((state) => state.setCategories);
  const toggleCategoryVisibility = useAppStore((state) => state.toggleCategoryVisibility);
  const addCategory = useAppStore((state) => state.addCategory);

  return {
    raw: categories,
    byId: categories.reduce<Record<string, ICategory>>(
      (acc, curr) => ({ ...acc, [curr.id]: curr }),
      {}
    ),
    setCategories,
    toggleCategoryVisibility,
    addCategory,
  };
}
