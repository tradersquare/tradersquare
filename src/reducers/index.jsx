import { combineReducers } from 'redux';
import StockReducer from './stock_reducer';
import Strat1 from './strategyF_reducer';

const rootReducer = combineReducers({
  stock: StockReducer,
  strat1: Strat1
});

export default rootReducer;
