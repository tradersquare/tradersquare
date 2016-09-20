import { GET_DATA } from '../actions/index';

const INITIAL_STATE = { all: [], post: null};

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case GET_DATA:
      return [
        {title: 'HP'},
        {title: 'JS'},
        {title: 'PY'}
      ];
    default:
      return [
        {title: 'HP'},
        {title: 'JS'},
        {title: 'PY'}
      ];
  }
}
