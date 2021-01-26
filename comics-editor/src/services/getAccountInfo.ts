import { API_URL } from '../constants/constants';

const getAccountInfo = async () => {
  try {
    const rawResponse = await fetch(`${API_URL}/api/account_info/`, {
      headers: {
        Authorization: `${window.authType} ${window.token}`,
        'Content-Type': 'application/json',
      },
    });
    if (rawResponse.ok) {
      const response = await rawResponse.json();
      return response;
    }
    return false;
  } catch {
    return false;
  }
};

export default getAccountInfo;
