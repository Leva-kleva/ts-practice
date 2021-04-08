import { API_URL } from '../constants/constants';
//@ts-ignore
import { getHeaders } from './utils';

export const getComicsMarkdown = async (
  levelIdx: number,
  lessonIdx: number
) => {
  try {
    const rawResponse = await fetch(
      `${API_URL}/api/lessons/levels/${levelIdx}/${lessonIdx}`,
      //@ts-ignore
      getHeaders(window.token)
    );
    if (rawResponse.ok) {
      return await rawResponse.json();
    }
    return false;
  } catch {
    return false;
  }
};
