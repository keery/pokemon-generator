import React from 'react'
import { Box } from '@chakra-ui/react'
import {
  InteractiveInput,
  InteractiveFile,
  InteractiveSelect,
  InteractiveSelectHover,
  InteractiveTextarea,
} from './Interactive'
import { Areas } from '.'
import { ButtonList } from '..'
import {
  HP_CHOICES,
  RESISTANCE_CHOICES,
  WEAKNESS_CHOICES,
  ELEMENTS,
} from '../../const'

const LayerCard = ({
  handleChange,
  setRetreatVisible,
  illustrator,
  name,
  type,
  description,
  hp,
  resistanceType,
  resistanceAmount,
  weaknessAmount,
  weaknessType,
  mainImage,
  mainImageUppy,
  evolvePictureUppy,
  removePicture,
  handleBox,
}) => {
  return (
    <Box
      data-cy="layer-card"
      position="absolute"
      left="0"
      top="0"
      width="100%"
      height="100%"
      borderRadius="30px"
    >
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
        value={hp}
      />

      {/* TYPE */}
      <ButtonList
        name="type"
        x={83}
        y={5.4}
        size={3.9}
        items={ELEMENTS}
        handleClick={handleChange}
        value={type}
        removeButton={false}
      />

      {/* MAIN PICTURE */}
      <InteractiveFile
        name="mainImage"
        uppy={mainImageUppy}
        picture={mainImage}
        removePicture={removePicture}
      />

      {/* WEAKNESS TYPE */}
      <ButtonList
        name="weaknessType"
        x={12.6}
        y={84.9}
        size={1.8}
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
        x={45.8}
        y={84.9}
        size={1.8}
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
        x={71}
        y={85.2}
        height={3.6}
        width={22}
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

      {/* COLLECTION, RARITY, SPECIES, SIZE, WEIGHT */}
      <Areas />
    </Box>
  )
}

export default LayerCard