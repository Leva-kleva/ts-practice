import { API_URL } from '../constants/constants';

export const getAccountInfo = async () => {
  try {
    const rawResponse = await fetch(`${API_URL}/api/updateAccountData`, {
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