import React from 'react';
import { mount } from 'enzyme';
import * as Sentry from '@sentry/browser';
import ErrorBoundary from './ErrorBoundary';

Sentry.showReportDialog = jest.fn();

const TestComponent = () => (
    <div>Test</div>
);

const throwChildrenError = (wrapper) => {
    const children = wrapper.find(TestComponent);
    const error = new Error('test error');
    children.simulateError(error);
};

describe('ErrorBoundary Component Unit Test', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = mount(<ErrorBoundary><TestComponent /></ErrorBoundary>).find('ErrorBoundary');
    });

    it('should at least render Content', () => {
        expect(wrapper.exists()).toEqual(true);
    });

    it('should catch when error is throw', () => {
        const spy = jest.spyOn(wrapper.instance(), 'componentDidCatch');
        throwChildrenError(wrapper);
        expect(wrapper.instance().state).toMatchObject({ hasError : true });
        expect(spy).toHaveBeenCalled();
    });

    it('should open Sentry popup on click', () => {
        throwChildrenError(wrapper);
        wrapper = wrapper.update();
        const button = wrapper.find('button.gradient-btn');
        expect(button.exists()).toBeTruthy();
        button.simulate('click');
        expect(Sentry.showReportDialog).toHaveBeenCalled();
    });
});
