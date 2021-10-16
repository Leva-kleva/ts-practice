import { API_URL } from '../constants/constants';

export const getRecomendations = async () => {
  try {
    const rawResponse = await fetch(`${API_URL}/api/v1/ml/recommendations`, {
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
