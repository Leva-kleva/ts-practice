import { API_URL } from '../constants/constants';

export const getLastReadingBooks = async () => {
  try {
    const rawResponse = await fetch(`${API_URL}/api/v1/book/last`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
      },
    });
    if (rawResponse.ok) {
      const data = await rawResponse.json();
      return data;
    }
  } catch {
    return false;
  }
};
