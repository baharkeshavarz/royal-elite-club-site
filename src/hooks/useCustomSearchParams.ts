import { useSearchParams } from 'next/navigation';
import { convertSearchParamsToArray } from '@/lib/general';
import { useRouter } from 'next/navigation';
import { DEFAULT_MERCHANT_LIST_PATH } from '@/constants/routes';

enum SearchPageParams {
  ClassOfActivities = 'ClassOfActivities',
  ProvinceId = 'ProvinceId',
  CityId = 'CityId',
  Name = 'Name',
  ActivityType = 'ActivityType',
}

type SearchParams = keyof typeof SearchPageParams;

export interface ReturnTypeOfUseCustomSearchParams {
  provinceId: string | null;
  cityId: string | null;
  name: string | null;
  classOfActivities: string | string[];
  activityType: string | string[];

  navigate: (
    filters: Partial<{ [key in SearchParams]: string | number | string[] }>,
    refreshPage?: boolean,
  ) => void;
}

export interface IUseCustomSearchParams {
  (): ReturnTypeOfUseCustomSearchParams;
}

const useCustomSearchParams: IUseCustomSearchParams = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const navigate: ReturnTypeOfUseCustomSearchParams['navigate'] = (
    filters,
    refreshPage = false,
  ) => {
    const params = new URLSearchParams(searchParams);
    const objectArray = Object.entries(filters);
    objectArray.forEach(([key, value]) => {
      if (value === undefined || value === null || +value <= 0) {
        params.delete(SearchPageParams[key as SearchParams]);
      } else if (Array.isArray(value)) {
        params.delete(SearchPageParams[key as SearchParams]);
        value.forEach((item) => {
          params.append(SearchPageParams[key as SearchParams], String(item));
        });
      } else {
        params.set(SearchPageParams[key as SearchParams], String(value));
      }
    });

    if (refreshPage) {
      router.push(`${DEFAULT_MERCHANT_LIST_PATH}?${params}`);
    } else {
      // We add it to prevent reloading page to not get data in server again
      // the format is: history.pushState(state, title[, url])     >>> url is optional <<<
      window.history.pushState(
        {},
        '',
        `${DEFAULT_MERCHANT_LIST_PATH}?${params}`,
      );
    }
  };

  // Get params data
  const provinceId = searchParams.get(SearchPageParams.ProvinceId);
  const cityId = searchParams.get(SearchPageParams.CityId);
  const name = searchParams.get(SearchPageParams.Name);

  // classOfActivities is an array
  const params = convertSearchParamsToArray(searchParams);
  const classOfActivities = params['ClassOfActivities'];
  const activityType = params['ActivityType'];

  return {
    navigate,
    provinceId,
    cityId,
    name,
    classOfActivities,
    activityType,
  };
};

export default useCustomSearchParams;
