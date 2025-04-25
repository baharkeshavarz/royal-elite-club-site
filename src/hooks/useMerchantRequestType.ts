import { Option } from '@/components/Fields';
import { getMerchantRequestType } from '@/services/common';
import { useQuery } from '@tanstack/react-query';

const useMerchantRequestType = () => {
  return useQuery({
    queryKey: ['GET_MERCHANT_REQUEST_TYPE'],
    queryFn: async () => {
      const { data } = await getMerchantRequestType();

      const items = data.value.map((item) => {
        return {
          id: item.id,
          label: item.name,
          value: item.id,
        } as Option;
      });

      return items;
    },
  });
};

export default useMerchantRequestType;
