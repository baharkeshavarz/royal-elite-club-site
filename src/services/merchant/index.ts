import axios from '../../lib/axios';
import {
  MerchantDetailsService,
  MerchantListService,
  MainMerchantListService,
  InsertMerchantRequestService,
} from './types';

export const BASE_URL = '/api/v1/merchant';

export const getMainMerchantList: MainMerchantListService = () => {
  return axios.get(`${BASE_URL}/getMainMerchantList`);
};

export const getMerchant: MerchantDetailsService = (Id) => {
  return axios.get(`${BASE_URL}/getMerchant`, Id);
};

export const getMerchantList: MerchantListService = ({ params }) => {
  return axios.get(`${BASE_URL}/getMerchantList`, {
    params,
  });
};

export const insertMerchantRequest: InsertMerchantRequestService = ({
  payload,
}) => {
  return axios.post(`${BASE_URL}/insertMerchantRequest`, payload);
};
