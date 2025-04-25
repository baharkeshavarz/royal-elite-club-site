import { Box, Grid, Stack, Typography } from '@mui/material';
import { IconPlus } from '@tabler/icons-react';
import { useState } from 'react';
import { DEFAULT_PAGE_SIZE } from '@/constants/grid';
import AddToCardDialog from '../../financial/card/components/AddToCardDialog';
import useUserCardListQuery from '../../financial/card/hooks/useUserCardListQuery';

const AddCard = () => {
  const query = useUserCardListQuery({
    params: { PageIndex: 1, PageSize: DEFAULT_PAGE_SIZE },
  });
  const [openAddCard, setOpenAddCard] = useState(false);

  const handleToggleAddCard = () => {
    setOpenAddCard((prevState) => !prevState);
  };
  return (
    <>
      <AddToCardDialog
        open={openAddCard}
        onClose={handleToggleAddCard}
        onSuccess={query.refetch}
      />
      <Grid container spacing={1}>
        <Grid item xs={12} sm={12} md={12}>
          <Stack
            display="flex"
            justifyContent="center"
            alignItems="center"
            border={1}
            borderRadius={1}
            borderColor="primary.main"
            p={2}
            sx={{
              borderStyle: 'dashed',
              cursor: 'pointer',
            }}
            onClick={handleToggleAddCard}
          >
            <Box display="flex" justifyContent="center" alignItems="center">
              <IconPlus width={20} />
              <Typography variant="h5" fontWeight="700">
                افزودن کارت
              </Typography>
            </Box>

            <Typography variant="body2" color="grey[500]" pt={1}>
              امکان افزودن کارت بانکی
            </Typography>
          </Stack>
        </Grid>
      </Grid>
    </>
  );
};

export default AddCard;
