import { API_URL } from '../constants/constants';

export const results = async () => {
  try {
    const rawResponse = await fetch(API_URL + '/api/querypage', {
      headers: {
        Authorization: `Bearer ${window.token}`,
      },
    });
    const response = rawResponse.json();
    return response;
  } catch {
    return false;
  }
};
