import { GET_DATA } from '../actions/stock_search';

/**
 * [description]
* @param  {[type]} action                [description]
* @functino        action                [make get call to server]
 */

export default function(state = [], action) {
  // console.log()
  switch(action.type) {
    case GET_DATA:
      console.log('reducer: stock_reducer: action.payload ', action.payload);
      return action.payload.data.data;
    default:
      console.log('did it work? (myDefault): ', myDefault);
      return state;
  }
}
