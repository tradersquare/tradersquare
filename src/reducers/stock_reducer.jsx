import { GET_DATA } from '../actions/index';

const INITIAL_STATE = { all: [], post: null};

/**
 * [description]
* @param  {[type]} action                [description]
* @functino        action                [make get call to server]
 */
export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case GET_DATA:
      console.log('in GET_DATA', action.payload);
      console.log('dataaaa', action.payload.data);
      return [
        {title: action.payload},
        {title: 'JS'},
        {title: 'PY'}
      ];
    default:
      return [
        {title: 'HPd'},
        {title: 'JS'},
        {title: 'PY'}
      ];
  }
}
