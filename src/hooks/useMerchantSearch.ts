import { useSuspenseQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import { getMerchantList } from '@/services/merchant';
import { convertSearchParamsToArray } from '@/lib/general';

const useMerchantSearch = () => {
  const searchParams = useSearchParams();
  const paramsObject = convertSearchParamsToArray(searchParams);
  return useSuspenseQuery({
    queryKey: ['MERCHANT_LIST', paramsObject],
    queryFn: async () => {
      const { data } = await getMerchantList({
        params: {
          ...paramsObject,
        },
      });
      return data?.value || [];
    },
    gcTime: 0,
  });
};

export default useMerchantSearch;
