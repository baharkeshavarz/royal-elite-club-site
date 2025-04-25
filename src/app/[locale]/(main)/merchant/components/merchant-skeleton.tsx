import { Box, Grid, Skeleton, Stack } from '@mui/material';
import React, { FC } from 'react';
import { ArrowLeftSharp } from '@mui/icons-material';

interface MerchantSkeletonProps {
  count?: number;
}

const MerchantSkeleton: FC<MerchantSkeletonProps> = ({ count }) => {
  return (
    <Grid container md={12} width="100%" height="100%">
      {Array(count)
        .fill(0)
        .map((_, index) => (
          <Grid item md={3} key={index}>
            <Stack spacing={1} p={1} width="100%" height="100%">
              <Skeleton variant="rectangular" width="100%" height="100%" />
              <Stack spacing={1}>
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  p={1}
                  width="100%"
                  height="100%"
                >
                  <Skeleton variant="text" width="100%" height="100%" />
                </Box>
                <Box
                  display="flex"
                  justifyContent="start"
                  alignItems="center"
                  width="100%"
                  height="100%"
                >
                  <ArrowLeftSharp fontSize="small" />
                  <Skeleton variant="text" width="100%" height="100%" />
                </Box>
              </Stack>
            </Stack>
          </Grid>
        ))}
    </Grid>
  );
};

export default MerchantSkeleton;
