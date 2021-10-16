import { API_URL } from '../constants/constants';

export const getAuthors = async () => {
  try {
    const rawResponse = await fetch(`${API_URL}/api/v1/book/author`, {
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
