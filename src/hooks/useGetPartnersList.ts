import { getPartnerList } from '@/services/club';
import { useQuery } from '@tanstack/react-query';

const useGetPartnersList = () => {
  return useQuery({
    queryKey: ['GET_PARTNERS_LIST'],
    queryFn: async () => {
      const { data } = await getPartnerList();
      return data.value;
    },
    gcTime: 0,
  });
};

export default useGetPartnersList;
