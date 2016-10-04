import { GET_GRAPH } from '../actions/get_graph_data';

export default function(state = [], action) {
  switch(action.type) {
    case GET_GRAPH:
      console.log('reducer: graph_reducer: action.payload', action.payload);
      return action.payload.data.data;
    default:
      return state;
  }
}
