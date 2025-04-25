'use client';

import { Grid } from '@mui/material';
import Loading from '@/app/[locale]/loading';
import { IBankCardList } from '@/services/financial/types';
import { FC } from 'react';
import CardItem from './CardItem';
import NoDataCard from '../../../components/shared/NoDataCard';
import { useTranslations } from 'next-intl';
import { DEFAULT_NO_IMAGE_CARD_LIST } from '@/constants/dashboard';

export interface CardsListProps {
  isFetching: boolean;
  data: IBankCardList[] | undefined;
  onDelete?: VoidFunction;
}

const CardsList: FC<CardsListProps> = ({ isFetching, data, onDelete }) => {
  const t = useTranslations();
  if (isFetching) return <Loading />;

  return (
    <>
      {data?.length === 0 && (
        <NoDataCard
          message={t('dashboard.card.messages.noData')}
          imgSrc={DEFAULT_NO_IMAGE_CARD_LIST}
        />
      )}

      <Grid container spacing={2} sx={{ mt: 2 }}>
        {data?.map((item) => (
          <Grid item xs={12} md={6} lg={4} key={item.id}>
            <CardItem card={item} onDelete={onDelete} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default CardsList;
