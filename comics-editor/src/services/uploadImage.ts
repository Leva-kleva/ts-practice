import { API_URL } from '../constants/constants';

type Response = {
  id: number;
  image: string;
};

export const uploadImage = async (data: any) => {
  try {
    const rawResponse = await fetch(`${API_URL}/api/upload_any_image`, {
      method: 'POST',
      headers: {
        Authorization: `Token ${window.token}`,
      },
      body: data,
    });
    if (rawResponse.ok) {
      const response: Response = await rawResponse.json();
      return response.image;
    }
    return false;
  } catch {
    return false;
  }
};
