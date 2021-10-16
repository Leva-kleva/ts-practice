import { API_URL } from '../constants/constants';

export const searchBook = async (body: any) => {
  try {
    const rawResponse = await fetch(`${API_URL}/api/v1/book/search`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    const data = await rawResponse.json();
    return data;
  } catch {
    return false;
  }
};
