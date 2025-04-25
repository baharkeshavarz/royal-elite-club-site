import { useContext } from 'react';
import GridContext from '../context/GridContext';

const useGrid = () => useContext(GridContext);
export default useGrid;
