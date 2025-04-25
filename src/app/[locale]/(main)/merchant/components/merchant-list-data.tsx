import { Box, Grid, styled, useTheme } from '@mui/material';
import React, { FC } from 'react';
import MerchantCard from './merchant-card';
import { useRouter } from 'next/navigation';
import NotFoundMerchant from './not-found-merchant';
import LinearFieldset from '@/components/common/LinearFieldset';
import { DEFAULT_MERCHANT_LIST_PATH } from '@/constants/routes';
import { useTranslations } from 'next-intl';

interface PropertyListDataProps {
  merchantList: any[];
  isFetched: boolean;
}

const StyledGrid = styled(Grid)(({ theme }) => ({
  borderRight: `1px solid ${theme.palette.grey[200]}`,
  borderBottom: `1px solid ${theme.palette.grey[200]}`,
  '&:hover': {
    boxShadow: theme.shadows[3],
    borderRadius: 3,
  },
}));

const MerchantListData: FC<PropertyListDataProps> = ({
  merchantList,
  isFetched,
}) => {
  const router = useRouter();
  const theme = useTheme();
  const t = useTranslations();

  const removeFilters = () => {
    router.push(DEFAULT_MERCHANT_LIST_PATH);
  };

  if (merchantList && merchantList.length > 0) {
    return (
      <>
        {merchantList.map((item: any) => (
          <Box
            key={item.classOfActivityName}
            display="flex"
            flexDirection="column"
          >
            <LinearFieldset title={item.classOfActivityName} />
            <Grid container mt={1}>
              {item.merchants.map((merchant: any) => (
                <StyledGrid item xs={12} sm={6} md={3} key={merchant.id}>
                  <MerchantCard merchant={merchant} />
                </StyledGrid>
              ))}
            </Grid>
          </Box>
        ))}
      </>
    );
  }

  if (isFetched && merchantList.length === 0) {
    return (
      <NotFoundMerchant
        title={t('pages.merchant.removeFilters')}
        message={t('pages.merchant.noData')}
        handleClickFun={removeFilters}
      />
    );
  }
};

export default MerchantListData;
