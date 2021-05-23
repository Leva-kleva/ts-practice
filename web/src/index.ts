import { User } from './models/User';

export const API_URL = 'http://localhost:3000';

const user = new User({ id: 1 });

user.set({ name: 'new', age: 124 });

user.save();
