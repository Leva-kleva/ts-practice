import axios, { AxiosResponse } from 'axios';
import { API_URL } from '..';
import { Eventing } from './Eventing';

interface UserProps {
  name?: string;
  age?: number;
  id?: number;
}

export class User {
  public events: Eventing = new Eventing();

  constructor(private data: UserProps) {}

  get(propName: string): string | number {
    return this.data[propName];
  }

  set(update: Partial<UserProps>): void {
    Object.assign(this.data, update);
  }

  fetch(): void {
    axios
      .get(`${API_URL}/users/${this.get('id')}`)
      .then((response: AxiosResponse): void => {
        this.set(response.data);
      });
  }

  save(): void {
    const id = this.get('id');
    if (id) {
      axios.put(`${API_URL}/users/${id}`, this.data);
    } else {
      axios.post(`${API_URL}/users`, this.data);
    }
  }
}
