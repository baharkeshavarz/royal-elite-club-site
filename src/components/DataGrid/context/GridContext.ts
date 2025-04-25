import { GridApi } from 'ag-grid-community';
import { MutableRefObject, createContext } from 'react';

export interface GridContextProps {
  gridRef: MutableRefObject<GridApi | null> | null;
}

export default createContext<GridContextProps>({
  gridRef: null,
});
