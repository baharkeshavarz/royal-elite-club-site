import { createContext } from 'react';

export interface IFiltersContext<T = any> {
  filters: T;
  onChanged: (T: any) => void;
}

export const filtersContext = createContext<IFiltersContext>({
  filters: {},
  onChanged: () => {},
});
