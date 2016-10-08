import React from 'react';
import { expect } from 'chai';
import { shallow, mount, render } from 'enzyme';
import sinon from 'sinon';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Utils from 'react-addons-test-utils';
import StockView from '../../src/components/stock_view';
import thunk from 'redux-thunk';
const middlewares = [thunk];

const Store = configureStore(middlewares);
describe('<StockView />', function() {
  const initialState = {
    stocks: [],
    dummy: null,
    shouldTrue: true
  };
  const store = Store(initialState);
  const wrapper = shallow(<Provider store={store}><StockView onClick={this.submit}/></Provider>);
  it('Test if it exits', function() {
    expect(wrapper.find('div'))
  })
});
