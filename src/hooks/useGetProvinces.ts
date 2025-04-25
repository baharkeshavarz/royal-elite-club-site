import { Option } from '@/components/Fields';
import { getProvinceList } from '@/services/common';
import { useQuery } from '@tanstack/react-query';

const useGetProvinces = () => {
  return useQuery({
    queryKey: ['GET_PROVINCE_LIST'],
    queryFn: async () => {
      const { data } = await getProvinceList();

      const items = data.value.map((item) => {
        return {
          id: item.locationId,
          label: item.name,
          value: item.locationId,
        } as Option;
      });

      return items;
    },
  });
};

export default useGetProvinces;
