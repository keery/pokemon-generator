import React from 'react';
import {
    InteractiveInput,
    InteractiveFile,
    InteractiveSelect,
    InteractiveSelectHover,
    InteractiveTextarea,
    InteractiveArea,
} from '../Interactive';

import { ButtonList } from '..';

import {
    HP_CHOICES,
    RESISTANCE_CHOICES,
    ELEMENTS,
} from '../../const';

import './LayerCard.scss';

const LayerCard = ({ handleChange, setRetreatVisible, illustrator, name, description }) => (
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
            value={name}
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
            addClass="hp"
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

        {/* RESISTANCE TYPE */}
        <ButtonList
            name="resistanceType"
            x={46}
            y={85}
            size={3}
            items={ELEMENTS}
            handleClick={handleChange}
        />

        {/* RESISTANCE AMOUNT */}
        <InteractiveSelect
            name="resistanceAmount"
            x={51.5}
            y={85}
            height={4.2}
            width={7}
            choices={RESISTANCE_CHOICES}
            onChange={handleChange}
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
            name="description"
            x={8.5}
            y={89.2}
            height={5.7}
            width={81.7}
            fontSize={15}
            fontFamily="pokevolution"
            onChange={handleChange}
            value={description}
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
            value={illustrator}
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
