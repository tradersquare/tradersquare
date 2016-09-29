import React from 'react';
import {Route, IndexRoute} from 'react-router';
import App from './components/app';
import SearchBar from './components/search_bar';
import StockView from './components/stock_view';
import StrategyView from './components/strategy_view';
import Landing from './components/landing';
import FilterView from './components/filter_view';


export default (
  <Route path="/" component={App} >
    {/* following in case don't want search bar on every page  */}
    <IndexRoute component={Landing} />
    <Route path="/stockview" component={StockView} />
    <Route path="/strategyview" component={StrategyView}/>
    <Route path="/filterview" component={FilterView}/>
  </Route>
);
