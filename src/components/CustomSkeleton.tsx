import { Skeleton } from '@mui/material';
import { FC, PropsWithChildren } from 'react';

export interface CustomSkeletonProps {
  isLoading?: boolean;
  height?: number;
}
const CustomSkeleton: FC<PropsWithChildren<CustomSkeletonProps>> = ({
  children,
  isLoading,
  height = null,
}) => {
  if (!isLoading) {
    return children;
  }
  return (
    <Skeleton variant="rectangular" width="100%" height={height || 0}>
      {children}
    </Skeleton>
  );
};

export default CustomSkeleton;
