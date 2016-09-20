import { combineReducers } from 'redux';
import StockReducer from './stock_reducer';

const rootReducer = combineReducers({
  stocks: StockReducer
});

export default rootReducer;
