import React from 'react';
import { storiesOf } from '@storybook/react';

import LayerCard from './LayerCard';

storiesOf('LayerCard', module)
    .addWithJSX('is opened', () => <LayerCard />);
