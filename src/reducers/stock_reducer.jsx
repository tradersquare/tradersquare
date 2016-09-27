import { GET_DATA } from '../actions/stock_search';

const INITIAL_STATE = { all: [], post: null};

/**
 * [description]
* @param  {[type]} action                [description]
* @functino        action                [make get call to server]
 */
export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case GET_DATA:
      return action.payload.data.data;
    default:
      return [
        'hello'
      ];
  }
}
