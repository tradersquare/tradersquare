import { combineReducers } from 'redux';
import StockReducer from './stock_reducer';
import Strat1 from './strategyF_reducer';
import StrategyViewReducer from './strategy_reducer';
import GraphReducer from './graph_reducer';
import FilterReducer from './filter_reducer';
import PercentileReducer from './percentile_reducer';
import MetricReducer from './metric_reducer';
import WatchListReducer from './watchlist_reducer';
import AuthReducer from './auth_reducer';
import SentimentData from './twitter_reducer';
import StockValidation from './stock_view_validation_reducer';

const rootReducer = combineReducers({
  stock: StockReducer,
  stratData: StrategyViewReducer,
  strat1: Strat1,
  graphData: GraphReducer,
  filterData: FilterReducer,
  percentileData: PercentileReducer,
  stratMetric: MetricReducer,
  watchList: WatchListReducer,
  auth: AuthReducer,
  stockValidation: StockValidation,
  sentimentData: SentimentData
})

export default rootReducer;
