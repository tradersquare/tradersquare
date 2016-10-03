import axios from 'axios';

export const GET_PERCENTILE = 'GET_PERCENTILE';

export default function (ticker) {
  
  return axios.get(`/stockTest/${ticker}`)
    .then((percentiles) => {
      console.log("PERCENTILE", percentiles.data)
      const percentileData = percentiles.data.reduce((final, item) => {
        final[item.metric] = {
          percentile: item.percentile,
          value: item.value
        }
        return final;
      }, {})
      return {
       type: GET_PERCENTILE,
       payload: percentileData
     }
    })



}
