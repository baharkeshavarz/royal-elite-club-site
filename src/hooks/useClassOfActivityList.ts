import { Option } from '@/components/Fields';
import { getClassOfActivityList } from '@/services/common';
import {
  UndefinedInitialDataOptions,
  UseQueryResult,
  useQuery,
} from '@tanstack/react-query';

export interface IUseClassOfActivityList {
  (args?: Partial<UndefinedInitialDataOptions<Option[]>>): UseQueryResult<
    Option[],
    Error
  >;
}

const useClassOfActivityList: IUseClassOfActivityList = (options = {}) => {
  const query = useQuery({
    queryKey: ['GET_CLASS_OF_ACTIVITY_LIST'],
    queryFn: async () => {
      const { data } = await getClassOfActivityList();
      return data.value.map((item) => {
        return {
          id: item.id,
          label: item.name,
          value: item.id,
        } as Option;
      });
    },
    placeholderData: [],
    ...options,
  });
  return query;
};

export default useClassOfActivityList;
