import { Option } from '@/components/Fields';
import { useQuery } from '@tanstack/react-query';

const useGetEducations = () => {
  return useQuery({
    queryKey: ['GET_EDUCATION_LIST'],
    queryFn: async () => {
      const data = [
        {
          id: 1,
          name: 'دیپلم',
        },
        {
          id: 2,
          name: 'کارشناسی',
        },
        {
          id: 3,
          name: 'کارشناسی ارشد',
        },
        {
          id: 2,
          name: 'دکترا',
        },
      ];
      const items = data.map((item) => {
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

export default useGetEducations;
