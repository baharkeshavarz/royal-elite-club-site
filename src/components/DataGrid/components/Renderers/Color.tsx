import { Box } from '@mui/material';
import { CustomCellRendererProps } from 'ag-grid-react';
import { FC } from 'react';

const ColorRenderer: FC<CustomCellRendererProps> = (params) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        height: '100%',
      }}
    >
      <Box
        sx={{
          width: 20,
          height: 20,
          border: '2px solid ',
          borderColor: (theme) => theme.palette.divider,
          borderRadius: 1,
        }}
        bgcolor={params.value}
      />
    </Box>
  );
};

export default ColorRenderer;
