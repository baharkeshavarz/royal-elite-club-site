import { CustomCellRendererProps } from 'ag-grid-react';
import { FC } from 'react';

const Number: FC<CustomCellRendererProps> = props => {
  const value = +props?.value || 0;
  return <span>{value.toLocaleString()}</span>;
};

export default Number;
