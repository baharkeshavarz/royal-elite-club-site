'use client';

import { useTranslations } from 'next-intl';
import ButtonWithLoading from '@/components/common/ButtonWithLoading';
import SearchIcon from '@mui/icons-material/Search';
import { Box, Typography } from '@mui/material';

const FilterButton = () => {
  const t = useTranslations();
  return (
    <Box display="flex" justifyContent="center" mt={2}>
      <ButtonWithLoading
        variant="contained"
        type="submit"
        fullWidth
        sx={{ gap: 0.2 }}
      >
        <SearchIcon fontSize="small" sx={{ color: 'common.white' }} />
        <Typography variant="body1" color="common.white">
          جستجو
        </Typography>
      </ButtonWithLoading>
    </Box>
  );
};

export default FilterButton;
