import { User } from './models/User';

export const API_URL = 'http://localhost:3000';

const user = User.buildUser({ id: 1 });

user.on('change', () => {
  console.log(user);
});

user.fetch();
