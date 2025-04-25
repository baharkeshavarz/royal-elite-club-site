'use client';

import {
  Box,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  useTheme,
} from '@mui/material';

import Loading from '@/app/[locale]/loading';
import { deleteUserCard } from '@/services/financial';
import { IBankCardList } from '@/services/financial/types';
import { useMutation } from '@tanstack/react-query';
import { useConfirm } from 'material-ui-confirm';
import { FC } from 'react';
import { useTranslations } from 'next-intl';

export interface DashboardCardsListProps {
  isFetching: boolean;
  data: IBankCardList[] | undefined;
  onDelete?: VoidFunction;
}

const DashboardCardsList: FC<DashboardCardsListProps> = ({
  isFetching,
  data,
  onDelete,
}) => {
  const t = useTranslations();
  const theme = useTheme();
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

  if (isFetching) return <Loading />;

  return (
    <>
      <Table
        aria-label="simple table"
        sx={{
          whiteSpace: 'nowrap',
        }}
      >
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography variant="body2" fontWeight={600}>
                {t('common.fields.rowNumber')}
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="body2" fontWeight={600}>
                {t('dashboard.card.fields.cardNumber')}
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="body2" fontWeight={600}>
                {t('dashboard.card.fields.bankName')}
              </Typography>
            </TableCell>
            {/* <TableCell>
              <Typography variant="body2" fontWeight={600}>
                {t('buttons.operation')}
              </Typography>
            </TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.length === 0 && (
            <TableRow>
              <TableCell colSpan={3}>
                <Typography variant="h6" fontWeight="bold" textAlign="center">
                  {t('dashboard.card.messages.noData')}
                </Typography>
              </TableCell>
            </TableRow>
          )}
          {data?.map((bank) => (
            <TableRow key={bank.cardNumber}>
              <TableCell>
                <Typography variant="h6">{bank.rowNumber}</Typography>
              </TableCell>
              <TableCell>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <Box>
                    <Typography variant="body2" fontWeight={600}>
                      {bank.cardNumber}
                    </Typography>
                  </Box>
                </Box>
              </TableCell>
              <TableCell>
                <Chip
                  sx={{
                    px: '0.3rem',
                    backgroundColor: theme.palette.secondary.main,
                    color: '#fff',
                  }}
                  size="medium"
                  label={bank.bankName || 'بانک نامشخص'}
                ></Chip>
              </TableCell>
              {/* <TableCell>
                <ButtonWithLoading
                  variant="outlined"
                  size="small"
                  onClick={() => handleClickDelete(bank.id)}
                  isLoading={deleteCardMutation.isPending}
                >
                  <Typography variant="body1">حذف</Typography>
                </ButtonWithLoading>
              </TableCell> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default DashboardCardsList;
