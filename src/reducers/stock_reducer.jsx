import { GET_DATA } from '../actions/stock_search';

const INITIAL_STATE = { all: [], post: null};

/**
 * [description]
* @param  {[type]} action                [description]
* @functino        action                [make get call to server]
 */
let myDefault = [];

export default function(state = INITIAL_STATE, action) {
  // console.log()
  switch(action.type) {
    case GET_DATA:
      console.log('reducer: stock_reducer: action.payload ', action.payload);
      myDefault = (action.payload.data.data);
      return action.payload.data.data;
    default:
      console.log('did it work? (myDefault): ', myDefault);
      return myDefault;
  }
}
