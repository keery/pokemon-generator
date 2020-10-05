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
    handleChange, setRetreatVisible, illustrator, name, type, description, hp, resistanceType, resistanceAmount, weaknessAmount, weaknessType, mainPicture, mainPictureUppy, evolvePictureUppy, removePicture, handleBox,
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

        {/* TYPE */}
        <ButtonList
            name="type"
            x={83}
            y={5.4}
            size={3.5}
            items={ELEMENTS}
            handleClick={handleChange}
            value={type}
            removeButton={false}
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
            handleClick={handleBox}
            linkedGroup="01"
            focusField="input[name=species]"
        />

        {/* WEAKNESS TYPE */}
        <ButtonList
            name="weaknessType"
            x={12.7}
            y={85}
            size={2.5}
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
            x={46}
            y={85}
            size={2.5}
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
            x={70.8}
            y={85}
            height={3.9}
            width={22.3}
            handleClick={handleChange}
            setRetreatVisible={setRetreatVisible}
        />

        {/* DESCRIPTION */}
        <InteractiveTextarea
            name="description"
            x={8.5}
            y={89.3}
            height={5.6}
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
            handleClick={handleBox}
            linkedGroup="06"
            focusField="input[name=cardNumber]"
        />
    </div>
);

export default LayerCard;
