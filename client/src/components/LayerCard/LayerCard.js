import React from 'react';
import {
    InteractiveInput,
    InteractiveFile,
    InteractiveSelect,
    InteractiveSelectHover,
    InteractiveTextarea,
    InteractiveArea,
} from '../Interactive';
import './LayerCard.scss';

const LayerCard = () => (
    <div className="LayerCard">
        {/* NAME */}
        <InteractiveInput
            x={8.2}
            y={6.2}
            height={4.9}
            width={55}
            fontSize={31}
            fontFamily="pokename"
        />

        {/* HP */}
        <InteractiveSelect
            x={67}
            y={6.2}
            height={4}
            width={15}
            fontSize={10.5}
            fontFamily="pokename"
        />

        {/* MAIN PICTURE */}
        <InteractiveFile />

        {/* SPECIES SIZE WEIGHT */}
        <InteractiveArea
            x={13.7}
            y={53.7}
            height={2.3}
            width={71.4}
        />

        {/* WEAKNESS */}
        <InteractiveArea
            x={8.5}
            y={84.7}
            height={3}
            width={14}
        />

        {/* RESISTANCE */}
        <InteractiveArea
            x={41.3}
            y={84.7}
            height={3}
            width={14}
        />

        {/* RETREAT */}
        <InteractiveSelectHover />

        {/* DESCRIPTION */}
        <InteractiveTextarea
            x={8.6}
            y={88.7}
            height={4.7}
            width={77.8}
            fontSize={16}
            fontFamily="pokevolution"
        />

        {/* ILLUSTRATOR */}
        <InteractiveInput
            x={5.1}
            y={94}
            height={1.5}
            width={18.7}
            fontSize={10.5}
            fontFamily="pokename"
        />

        {/* RESISTANCE */}
        <InteractiveArea
            x={80.4}
            y={94.5}
            height={1.5}
            width={14}
        />
    </div>
);

export default LayerCard;
