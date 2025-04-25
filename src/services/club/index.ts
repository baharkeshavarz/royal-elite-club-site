import axios from '../../lib/axios';
import {
  CouponCodeRequestService,
  GetPartnerListService,
  GetUserCouponCodeService,
  LoanRequestService,
} from './types';

export const BASE_URL = '/api/v1/club';

export const getPartnerList: GetPartnerListService = () => {
  return axios.get(`${BASE_URL}/getPartnerList`);
};

export const couponCodeRequest: CouponCodeRequestService = ({ payload }) => {
  return axios.post(`${BASE_URL}/couponCodeRequest`, payload);
};

export const getUserCouponCode: GetUserCouponCodeService = ({ params }) => {
  return axios.get(`${BASE_URL}/getUserCouponCode`, { params });
};

export const loadRequest: LoanRequestService = () => {
  return axios.post(`${BASE_URL}/loanRequest`, {});
};
