import { useContext } from 'react';
import { filtersContext } from '../contexts/filtersContext';

const useFiltersContext = () => useContext(filtersContext);

export default useFiltersContext;
