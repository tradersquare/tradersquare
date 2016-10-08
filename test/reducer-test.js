import React from 'react';
import { shallow, render, mount } from 'enzyme';
import { expect } from 'chai';
import { GET_DATA } from '../src/actions/stock_search';
import reducer from '../src/reducers/stock_reducer';

describe('Reducers testing', () => {
  let state, action;
  beforeEach(() => {
    state = ['stock state'];
    action = {
      type: GET_DATA,
      payload: {
        data: 'stock data'
      }
    };
  })
  it('should be a function', () => {
    expect(reducer).to.be.a('function');
  })
  it('should return the current state by default', () => {
    expect(reducer(state, 'stock')).to.eql(['stock state']);
  })
});
