import { API_URL } from '../constants/constants';

export const getUserWishes = async (id: number) => {
  try {
    const rawResponse = await fetch(`${API_URL}/api/v1/account/user/${id}`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
      },
    });
    const data = await rawResponse.json();
    return data;
  } catch {
    return false;
  }
};
