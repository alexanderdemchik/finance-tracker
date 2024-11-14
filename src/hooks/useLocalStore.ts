import { useRef } from 'react';
import { create } from 'zustand';
import { capitalize } from '@/helpers/strings';

type AddMethods<T> = {
  [K in keyof T & string as T[K] extends boolean
    ? `toggle${Capitalize<K>}` | `set${Capitalize<K>}`
    : `set${Capitalize<K>}`]: T[K] extends boolean ? (value?: T[K]) => void : (value?: T[K] | undefined) => void;
};

export interface IBaseLocalStore {
  [key: string]: any;
}

function addMethods<T extends IBaseLocalStore>(
  initialState: T,
  set: (partial: (T & AddMethods<T>) | ((state: T & AddMethods<T>) => T & AddMethods<T>), replace?: false) => void
) {
  const keys = Object.keys(initialState);

  return keys.reduce((acc, curr) => {
    if (typeof initialState[curr] === 'boolean') {
      const methodsToAdd = {
        [`set${capitalize(curr)}`]: (val: T[keyof T]) => set({ [curr]: val } as T & AddMethods<T>),
        [`toggle${capitalize(curr)}`]: (val?: T[keyof T]) => {
          if (val === undefined) {
            set((state) => ({ [curr]: !state[curr] }) as T & AddMethods<T>);
          } else {
            set({ [curr]: val } as T & AddMethods<T>);
          }
        },
      };

      return { ...acc, ...methodsToAdd };
    }

    return {
      ...acc,
      [`set${capitalize(curr)}`]: (val: T[keyof T]) => set({ [curr]: val } as T & AddMethods<T>),
    };
  }, {} as AddMethods<T>);
}

export function createLocalStore<T extends IBaseLocalStore>(initialState: T) {
  return create<T & AddMethods<T>>((set) => ({
    ...initialState,
    ...addMethods(initialState, set),
  }));
}

export function useLocalStore<T extends IBaseLocalStore>(initialState: T) {
  const ref = useRef(
    create<T & AddMethods<T>>((set) => ({
      ...initialState,
      ...addMethods(initialState, set),
    }))
  );

  return ref.current;
}
