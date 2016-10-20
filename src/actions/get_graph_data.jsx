import axios from 'axios';

export const GET_GRAPH = 'GET_GRAPH';

// used by: components:/search_bar.jsx
export function getGraphData(ticker) {

  let graphReq = axios.get(`/getGraphData/${ticker}`);
  // console.log('action: get_graph_data: ', graphReq);

  return {
    type: GET_GRAPH,
    payload: graphReq
  };
}
