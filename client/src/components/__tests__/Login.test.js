import { shallow } from 'enzyme';
import React from 'react';
import Login from '../Login';

describe('Home', () => {
    it('renders correctly', () => {
      const wrapper = shallow(<Login />);
      expect(wrapper).toMatchSnapshot();
      
    });
  });