import { DEFAULT_PAGE_SIZE } from '@/constants/grid';
import { getUserCouponCode } from '@/services/club';
import { GetUserCouponCodeListParams } from '@/services/club/types';
import { ListParams } from '@/services/types/common';
import { useInfiniteQuery } from '@tanstack/react-query';

interface ICouponListParams {
  params?: GetUserCouponCodeListParams & ListParams;
}

const useGetCouponList = ({ params }: ICouponListParams) => {
  const fetchMyCoupons = async ({ pageParam = 1 }) => {
    const { data } = await getUserCouponCode({
      params: {
        PageIndex: pageParam,
        PageSize: DEFAULT_PAGE_SIZE,
        ...params,
      },
    });

    return {
      ...data?.value,
      nextPage:
        pageParam * DEFAULT_PAGE_SIZE < data?.value.total
          ? pageParam + 1
          : null,
    };
  };

  return useInfiniteQuery({
    queryKey: ['GET_USER_COUPON_CODE_LIST', params],
    queryFn: ({ pageParam }) => fetchMyCoupons({ pageParam }),
    getNextPageParam: (lastPage) => lastPage.nextPage,
    initialPageParam: 1,
  });
};

export default useGetCouponList;
