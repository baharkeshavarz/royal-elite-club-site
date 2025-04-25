import { Basic, List, ListParams, Response } from '../types/common';

export interface IBankCard {
  cardNumber: string;
  bankType: number;
}

export interface IBankCardList {
  id: number;
  cardNumber: string;
  bankName: string;
  rowNumber: number;
}

export interface ITransaction {
  amount: number;
  transactionDate: string;
  merchantName: string;
  description: string;
  rowNumber: number;
}

export type GetUserCardListParams = ListParams;
export interface GetUserCardListService {
  (args: { params?: ListParams }): Response<List<IBankCardList>>;
}

export interface InsertUserCardService {
  (args: { payload: IBankCard }): Response<Basic<boolean>>;
}

export interface DeleteUserCardService {
  (args: { payload: { id: string | number } }): Response;
}

export interface GetTransactionListService {
  (args: { params?: ListParams }): Response<List<ITransaction>>;
}
