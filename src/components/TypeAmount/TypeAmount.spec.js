import React from 'react';
import { shallow } from 'enzyme';
import TypeAmount from './TypeAmount';

describe('TypeAmount component unit test', () => {
    let wrapper;
    const props = {
        x : 0,
        y : 0,
    };

    beforeAll(() => {
        wrapper = shallow(<TypeAmount {...props} />);
    });

    it('should at least render component', () => {
        expect(wrapper.exists()).toBeTruthy();
    });

    it('should display type image if defined', () => {
        wrapper.setProps({ type : new Image() });
        expect(wrapper.find('Image').exists()).toBeTruthy();
    });

    it('should display amount image if defined', () => {
        wrapper.setProps({ amount : '30' });
        expect(wrapper.find('Text[text="30"]').exists()).toBeTruthy();
    });
});
