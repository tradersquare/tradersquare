import React, { Component } from 'react';
import SearchBar from './search_bar';
import StrategyView from './strategy_view';
import StockView from './stock_view';
import * as firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyA6iK01GbFJq4MNGD68ef4zhPQSRPow-I0",
    authDomain: "tradersquare-ed7bc.firebaseapp.com",
    databaseURL: "https://tradersquare-ed7bc.firebaseio.com",
    storageBucket: "tradersquare-ed7bc.appspot.com",
    messagingSenderId: "139146427287"
};
const firebaseApp = firebase.initializeApp(firebaseConfig);

export default class App extends Component {
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}
