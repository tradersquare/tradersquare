import React from 'react';
import { shallow, render, mount } from 'enzyme';
import { expect } from 'chai';
import App from '../src/components/app';


describe('<App />', function() {
  it('our app should exist', function() {
    const wrapper = shallow(<App />);
    expect(wrapper).to.exist;
  })
})
