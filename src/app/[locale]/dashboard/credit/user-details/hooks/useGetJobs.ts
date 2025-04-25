import { Option } from '@/components/Fields';
import { useQuery } from '@tanstack/react-query';

const useGetJobs = () => {
  return useQuery({
    queryKey: ['GET_JOBS_LIST'],
    queryFn: async () => {
      const data = [
        {
          id: 1,
          name: 'کارمند دولتی',
        },
        {
          id: 2,
          name: 'کارمند بخش خصوصی',
        },
        {
          id: 3,
          name: 'بازنشسته ',
        },
        {
          id: 4,
          name: 'بیکار ',
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

export default useGetJobs;
