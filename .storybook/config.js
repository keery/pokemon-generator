import React, { Suspense } from 'react';
import { configure, addDecorator } from '@storybook/react';
import { I18nextProvider } from 'react-i18next';
import i18n from '../src/i18n/setupI18n';


export default function SuspenseWrapper({ children }) {
    return <Suspense fallback={<div>loading...</div>}>{children}</Suspense>;
  }

addDecorator(story => <SuspenseWrapper>{story()}</SuspenseWrapper>)
addDecorator((storyFn) => (
    <I18nextProvider i18n={i18n}>
        <div style={{ textAlign: 'center' }}>
            {storyFn()}
        </div>
    </I18nextProvider>
));
configure(require.context('../src', true, /\.stories\.js$/), module);
