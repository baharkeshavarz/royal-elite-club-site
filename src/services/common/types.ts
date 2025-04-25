import { Response } from '../types/common';

export interface IBasicOption {
  id: string;
  name: string;
}

export interface ClassOfActivityListService {
  (): Response<IBasicOption[]>;
}

export interface ILocationItem {
  locationId: string;
  name: string;
}

export interface ProvinceListService {
  (): Response<ILocationItem[]>;
}

interface GetCityListById {
  locationId: string;
}

export interface GetCityListService {
  (args: { params: GetCityListById }): Response<ILocationItem[]>;
}

export interface GetActivityTypeListService {
  (): Response<IBasicOption[]>;
}

export interface GetGenderListService {
  (): Response<IBasicOption[]>;
}

export interface GetBankListService {
  (): Response<IBasicOption[]>;
}

export interface GetMerchantRequestTypeService {
  (): Response<IBasicOption[]>;
}

export interface GetTicketTypeListService {
  (): Response<IBasicOption[]>;
}
