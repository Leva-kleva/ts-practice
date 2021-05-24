import { Eventing } from './Eventing';
import { Sync } from './Sync';
import { API_URL } from '..';
import { Attributes } from './Attributes';

interface UserProps {
  name?: string;
  age?: number;
  id?: number;
}

export class User {
  public sync: Sync<UserProps> = new Sync<UserProps>(`${API_URL}/users`);
  public events: Eventing = new Eventing();
  public attributes: Attributes<UserProps>;

  constructor(attrs: UserProps) {
    this.attributes = new Attributes<UserProps>(attrs);
  }
}
