import { Eventing } from './Eventing';
import { Sync } from './Sync';
import { API_URL } from '..';

interface UserProps {
  name?: string;
  age?: number;
  id?: number;
}

export class User {
  public sync: Sync<UserProps> = new Sync<UserProps>(`${API_URL}/users`);
  public events: Eventing = new Eventing();

  constructor(private data: UserProps) {}

  get(propName: string): string | number {
    return this.data[propName];
  }

  set(update: Partial<UserProps>): void {
    Object.assign(this.data, update);
  }
}
