import { GET_GRAPH } from '../actions/get_graph_data';

const INITIAL_STATE = { all: [], post: null};

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case GET_GRAPH:
      console.log('graph payload: ', action.payload.data);
      return action.payload.data.data;
    default:
      return [
        ''
      ];
  }
}
