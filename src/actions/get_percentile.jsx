import axios from 'axios';

export const GET_PERCENTILE = 'GET_PERCENTILE';

export default function (ticker) {
  
  return axios.get(`/getMetrics/${ticker}`)
    .then((percentiles) => {
      console.log("PERCENTILE", percentiles.data)
      const percentileData = percentiles.data

      return {
       type: GET_PERCENTILE,
       payload: percentileData
     }
    })



}
