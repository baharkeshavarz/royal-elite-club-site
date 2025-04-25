import { ListParams, Response } from '../types/common';

export enum SocialContactInfoEnum {
  Instagram = 'instagram',
  Facebook = 'facebook',
  Twitter = 'twitter',
  Telegram = 'telegram',
  LinkedIn = 'linkedIn',
  PhoneNumbers = 'phoneNumbers',
}

export interface IMainMerchant {
  id: string;
  name: string;
  url: string;
}

export interface IBranch {
  name: string;
  province: string;
  city: string;
  address: number;
  phoneNumbers: string[];
}

export interface IMerchant {
  name: string;
  siteAddress: string;
  phoneNumbers: string[];
  instagram: string;
  facebook: string;
  twitter: string;
  telegram: string;
  linkedIn: string;
  activityType: string;
  classOfActivity: string[];
  images: string[];
  branches: IBranch[];
  description: string;
}

export interface MainMerchantListService {
  (): Response<IMainMerchant[]>;
}

export interface MerchantDetailsService {
  (args: { params: { Id: string | number } }): Response<IMerchant>;
}

export type GetMerchantList = Partial<{
  Name: string;
  ProvinceId: string | number;
  CityId: string | number;
  ClassOfActivities: number[];
}>;

export interface IMerchantsMain {
  id: string;
  name: string;
  activityType: string;
  siteAddress: string;
  url: string;
}

export interface MerchantListService {
  (args: { params: ListParams & GetMerchantList }): Response<IMerchantsMain[]>;
}

export interface InsertNaturalMerchantRequest {
  storeName: string;
  ownerFullName: string;
  ownerNationalCode: string;
  ownerPhoneNumber: string;
  businessLicenseNumber: string;
  classOfActivity: string;
  telephoneNumber?: string | null;
  email?: string | null;
  branchCount?: number | null;
  activityType?: number | null;
  businessHistory?: string | null;
}

export interface InsertLegalMerchantRequest {
  companyName: string;
  brandName: string;
  ceoFullName: string;
  ceoPhoneNumber: string;
  ceoNationalCode: string;
  agentFullName?: string | null;
  agentPhoneNumber?: string | null;
  businessLicenseNumber: string | null;
  classOfActivity: string;
  telephoneNumber?: string | null;
  email?: string | null;
  branchCount?: number | null;
  activityType?: number | null;
  businessHistory?: string | null;
}

export interface InsertMerchantRequestCommon {
  accountNumber?: string | null;
  terminalNumber1?: string | null;
  terminalNumber2?: string | null;
  terminalNumber3?: string | null;
  address?: string | null;
  postalCode?: string | null;
  website1?: string | null;
  website2?: string | null;
  website3?: string | null;
  instagram?: string | null;
  facebook?: string | null;
  x?: string | null;
  telegram?: string | null;
  linkedIn?: string | null;
  description?: string | null;
}

export type InsertLegalMerchantRequestPayload = InsertLegalMerchantRequest &
  InsertMerchantRequestCommon;

export type InsertNaturalMerchantRequestPayload = InsertNaturalMerchantRequest &
  InsertMerchantRequestCommon;

export interface InsertMerchantRequestService {
  (args: {
    payload: (
      | InsertLegalMerchantRequestPayload
      | InsertNaturalMerchantRequestPayload
    ) & { isLegal: boolean };
  }): Response<string>;
}
