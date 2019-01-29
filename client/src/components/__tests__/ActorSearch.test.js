import { shallow } from 'enzyme';
import React from 'react';
import ActorSearch from '../ActorSearch';

describe('ActorSearch', () => {
    it('renders correctly', () => {
      const wrapper = shallow(<ActorSearch />);
      expect(wrapper).toMatchSnapshot();
      
    });
  });