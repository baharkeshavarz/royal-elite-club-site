import { DEFAULT_PAGE_SIZE } from '@/constants/grid';
import { GetUserCouponCodeListParams } from '@/services/club/types';
import { getTicketList } from '@/services/ticket';
import { ListParams } from '@/services/types/common';
import { useInfiniteQuery } from '@tanstack/react-query';

interface ICouponListParams {
  params?: GetUserCouponCodeListParams & ListParams;
}

const useGetTicketList = ({ params }: ICouponListParams) => {
  const fetchTickets = async ({ pageParam = 1 }) => {
    const { data } = await getTicketList({
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
    queryKey: ['GET_USER_TICKET_LIST', params],
    queryFn: ({ pageParam }) => fetchTickets({ pageParam }),
    getNextPageParam: (lastPage) => lastPage.nextPage,
    initialPageParam: 1,
  });
};

export default useGetTicketList;
