import { API_URL } from '../constants/constants';

export const bindBookWithUser = async (body: any) => {
  try {
    const rawResponse = await fetch(`${API_URL}/api/v1/accounts/user/bind`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    if (rawResponse.ok) {
      const data = await rawResponse.json();
      return data;
    }
  } catch {
    return false;
  }
};
