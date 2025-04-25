'use client';

import { Box, Card, CardContent, Typography, useTheme } from '@mui/material';

import { FC } from 'react';
import { deleteUserCard } from '@/services/financial';
import { IBankCardList } from '@/services/financial/types';
import { useMutation } from '@tanstack/react-query';
import { useConfirm } from 'material-ui-confirm';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import { useTranslations } from 'next-intl';

export interface CardItemProps {
  card: IBankCardList;
  onDelete: VoidFunction | undefined;
}

const CardItem: FC<CardItemProps> = ({ card, onDelete }) => {
  const theme = useTheme();
  const t = useTranslations();
  const confirm = useConfirm();

  const deleteCardMutation = useMutation({
    mutationFn: deleteUserCard,
  });

  const handleClickDelete = async (id: number | string) => {
    confirm().then(async () => {
      await deleteCardMutation.mutateAsync({
        payload: { id },
      });
      onDelete?.();
    });
  };

  return (
    <Card
      sx={{
        '&:hover': {
          backgroundColor: 'grey.50',
          boxShadow: theme.shadows[1],
        },
      }}
    >
      <CardContent>
        <Box display="flex" alignItems="center" height={22}>
          <Typography variant="h5" py={1}>
            {card.bankName}
          </Typography>
        </Box>

        <Box display="flex" alignItems="center" gap={1}>
          <CreditCardIcon fontSize="small" sx={{ color: 'grey.800' }} />
          <Typography variant="h6" color="grey.800">
            {card.cardNumber}
          </Typography>
        </Box>
      </CardContent>
      {/* <CardActions sx={{ justifyContent: 'flex-end' }}>
        <ButtonWithLoading
          variant="contained"
          size="small"
          sx={{
            backgroundColor: 'red',
            color: theme.palette.common.white,
          }}
          onClick={() => handleClickDelete(card.id)}
          isLoading={deleteCardMutation.isPending}
        >
          <Typography variant="body1">{t('buttons.delete')}</Typography>
        </ButtonWithLoading>
      </CardActions> */}
    </Card>
  );
};

export default CardItem;
