import { GET_PERCENTILE } from '../actions/get_percentile';

/**
 * [description]
* @param  {[type]} action                [description]
* @functino        action                [make get call to server]
 */

export default function(state = null, action) {
  switch(action.type) {
    case GET_PERCENTILE:
      console.log('reducer: percentile', action.payload);
      return action.payload;
    default:
      return state;
  }
}
