import { API_URL } from '../constants/constants';

export const search = async (body: any) => {
  try {
    const rawResponse = await fetch(`${API_URL}/api/search`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${window.token}`,
      },
      body: JSON.stringify(body),
    });
    const data = await rawResponse.json();
    return data;
  } catch {
    return false;
  }
};
