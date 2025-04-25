import { FC } from 'react';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Box, Typography } from '@mui/material';

interface MobileHeaderProps {
  onBackClick?: () => void;
  title: string;
}

const MobileHeader: FC<MobileHeaderProps> = ({ onBackClick, title }) => {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      p={1}
    >
      <Typography variant="h5" py={1}>
        {title}
      </Typography>

      <ArrowBackIosIcon
        fontSize="small"
        onClick={onBackClick}
        sx={{ cursor: 'pointer', color: 'grey.700' }}
      />
    </Box>
  );
};

export default MobileHeader;
