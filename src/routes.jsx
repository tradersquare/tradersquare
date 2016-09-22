import React from 'react';
import {Route, IndexRoute} from 'react-router';
import App from './components/app';
import SearchBar from './components/search_bar';
import StockView from './components/stock_view';
import WatchList from './components/watchlist';

export default (
  <Route path="/" component={App} >
    {/* following in case don't want search bar on every page  */}
    {/* <IndexRoute component={SearchBar} /> */}
    <Route path="stockview" component={StockView} />
    <Route path="/strategyview" component={WatchList}/>
  </Route>
);
