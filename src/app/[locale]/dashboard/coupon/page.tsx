'use client';

import React from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import useGetPartnersList from '@/hooks/useGetPartnersList';
import { useTranslations } from 'next-intl';
import { useEffect, useState, useMemo } from 'react';
import { couponCodeRequest } from '@/services/club';
import { useMutation } from '@tanstack/react-query';
import { ICouponCodeInfo } from '@/services/club/types';
import { useConfirm } from 'material-ui-confirm';
import CouponItem from './components/CouponItem';
import { Container } from '@mui/material';
import CouponDetailsDialog from './components/CouponDetailsDialog';
import DashboardCard from '../components/shared/DashboardCard';
import LoadingComponent from '@/components/common/LoadingComponent';
import CouponImageItem from './components/CouponImageItem';
import { useAppContext } from '@/hooks/useAppContext';

const CouponPage = () => {
  const t = useTranslations();
  const { isMobile } = useAppContext();
  const confirm = useConfirm();

  const [openIds, setOpenIds] = useState<number[]>([]);
  const query = useGetPartnersList();
  const partnersList = useMemo(() => query?.data || [], [query?.data]);
  const [showCoupon, setShowCoupon] = useState(false);
  const [couponInfo, setCouponInfo] = useState<ICouponCodeInfo>(
    {} as ICouponCodeInfo,
  );

  const { mutateAsync } = useMutation({
    mutationFn: async (payload: { id: number | string }) => {
      const { data } = await couponCodeRequest({ payload });
      if (data.succeed) {
        setShowCoupon(true);
        setCouponInfo(data?.value);
      }
    },
  });

  const handleSelectCoupon = async (id: number | string) => {
    confirm().then(async () => {
      await mutateAsync({ id });
    });
  };

  const onSuccess = () => {
    setShowCoupon(false);
    query.refetch;
  };

  const handleClick = (id: number) => {
    setOpenIds((prev) =>
      prev.includes(id)
        ? prev.filter((itemId) => itemId !== id)
        : [...prev, id],
    );
  };

  useEffect(() => {
    if (partnersList.length > 0) {
      setOpenIds(
        partnersList.map((item) =>
          item.details.length > 0 ? (item.id as number) : 0,
        ),
      );
    }
  }, [partnersList]);

  return (
    <Container maxWidth="lg">
      <DashboardCard
        subtitle={t('dashboard.coupon.listSubtitle')}
        title={t('dashboard.coupon.listTitle')}
        elevation={1}
      >
        <>
          {showCoupon && (
            <CouponDetailsDialog
              open={!!showCoupon}
              couponInfo={couponInfo}
              onSuccess={onSuccess}
            />
          )}

          {query.isFetching && <LoadingComponent />}
          <List sx={{ width: '100%' }} component="nav">
            {partnersList?.map((listItem) => (
              <React.Fragment key={listItem.id}>
                {listItem.details.length > 0 && (
                  <ListItemButton
                    onClick={() => handleClick(listItem.id as number)}
                  >
                    <CouponImageItem
                      partner={listItem}
                      title={`${listItem.name}(${listItem.details.length} ${t(
                        'common.fields.count',
                      )})`}
                    />

                    {openIds.includes(listItem.id as number) ? (
                      <ExpandLess />
                    ) : (
                      <ExpandMore />
                    )}
                  </ListItemButton>
                )}
                {listItem.details.length > 0 ? (
                  <Collapse
                    in={openIds.includes(listItem.id as number)}
                    timeout="auto"
                    unmountOnExit
                  >
                    <List component="div" sx={{ px: isMobile ? 1 : 3 }}>
                      {listItem.details.map((nestedPartner) => (
                        <CouponItem
                          key={nestedPartner.id}
                          partner={nestedPartner}
                          handleSelectCoupon={handleSelectCoupon}
                        />
                      ))}
                    </List>
                  </Collapse>
                ) : (
                  <CouponItem
                    partner={listItem}
                    handleSelectCoupon={handleSelectCoupon}
                  />
                )}
              </React.Fragment>
            ))}
          </List>
        </>
      </DashboardCard>
    </Container>
  );
};
export default CouponPage;
