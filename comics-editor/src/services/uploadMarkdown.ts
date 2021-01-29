import { API_URL } from '../constants/constants';

export const uploadMarkdown = async (
  data: any,
  level: number,
  lesson: number
) => {
  try {
    const rawResponse = await fetch(
      `${API_URL}/api/lessons/levels/${level}/${lesson}/upload_comics/`,
      {
        method: 'POST',
        headers: {
          Authorization: `Token ${window.token}`,
          'content-type': 'application/json',
        },
        body: JSON.stringify(data),
      }
    );
    if (rawResponse.ok) {
      const response = await rawResponse.json();
      return true;
    }
    return false;
  } catch {
    return false;
  }
};
