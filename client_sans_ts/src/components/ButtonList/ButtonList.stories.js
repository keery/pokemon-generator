import React from 'react';
import { storiesOf } from '@storybook/react';

import ButtonList from './ButtonList';
import { ELEMENTS } from '../../const';

storiesOf('ButtonList', module)
    .addWithJSX('display list', () => <div style={{ marginTop : '100px' }}><ButtonList items={ELEMENTS} /></div>)
    .addWithJSX('empty list', () => <div style={{ marginTop : '100px' }}><ButtonList /></div>);
