import { SEND_TICKER } from '../actions/stock_view_validation';
import { browserHistory } from 'react-router'

/**
 * [description]
* @param  {[type]} action                [description]
* @functino        action                [make get call to server]
 */

export default function(state = null, action) {
  switch(action.type) {
    case SEND_TICKER:
      console.log('reducer: validation', action.payload);
      return action.payload;
    default:
      return state;
  }
}
