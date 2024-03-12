import axios from "axios";
import { ICustomer } from "../types/customer";

const API_BASE_URL = "http://localhost:3333";

interface ICustomerQueryParams {
  id?: string;
  name?: string;
  email?: string;
  phone?: string;
}

export function listCustomers(params?: ICustomerQueryParams) {
  return axios.get(`${API_BASE_URL}/customers`, { params });
}

export function createCustomer(customer: ICustomer) {
  return axios.post(`${API_BASE_URL}/customers`, customer);
}

export function updateCustomer(id: string, customer: ICustomer) {
  return axios.put(`${API_BASE_URL}/customers/${id}`, customer);
}

export function deleteCustomer(id: string) {
  return axios.delete(`${API_BASE_URL}/customers/${id}`);
}

export function calculateRoute() {
  return axios.get(`${API_BASE_URL}/routes/calculate`);
}
