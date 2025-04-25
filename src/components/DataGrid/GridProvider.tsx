import { GridApi } from 'ag-grid-community';
import { useRef } from 'react';
import GridContext from './context/GridContext';

const GridProvider = ({ children }: { children: any }) => {
  const gridRef = useRef<GridApi | null>(null);

  return (
    <GridContext.Provider
      value={{
        gridRef,
      }}
    >
      {children}
    </GridContext.Provider>
  );
};

export default GridProvider;
