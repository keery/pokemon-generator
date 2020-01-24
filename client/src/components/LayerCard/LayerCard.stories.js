import React from 'react';
import { storiesOf } from '@storybook/react';

import LayerCard from './LayerCard';
import Background from '../../assets/1-gen/grass-basic.png';

const styleContainer = {
    width           : '540px',
    height          : '755px',
    position        : 'relative',
    backgroundImage : `url(${Background})`,
    backgroundSize  : 'contain',
};

storiesOf('LayerCard', module).addWithJSX('with background', () => (
    <div style={styleContainer}>
        <LayerCard hasBg />
    </div>
));
