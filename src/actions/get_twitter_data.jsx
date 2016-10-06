import axios from 'axios';

export const GET_TWITTER_DATA = "GET_TWITTER_DATA";

export default function(company) {
  let twitterData = axios.get(`/getTwitterData/${company}`);

  return {
    type: GET_TWITTER_DATA,
    payload: twitterData
  }
}
