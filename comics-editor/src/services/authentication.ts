import { API_URL } from '../constants/constants';

export const signin = async (body: ISigninBody) => {
  try {
    const rawResponse = await fetch(`${API_URL}/api-login/`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    if (!rawResponse.ok) return false;
    const data = await rawResponse.json();
    return data;
  } catch {
    return false;
  }
};
