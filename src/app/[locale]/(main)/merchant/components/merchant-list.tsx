'use client';

import { Card, CardContent } from '@mui/material';
import MerchantListData from './merchant-list-data';
import useMerchantSearch from '@/hooks/useMerchantSearch';

const MerchantList = () => {
  let { data: merchantList, isFetched } = useMerchantSearch();
  return (
    <Card
      variant="outlined"
      sx={{
        minHeight: '70vh',
        border: 0,
      }}
    >
      <CardContent sx={{ p: 0 }}>
        <MerchantListData merchantList={merchantList} isFetched={isFetched} />
      </CardContent>
    </Card>
  );
};

export default MerchantList;
