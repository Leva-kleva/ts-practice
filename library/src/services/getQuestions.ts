import { API_URL } from '../constants/constants';

export const getQuestions = async () => {
  try {
    const rawResponse = await fetch(`${API_URL}/api/v1/account/feedback`, {
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
