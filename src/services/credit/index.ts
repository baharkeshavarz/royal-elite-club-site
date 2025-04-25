import axios from '../../lib/axios';
import {
  DeleteUserCardService,
  GetTransactionListService,
  GetUserCardListService,
  InsertUserCardService,
} from './types';

export const BASE_URL = '/api/v1/financial';

export const getUserCardList: GetUserCardListService = ({ params }) => {
  return axios.get(`${BASE_URL}/getUserCardList`, { params });
};

export const insertUserCard: InsertUserCardService = ({ payload }) => {
  return axios.post(`${BASE_URL}/insertUserCard`, payload);
};

export const deleteUserCard: DeleteUserCardService = ({ payload }) => {
  return axios.delete(`${BASE_URL}/deleteUserCard`, { data: payload }); // TODO: check this
};

export const getTransactionList: GetTransactionListService = ({ params }) => {
  return axios.get(`${BASE_URL}/getTransactionList`, { params });
};
