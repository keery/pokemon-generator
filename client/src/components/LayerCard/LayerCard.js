import React from 'react';
import {
    InteractiveInput,
    InteractiveFile,
    InteractiveSelect,
    InteractiveSelectHover,
    InteractiveTextarea,
    InteractiveArea,
} from '../Interactive';

import {
    HP_CHOICES,
} from '../../const';

import './LayerCard.scss';

const LayerCard = ({ handleChange, setRetreatVisible }) => (
    <div className="LayerCard">
        {/* NAME */}
        <InteractiveInput
            name="name"
            x={8.7}
            y={7}
            height={4.3}
            width={55}
            fontSize={31}
            fontFamily="pokename"
            onChange={handleChange}
        />

        {/* HP */}
        <InteractiveSelect
            name="hp"
            x={64.5}
            y={7}
            height={4.3}
            width={19.3}
            choices={HP_CHOICES}
            onChange={handleChange}
        />

        {/* MAIN PICTURE */}
        <InteractiveFile />

        {/* SPECIES SIZE WEIGHT */}
        <InteractiveArea
            x={14}
            y={54}
            height={3}
            width={71.9}
        />

        {/* WEAKNESS */}
        <InteractiveArea
            x={8.5}
            y={85}
            height={4}
            width={15}
        />

        {/* RESISTANCE */}
        <InteractiveArea
            x={41.2}
            y={85}
            height={4}
            width={15}
        />

        {/* RETREAT */}
        <InteractiveSelectHover
            name="retreat"
            x={74.4}
            y={85}
            height={4}
            width={16}
            handleClick={handleChange}
            setRetreatVisible={setRetreatVisible}
        />

        {/* DESCRIPTION */}
        <InteractiveTextarea
            x={8.5}
            y={89.2}
            height={5.7}
            width={81.7}
            fontSize={16}
            fontFamily="pokevolution"
            onChange={handleChange}
        />

        {/* ILLUSTRATOR */}
        <InteractiveInput
            name="illustrator"
            x={4.7}
            y={94.9}
            height={2.2}
            width={22.3}
            fontSize={10.5}
            fontFamily="pokename"
            onChange={handleChange}
        />

        {/* COLLECTION RARITY */}
        <InteractiveArea
            x={81}
            y={94.9}
            height={2.2}
            width={14.2}
        />
    </div>
);

export default LayerCard;
