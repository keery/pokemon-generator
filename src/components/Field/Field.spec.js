import React from 'react';
import { shallow } from 'enzyme';
import Field from './Field';

describe('Field component unit test', () => {
    const props = {
        label : 'imaginative label',
    };

    it('should at least render component and his children', () => {
        const wrapper = shallow(<Field {...props}><p className="child">Thx dad</p></Field>);
        expect(wrapper.exists()).toBeTruthy();
        expect(wrapper.find('.child').exists()).toBeTruthy();
    });
});
