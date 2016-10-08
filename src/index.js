import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, browserHistory } from 'react-router';
import reducers from './reducers';
import routes from './routes';
import reduxPromise from 'redux-promise';
import App from './components/app';
import firebase from 'firebase';
import thunk from 'redux-thunk';
import authActions from './actions/auth';



const createStoreWithMiddleware = applyMiddleware(reduxPromise, thunk)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <Router history={browserHistory} routes={routes} />
  </Provider>
  , document.querySelector('.container'));

