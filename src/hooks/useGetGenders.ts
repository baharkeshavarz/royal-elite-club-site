import { Option } from '@/components/Fields';
import { getGenderList } from '@/services/common';
import { useQuery } from '@tanstack/react-query';

const useGetGenders = () => {
  return useQuery({
    queryKey: ['GET_GENDER_LIST'],
    queryFn: async () => {
      const { data } = await getGenderList();

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

export default useGetGenders;
