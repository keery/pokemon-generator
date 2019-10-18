import React from 'react';
import { shallow } from 'enzyme';
import Modal from './Modal';

describe('Modal component unit test', () => {
    let wrapper;
    const props = {
        content    : <div>Content or not content</div>,
        closeModal : jest.fn(),
    };

    it('should at least render component', () => {
        wrapper = shallow(<Modal {...props} />).dive();
        expect(wrapper.exists()).toBeTruthy();
    });

    it('should call prop closeModal', () => {
        const closingArea = wrapper.find('.modal-closing-area');
        closingArea.simulate('click');
        expect(props.closeModal).toHaveBeenCalled();
    });
});
