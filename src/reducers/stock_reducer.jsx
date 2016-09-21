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
    // console.log('in GET_DATA', action.payload);
      console.log('dataaaa', action.payload.data);
      let stockState = [];

      for (let key in action.payload.data) {
        stockState.push([[key], action.payload.data[key]]);
      }
      console.log('stockState: ', stockState);
      // return [{"ok": "ok"},{'hi': 'hi'}];
      return stockState;
    default:
      return [
        'hello'
      ];
  }
}
