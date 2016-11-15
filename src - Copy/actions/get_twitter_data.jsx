import axios from 'axios';

export const GET_TWITTER_DATA = "GET_TWITTER_DATA";

export default function(company) {
  let sentimentData = axios.get(`/getTwitterData/${company}`);
  // console.log('##############sentdata in twit action #######', sentimentData);
  return {
    type: GET_TWITTER_DATA,
    payload: sentimentData
  }
}
