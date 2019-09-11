import React from 'react';
import { shallow } from 'enzyme';
import Header from './Header';

describe('Header component unit test', () => {
    it('should at least render component', () => {
        const wrapper = shallow(<Header />).dive();
        expect(wrapper.exists()).toBeTruthy();
    });
});
