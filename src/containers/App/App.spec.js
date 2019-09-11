import React from 'react';
import { shallow } from 'enzyme';
import App from './App';
import '../../i18n/setupI18n';

describe('App component unit test', () => {
    it('should at least render component', () => {
        const wrapper = shallow(<App />);
        expect(wrapper.exists()).toEqual(true);
    });
});
