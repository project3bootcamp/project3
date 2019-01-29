import { shallow } from 'enzyme';
import React from 'react'
import MovieCard from '../MovieCard';

describe('MovieCard', () => {
    it('renders correctly', () => {
      const wrapper = shallow(<MovieCard />);
      expect(wrapper).toMatchSnapshot();
      
    });
  });