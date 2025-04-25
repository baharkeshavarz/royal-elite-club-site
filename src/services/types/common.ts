import { AxiosResponse } from 'axios';

export type Response<T = any> = Promise<AxiosResponse<Basic<T>>>;

export interface Basic<T extends any = any> {
  value: T;
  hasValue: boolean;
  succeed: boolean;
  message: string | null;
  errorCode: number;
}

export interface List<T extends any = any> {
  list: T[];
  total: number;
  page: number;
  has_previous_page: boolean;
  has_next_page: boolean;
  sort_field: string;
  search_text: string;
  sort_orientation: number;
}

export type ListParams = Partial<{
  PageIndex: number;
  PageSize: number;
}>;
