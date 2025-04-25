'use client';

import React, { Suspense } from 'react';
import { Grid } from '@mui/material';
import MerchantList from './components/merchant-list';
import FiltersList from './components/FiltersList';
import MerchantSkeleton from './components/merchant-skeleton';
import Breadcrumb from '@/components/common/breadcrumb/DynamicBreadcrumbs';
import { BreadcrumbTypes } from '@/services/types/setting';

const Merchants = () => {
  return (
    <>
      <Breadcrumb capitalizeLinks bradCrumbType={BreadcrumbTypes.Navigation} />
      <Grid container spacing={2} p={1}>
        <Grid item xs={12} md={4} lg={3}>
          <FiltersList />
        </Grid>

        <Grid item xs={12} md={8} lg={9}>
          <Suspense fallback={<MerchantSkeleton count={8} />}>
            <MerchantList />
          </Suspense>
        </Grid>
      </Grid>
    </>
  );
};

export default Merchants;
