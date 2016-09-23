import { combineReducers } from 'redux';
import StockReducer from './stock_reducer';
import Strat1 from './strategyF_reducer';
import StrategyViewReducer from './strategy_reducer'

const rootReducer = combineReducers({
  stock: StockReducer,
  stratData: StrategyViewReducer,
  strat1: Strat1
});

export default rootReducer;
