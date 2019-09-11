import React from 'react';
import { shallow } from 'enzyme';
import GroupTitle from './GroupTitle';

describe('GroupTitle component unit test', () => {
    let wrapper;
    const props = {
        onClick    : jest.fn(),
        title      : 'Title is beautiful',
        stepNumber : '01',
    };

    beforeEach(() => {
        wrapper = shallow(<GroupTitle {...props} />);
    });

    it('should at least render component', () => {
        expect(wrapper.exists()).toBeTruthy();
    });

    it('should call props onClick', () => {
        wrapper.find('.gfields-header').simulate('click');
        expect(props.onClick).toHaveBeenCalled();
    });
});
