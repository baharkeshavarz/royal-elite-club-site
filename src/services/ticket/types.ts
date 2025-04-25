import { Basic, List, ListParams, Response } from '../types/common';

export interface ITicket {
  id: string;
  trackingCode: string;
  message: string;
  response: string | null;
  status: string;
  type: string;
  createDate: string;
  rowNumber: number;
}

export interface InsetTicketPayload {
  message: string;
  type: number;
}

export type GetUserTicketListParams = ListParams;
export interface GetTicketListService {
  (args: { params?: ListParams }): Response<List<ITicket>>;
}

export interface InsertUserCardService {
  (args: { payload: InsetTicketPayload }): Response<Basic<boolean>>;
}

export interface TicketDetailsService {
  (args: { params: { Id: string | number } }): Response<ITicket>;
}
