import axios from 'axios';

export const GET_GRAPH = 'GET_GRAPH';

export function getGraphData(ticker) {

  let graphReq = axios.get(`/getGraphData/${ticker}`);
  console.log(graphReq);

  return {
    type: GET_GRAPH,
    payload: graphReq
  };
}
