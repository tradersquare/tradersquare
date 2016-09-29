import { GET_GRAPH } from '../actions/get_graph_data';

const INITIAL_STATE = { all: [], post: null};

let myDefault = [];

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case GET_GRAPH:
      console.log('reducer: graph_reducer: action.payload', action.payload);
      // console.log('graph payload: ', action.payload.data);
      myDefault = action.payload.data.data
      return action.payload.data.data;
    default:
      console.log('did it work? (myDefault): ', myDefault);
      return myDefault;
  }
}
