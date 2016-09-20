import { combineReducers } from 'redux';
import StockReducer from './stock_reducer';

const rootReducer = combineReducers({
  stock: StockReducer
});

export default rootReducer;
