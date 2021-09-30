import React from 'react';
import { storiesOf } from '@storybook/react';

import LanguageSelector from './LanguageSelector';

storiesOf('LanguageSelector', module) 
    .addWithJSX('is opened', () => <LanguageSelector name="Test" isOpen />);
