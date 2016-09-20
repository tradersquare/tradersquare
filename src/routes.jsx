import React from 'react';
import { Route, IndexRoute} from 'react-router';
import App from './components/app';
import SearchBar from './components/search_bar';
import StockView from './components/stock_view';


export default (
  <Route path="/" component={App} >
    {/* <IndexRoute component={SearchBar} /> */}
    <Route path="stockview" component={StockView} />
  </Route>
);
