import AlertComponent from '@/components/common/AlertComponent';
import ProgressLoading from '@/components/common/ProgressLoading';
import { Grid } from '@mui/material';
import React, { useCallback, useMemo, useRef } from 'react';
import useFiltersContext from '@/components/Filters/hooks/useFiltersContext';
import useGetTicketList from '../hooks/useGetTicketList';
import TicketCard from './TicketCard';
import NoDataCard from '../../components/shared/NoDataCard';
import { DEFAULT_NO_IMAGE_TICKET_LIST } from '@/constants/dashboard';
import { useTranslations } from 'next-intl';

const MainContentMobile = () => {
  const t = useTranslations();
  const { filters } = useFiltersContext();

  const observer = useRef<IntersectionObserver>();
  const { data, error, fetchNextPage, hasNextPage, isFetching, isLoading } =
    useGetTicketList({
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

  const tickets = useMemo(() => {
    return data?.pages.flatMap((page) => page) ?? [];
  }, [data]);

  if (isLoading) return <ProgressLoading />;
  if (error) return <AlertComponent />;
  return (
    <>
      <Grid container spacing={2} py={2}>
        {tickets.map((group, i) => (
          <React.Fragment key={i}>
            {group.list.map((ticket) => (
              <Grid item xs={12} sm={6} key={ticket?.id} ref={lastElementRef}>
                <TicketCard ticket={ticket} />
              </Grid>
            ))}
          </React.Fragment>
        ))}
      </Grid>

      {tickets[0]?.list?.length === 0 && (
        <NoDataCard
          message={t('dashboard.ticket.messages.noData')}
          imgSrc={DEFAULT_NO_IMAGE_TICKET_LIST}
        />
      )}

      {isFetching && <ProgressLoading />}
    </>
  );
};

export default MainContentMobile;
