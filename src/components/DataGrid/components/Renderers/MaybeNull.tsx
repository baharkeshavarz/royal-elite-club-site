import { CustomCellRendererProps } from 'ag-grid-react';
import { FC } from 'react';

const MaybeNull: FC<CustomCellRendererProps> = (params) => {
  return params.data.value ?? 'N/A';
};

export default MaybeNull;
