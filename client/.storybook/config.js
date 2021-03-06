import React, { Suspense } from 'react';
import { configure, addDecorator, setAddon } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import JSONAddon from 'storybook-addon-jsx'
import { I18nextProvider } from 'react-i18next';

import i18n from '../src/i18n/setupI18n';


export default function SuspenseWrapper({ children }) {
    return <Suspense fallback={<div>loading...</div>}>{children}</Suspense>;
}

// Addon which show component's JSX
setAddon(JSONAddon);

// Show information about your component like proptypes
addDecorator(withInfo);
addDecorator((storyFn) => (
    <SuspenseWrapper>
        <I18nextProvider i18n={i18n}>
            <div style={{ textAlign: 'center' }}>
                {storyFn()}
            </div>
        </I18nextProvider>
    </SuspenseWrapper>
));
configure(require.context('../src', true, /\.stories\.js$/), module);
