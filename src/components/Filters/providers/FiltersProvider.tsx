import React, { FC, ReactNode, useCallback, useState } from 'react';
import { filtersContext } from '../contexts/filtersContext';

export interface FiltersProviderProps {
  children: ReactNode;
}
const FiltersProvider: FC<FiltersProviderProps> = ({ children }) => {
  const [filters, setFilters] = useState({});
  const onChanged = useCallback((value: any) => {
    setFilters(value);
  }, []);

  return (
    <filtersContext.Provider value={{ filters: filters, onChanged }}>
      {children}
    </filtersContext.Provider>
  );
};

export default FiltersProvider;
