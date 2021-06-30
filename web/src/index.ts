import { Collection } from './models/Collection';
import { UserList } from './views/UserList';
import { UserProps, User } from './models/User';

export const API_URL = 'http://localhost:3000';

const users = new Collection(API_URL, (json: UserProps) => {
  return User.buildUser(json);
});

users.on('change', () => {
  const root = document.getElementById('root');

  if (root) {
    new UserList(root, users).render();
  }
});

users.fetch();
