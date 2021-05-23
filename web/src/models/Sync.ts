import axios, { AxiosResponse, AxiosPromise } from 'axios';
import { API_URL } from '..';

export class Sync<T> {
  fetch(id: number): AxiosPromise<T> {
    return axios.get(`${API_URL}/users/${id}`);
  }

  save(id: number, data: T): AxiosPromise<T> {
    if (id) {
      return axios.put(`${API_URL}/users/${id}`, data);
    } else {
      return axios.post(`${API_URL}/users`, data);
    }
  }
}
