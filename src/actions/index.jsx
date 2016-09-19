import axios from 'axios';

export const GET_DATA = 'GET_DATA';

export function fetchPosts() {
  // const request = axios.get(`${ROOT_URL}/posts${API_KEY}`)

  return {
    type: GET_DATA,
    payload: request
  };
}
