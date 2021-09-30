import React from 'react';
import { shallow } from 'enzyme';
import App from './App';

describe('App component unit test', () => {
    it('should at least render component', () => {
        const wrapper = shallow(<App />);
        expect(wrapper.exists()).toEqual(true);
    });
});
