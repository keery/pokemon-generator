import React from 'react';
import { shallow } from 'enzyme';
import SelectInput from './SelectInput';

describe('SelectInput component unit test', () => {
    let wrapper;
    const props = {
        name      : 'select the right choice',
        value     : 'eulav',
        onChange  : jest.fn(),
        blankLine : false,
    };

    beforeAll(() => {
        wrapper = shallow(<SelectInput {...props} />);
    });

    it('should at least render component', () => {
        expect(wrapper.exists()).toBeTruthy();
    });

    it('should call props onClick', () => {
        wrapper.find('select').simulate('change');
        expect(props.onChange).toHaveBeenCalled();
    });

    it('should render list if prop is not empty', () => {
        const choices = ['one', 'two'];
        wrapper.setProps({ choices });
        expect(wrapper.find('option').length).toEqual(choices.length);
    });

    it('should add a blank line at first position in choices', () => {
        wrapper.setProps({ blankLine : true });
        expect(wrapper.find('option').at(0).prop('value')).toEqual('');
    });
});
