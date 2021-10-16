import { API_URL } from '../constants/constants';
//@ts-ignore
import Cookies from 'js-cookie';

export const signin = async (body: any) => {
  try {
    const rawResponse = await fetch(`${API_URL}/api/v1/login`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    const data = await rawResponse.json();
    console.log(data.headers);

    Cookies.set('access_token', data.headers['x-access-token']);
    return data;
  } catch {
    return false;
  }
};

export const signup = async (body: any) => {
  try {
    const rawResponse = await fetch(`${API_URL}/api/v1/signup`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    const data = await rawResponse.json();
    return data;
  } catch {
    return false;
  }
};
