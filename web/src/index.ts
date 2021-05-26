import { User } from './models/User';

export const API_URL = 'http://localhost:3000';

const user = new User({ id: 1, name: 'teeeest', age: 0 });

user.on('save', () => {
  console.log(user);
});

user.save();
