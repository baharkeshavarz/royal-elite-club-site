import { Option } from '@/components/Fields';
import { getActivityTypeList } from '@/services/common';
import {
  UndefinedInitialDataOptions,
  UseQueryResult,
  useQuery,
} from '@tanstack/react-query';

export interface IUseStoreTypes {
  (args?: Partial<UndefinedInitialDataOptions<Option[]>>): UseQueryResult<
    Option[],
    Error
  >;
}
const useActivityTypes: IUseStoreTypes = (options = {}) => {
  const storeTypes = useQuery({
    queryKey: ['GET_ACTIVITY_TYPE_LIST'],
    queryFn: async () => {
      const { data } = await getActivityTypeList();
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
  return storeTypes;
};

export default useActivityTypes;
