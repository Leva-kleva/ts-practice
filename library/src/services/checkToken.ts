import { API_URL } from '../constants/constants';

const checkToken = async () => {
  try {
    const rawResponse = await fetch(API_URL + '/check-token', {
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

export default checkToken;
