import React from 'react';
import { storiesOf } from '@storybook/react';
import LanguageSelector from './LanguageSelector';

storiesOf('LanguageSelector', module) 
    .add('is opened', () => <LanguageSelector name="Test" isOpen />);
