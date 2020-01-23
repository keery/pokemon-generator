import React from 'react';
import { InteractiveInput, InteractiveFile, InteractiveSelectHover } from '..';
import './LayerCard.scss';

const LayerCard = () => (
    <div className="LayerCard">
        <InteractiveInput
            x={8.2}
            y={6.2}
            height={4.9}
            width={55}
            fontSize={31}
            fontFamily="pokename"
        />
        <InteractiveFile />
        <InteractiveSelectHover />
    </div>
);

export default LayerCard;
