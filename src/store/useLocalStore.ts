import { capitalize } from '@/helpers/strings';
import { useRef } from 'react';
import { create } from 'zustand';

type AddMethods<T> = {
  [K in keyof T as T[K] extends boolean
    ? `toggle${Capitalize<string & K>}` | `set${Capitalize<string & K>}`
    : `set${Capitalize<string & K>}`]: T[K] extends boolean ? (value?: T[K]) => void : (value: T[K]) => void;
};

export interface IBaseLocalStore {
  [key: string]: any;
}

function addMethods<T extends IBaseLocalStore>(
  initialState: T,
  set: (
    partial: (T & AddMethods<T>) | (T & AddMethods<T>) | ((state: T & AddMethods<T>) => T & AddMethods<T>),
    replace?: false
  ) => void
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

export function useLocalStore<T extends Object>(initialState: T) {
  const ref = useRef(
    create<T & AddMethods<T>>((set) => ({
      ...initialState,
      ...addMethods(initialState, set),
    }))
  );

  return ref.current;
}

type t = AddMethods<{ l?: string }>;
  