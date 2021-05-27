import { Collection } from './models/Collection';
import { User, UserProps } from './models/User';

export const API_URL = 'http://localhost:3000';

const collection = new Collection<User, UserProps>(
  `${API_URL}/users`,
  (json: UserProps) => User.buildUser(json)
);
collection.on('change', () => {
  console.log(collection);
});
collection.fetch();
