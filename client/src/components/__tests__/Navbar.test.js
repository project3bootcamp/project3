import { shallow } from 'enzyme';
import React from 'react';
import Navbar from '../Navbar';

describe('Home', () => {
    it('renders correctly', () => {
      const wrapper = shallow(<Navbar />);
      expect(wrapper).toMatchSnapshot();
      
    });
  });