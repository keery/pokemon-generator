import React from 'react';
import { shallow } from 'enzyme';
import Loader from './Loader';

describe('Loader component unit test', () => {
    it('should at least render component', () => {
        const wrapper = shallow(<Loader />);
        expect(wrapper.exists()).toBeTruthy();
    });
});
