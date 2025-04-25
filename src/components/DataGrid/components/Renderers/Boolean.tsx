import { Check, Close } from '@mui/icons-material';
import { Stack } from '@mui/material';
import { CustomCellRendererProps } from 'ag-grid-react';
import { FC } from 'react';

const BooleanRenderer: FC<CustomCellRendererProps> = (props) => {
  let booleanValue: string = props.value;

  if (booleanValue === undefined || booleanValue === null) {
    return <span>N/A</span>;
  }

  return (
    <Stack justifyContent="center" height="100%">
      {booleanValue ? <Check color="success" /> : <Close color="error" />}
    </Stack>
  );
};

export default BooleanRenderer;
