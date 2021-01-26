import { API_URL } from '../constants/constants';

const getHeaders = (token: string) => {
  if (token) {
    return {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${window.authType} ${window.token}`,
      },
    };
  } else
    return {
      headers: {
        'Content-Type': 'application/json',
      },
    };
};

export const getLessons = async (endPoint: string) => {
  try {
    const rawResponse = await fetch(
      API_URL + endPoint + '/',
      //@ts-ignore
      getHeaders(window.token)
    );
    if (rawResponse.ok) {
      const response = await rawResponse.json();
      return response;
    }
    return false;
  } catch {
    return false;
  }
};
