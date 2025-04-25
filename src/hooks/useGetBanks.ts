import { Option } from '@/components/Fields';
import { getBankList } from '@/services/common';
import { useQuery } from '@tanstack/react-query';

const useGetBanks = () => {
  return useQuery({
    queryKey: ['GET_BANK_LIST'],
    queryFn: async () => {
      const { data } = await getBankList();

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

export default useGetBanks;
