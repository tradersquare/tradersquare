import { ADD_STOCK } from '../actions/add_stock';

export default function(state = [], action) {
  // console.log('reducer: watchlist reducer: action.payload', action.payload);
  switch(action.type) {
    case ADD_STOCK:
      // state.push(action.payload);
      const allRows = action.payload.data;
      console.log('watchlist action: ', allRows);
      state = allRows.map( v => {
        return {ticker: v.stockticker, name: v.stockname, close_price: v.closingprice}
      })
      console.log('reducer: watchlist reducer: state', state);
      return state;
    default:
      return state;
  }
}
