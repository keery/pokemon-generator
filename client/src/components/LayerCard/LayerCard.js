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
    WEAKNESS_CHOICES,
    ELEMENTS,
} from '../../const';

import './LayerCard.scss';

const LayerCard = ({
    handleChange, setRetreatVisible, illustrator, name, description, hp, resistanceType, resistanceAmount, weaknessAmount, weaknessType, mainPicture, mainPictureUppy, evolvePictureUppy, removePicture,
}) => (
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
            value={hp}
        />

        {/* MAIN PICTURE */}
        <InteractiveFile
            name="mainPicture"
            uppy={mainPictureUppy}
            picture={mainPicture}
            removePicture={removePicture}
        />

        {/* SPECIES SIZE WEIGHT */}
        <InteractiveArea
            x={14}
            y={54}
            height={3}
            width={71.9}
        />

        {/* WEAKNESS TYPE */}
        <ButtonList
            name="weaknessType"
            x={12.7}
            y={84.8}
            size={3.2}
            items={ELEMENTS}
            handleClick={handleChange}
            value={weaknessType}
        />

        {/* WEAKNESS AMOUNT */}
        <InteractiveSelect
            name="weaknessAmount"
            x={18.5}
            y={85}
            height={4.2}
            width={7}
            choices={WEAKNESS_CHOICES}
            onChange={handleChange}
            value={weaknessAmount}
        />

        {/* RESISTANCE TYPE */}
        <ButtonList
            name="resistanceType"
            x={45.7}
            y={84.8}
            size={3.2}
            items={ELEMENTS}
            handleClick={handleChange}
            value={resistanceType}
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
            value={resistanceAmount}
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
