import { Option } from '@/components/Fields';
import { getCityList } from '@/services/common';
import { useQuery } from '@tanstack/react-query';

const useGetCities = (provinceId: number) => {
  return useQuery({
    enabled: provinceId !== undefined && provinceId !== null,
    placeholderData: [],
    queryKey: ['GET_CITY_LIST', provinceId],
    queryFn: async () => {
      const { data } = await getCityList({
        params: {
          locationId: provinceId.toString(),
        },
      });

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

export default useGetCities;
