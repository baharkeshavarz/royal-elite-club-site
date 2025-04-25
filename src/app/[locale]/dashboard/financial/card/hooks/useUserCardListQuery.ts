import { getUserCardList } from '@/services/financial';
import { GetUserCardListParams } from '@/services/financial/types';
import { useQuery } from '@tanstack/react-query';

export const GET_USER_CARD_LIST_QUERY_KEY = 'GET_USER_CARD_LIST_QUERY_KEY';

const useUserCardListQuery = ({
  params,
}: {
  params: GetUserCardListParams;
}) => {
  return useQuery({
    queryKey: [GET_USER_CARD_LIST_QUERY_KEY],
    queryFn: async () => {
      const { data } = await getUserCardList({
        params,
      });
      return data?.value?.list;
    },
    gcTime: 0,
  });
};

export default useUserCardListQuery;
