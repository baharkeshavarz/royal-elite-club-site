import axios from '../../lib/axios';
import { GetBannerListService } from './types';

export const BASE_URL = '/api/v1/site';

export const getBannerList: GetBannerListService = () => {
  return axios.get(`${BASE_URL}/getBannerList`);
};
