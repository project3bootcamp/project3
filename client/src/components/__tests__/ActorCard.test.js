import { shallow } from 'enzyme';
import React from 'react';
import ActorCard from '../ActorCard'

describe('ActorCard', () => {
    it('renders correctly', () => {
      const wrapper = shallow(<ActorCard />);
      expect(wrapper).toMatchSnapshot();
      
    });
  });