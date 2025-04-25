import { List, ListParams, Response } from '../types/common';

export interface ICouponPartner {
  id: number | string;
  logo: string;
  name: string;
  description: string;
  isActive: boolean;
  details: ICouponPartner[];
}

export interface GetPartnerListService {
  (): Response<ICouponPartner[]>;
}

export interface ICouponCodeInfo {
  code: string;
  expiryDate: string;
  isFixedAmount: boolean;
  value: number;
  ceilingAmount: number;
  minimumAmount: number;
}

export interface CouponCodeRequestService {
  (args: { payload: { id: string | number } }): Response<ICouponCodeInfo>;
}

export interface IUserHistoryCouponCodes {
  partner: string;
  code: string;
  expiryDate: string;
  value: number;
  rowNumber: number;
}

export interface GetUserCouponCodeListParams {
  Partner?: string;
  ExpiryDate?: string;
  CouponCode?: string;
}

export interface GetUserCouponCodeService {
  (args: { params?: GetUserCouponCodeListParams & ListParams }): Response<
    List<IUserHistoryCouponCodes>
  >;
}

export interface ILoanResponse {
  url: string;
}

export interface LoanRequestService {
  (): Response<ILoanResponse>;
}
