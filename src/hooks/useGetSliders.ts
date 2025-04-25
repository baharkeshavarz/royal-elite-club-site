import { getBannerList } from '@/services/site';
import { useQuery } from '@tanstack/react-query';

const useGetSliders = () => {
  return useQuery({
    queryKey: ['GET_BANNER_LIST'],
    queryFn: async () => {
      const { data } = await getBannerList();
      return data?.value;
    },
    gcTime: 3000,
  });
};

export default useGetSliders;
