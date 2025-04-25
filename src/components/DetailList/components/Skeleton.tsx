import React from 'react';
import DetailItem from './DetailItem';
import CustomSkeleton from '@/components/CustomSkeleton';

const Skeleton = () => {
  return (
    <>
      {new Array(3).fill(1).map((_, index) => {
        return (
          <CustomSkeleton key={index} isLoading>
            <DetailItem
              key={1}
              item={{ key: 'Skeleton', value: 'Skeleton' }}
              sx={{
                mb: 1,
              }}
            />
          </CustomSkeleton>
        );
      })}
    </>
  );
};

export default Skeleton;
