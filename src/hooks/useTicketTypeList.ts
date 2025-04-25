import { Option } from '@/components/Fields';
import { getTicketTypeList } from '@/services/common';
import { useQuery } from '@tanstack/react-query';

const useTicketTypeList = () => {
  return useQuery({
    queryKey: ['GET_TICKET_TYPE_LIST'],
    queryFn: async () => {
      const { data } = await getTicketTypeList();

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

export default useTicketTypeList;
