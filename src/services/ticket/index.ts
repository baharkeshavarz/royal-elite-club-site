import axios from '../../lib/axios';
import {
  GetTicketListService,
  InsertUserCardService,
  TicketDetailsService,
} from './types';

export const BASE_URL = '/api/v1/ticket';

export const getTicketList: GetTicketListService = ({ params }) => {
  return axios.get(`${BASE_URL}/getTicketList`, { params });
};

export const insertTicket: InsertUserCardService = ({ payload }) => {
  return axios.post(`${BASE_URL}/insertTicket`, payload);
};

export const getTicket: TicketDetailsService = (Id) => {
  return axios.get(`${BASE_URL}/getTicket`, Id);
};
