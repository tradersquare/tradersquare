import { ADD_STOCK } from '../actions/add_stock';

export default function(state = [], action) {
  // console.log('reducer: watchlist reducer: action.payload', action.payload);
  switch(action.type) {
    case ADD_STOCK:
      state.push(action.payload);
      console.log('reducer: watchlist reducer: action.payload', state);
      return state;
    default:
      return state;
  }
}
