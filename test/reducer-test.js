import React from 'react';
import { shallow, render, mount } from 'enzyme';
import { expect } from 'chai';
import { GET_DATA } from '../src/actions/stock_search';
import reducer from '../src/reducers/stock_reducer';

describe('Stock Reducer Tests', () => {
  let state, action;
  beforeEach(() => {
    state = ['stock state'];
    action = {
      type: GET_DATA,
      payload: {
        data: 'stock data';
      }
    };
  })
});
