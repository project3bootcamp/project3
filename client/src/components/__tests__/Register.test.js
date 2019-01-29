import { shallow } from 'enzyme';
import React from 'react';
import Register from '../Register';



describe('Register', () => {
    it('renders correctly', () => {
      const wrapper = shallow(<Register />);
      expect(wrapper).toMatchSnapshot();
      });
  });