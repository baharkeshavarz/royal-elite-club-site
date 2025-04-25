import { DEFAULT_PAGE_SIZE } from '@/constants/grid';
import { GetUserCouponCodeListParams } from '@/services/club/types';
import { getTransactionList } from '@/services/financial';
import { ListParams } from '@/services/types/common';
import { useInfiniteQuery } from '@tanstack/react-query';

interface ICouponListParams {
  params?: GetUserCouponCodeListParams & ListParams;
}

const useGetTransactionList = ({ params }: ICouponListParams) => {
  const fetchMyTransactions = async ({ pageParam = 1 }) => {
    const { data } = await getTransactionList({
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
    queryKey: ['GET_USER_TRANSACTION_LIST', params],
    queryFn: ({ pageParam }) => fetchMyTransactions({ pageParam }),
    getNextPageParam: (lastPage) => lastPage.nextPage,
    initialPageParam: 1,
  });
};

export default useGetTransactionList;
