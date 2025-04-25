import AlertComponent from '@/components/common/AlertComponent';
import ProgressLoading from '@/components/common/ProgressLoading';
import { Grid } from '@mui/material';
import React, { useCallback, useMemo, useRef } from 'react';
import TransactionCard from './TransactionCard';
import useFiltersContext from '@/components/Filters/hooks/useFiltersContext';
import useGetTransactionList from '../hooks/useGetTransactionList';

const MainContentMobile = () => {
  const { filters } = useFiltersContext();

  const observer = useRef<IntersectionObserver>();
  const { data, error, fetchNextPage, hasNextPage, isFetching, isLoading } =
    useGetTransactionList({
      params: {
        ...filters,
      },
    });

  const lastElementRef = useCallback(
    (node: HTMLDivElement) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetching) {
          fetchNextPage();
        }
      });

      if (node) observer.current.observe(node);
    },
    [fetchNextPage, hasNextPage, isFetching, isLoading],
  );

  const transactions = useMemo(() => {
    return data?.pages.flatMap((page) => page) ?? [];
  }, [data]);

  if (isLoading) return <ProgressLoading />;
  if (error) return <AlertComponent />;

  return (
    <>
      <Grid container spacing={2} py={2}>
        {transactions.map((group, i) => (
          <React.Fragment key={i}>
            {group.list.map((transaction, index) => (
              <Grid item xs={12} sm={6} key={index} ref={lastElementRef}>
                <TransactionCard transaction={transaction} />
              </Grid>
            ))}
          </React.Fragment>
        ))}
      </Grid>
      {isFetching && <ProgressLoading />}
    </>
  );
};

export default MainContentMobile;
