import axios from '../../lib/axios';
import {
  ClassOfActivityListService,
  GetBankListService,
  GetCityListService,
  GetGenderListService,
  GetMerchantRequestTypeService,
  GetActivityTypeListService,
  GetTicketTypeListService,
  ProvinceListService,
} from './types';

export const BASE_URL = '/api/v1/common';

export const getClassOfActivityList: ClassOfActivityListService = () => {
  return axios.get(`${BASE_URL}/getClassOfActivityList`);
};

export const getProvinceList: ProvinceListService = () => {
  return axios.get(`${BASE_URL}/provinceList`);
};

export const getCityList: GetCityListService = ({ params }) => {
  return axios.get(`${BASE_URL}/cityList`, { params });
};

export const getActivityTypeList: GetActivityTypeListService = () => {
  return axios.get(`${BASE_URL}/getActivityTypeList`);
};

export const getGenderList: GetGenderListService = () => {
  return axios.get(`${BASE_URL}/getGenderList`);
};

export const getBankList: GetBankListService = () => {
  return axios.get(`${BASE_URL}/getBankList`);
};

export const getMerchantRequestType: GetMerchantRequestTypeService = () => {
  return axios.get(`${BASE_URL}/getMerchantRequestType`);
};

export const getTicketTypeList: GetTicketTypeListService = () => {
  return axios.get(`${BASE_URL}/getTicketTypeList`);
};
