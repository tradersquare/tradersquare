import React from 'react';
import { mount, shallow } from 'enzyme';
import {expect} from 'chai';

import SearchBar from '../src/components/search_bar';


describe('SearchBar', function () {
  it('should return something', function () {
    const wrapper = shallow(<SearchBar />);
    expect(wrapper.find('Link')).to.have.length(1);
  });
})
