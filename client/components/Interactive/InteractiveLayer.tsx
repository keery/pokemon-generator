import React from "react";
import { Box } from "@chakra-ui/react";
import InteractiveInput from "./InteractiveInput";
import InteractiveFile from "./InteractiveFile";
import InteractiveSelect from "./InteractiveSelect";
import InteractiveSelectHover from "./InteractiveSelectHover";
import InteractiveTextarea from "./InteractiveTextarea";
import ButtonList from "./ButtonList";
import InteractiveArea from "./InteractiveArea";
import { useWatch, useFormContext } from "react-hook-form";
import {
  BASIC,
  HP_OPTIONS,
  WEAKNESS_OPTIONS,
  RESISTANCE_OPTIONS,
  RETREAT_OPTIONS,
  ELEMENTS_OPTIONS,
} from "~constants";

const InteractiveLayer = () => {
  const { control } = useFormContext();
  const stage = useWatch({
    control,
    name: "stage",
  });

  return (
    <Box className="interactive-layer">
      {/* NAME */}
      <InteractiveInput
        name="name"
        x={stage.value === BASIC ? 8.9 : 25.8}
        y={7}
        height={4.3}
        width={stage.value === BASIC ? 55 : 39.4}
        fontSize={31}
        control={control}
      />
      {/* HP */}
      <InteractiveSelect
        name="hp"
        x={64.5}
        y={7}
        height={4.3}
        width={19.3}
        choices={HP_OPTIONS}
        className="hp"
        control={control}
      />
      {/* TYPE */}
      <ButtonList
        name="type"
        x={83}
        y={5.4}
        size={3.5}
        options={ELEMENTS_OPTIONS}
        control={control}
        removeButton={false}
      />
      {/* MAIN PICTURE */}
      {/* <InteractiveFile
        name="mainPicture"
        uppy={mainPictureUppy}
        picture={mainPicture}
        removePicture={removePicture}
      /> */}
      {/* SPECIES SIZE WEIGHT */}
      {/* <InteractiveArea
        x={14}
        y={54}
        height={3}
        width={71.9}
        handleClick={handleBox}
        linkedGroup="01"
        focusField="input[name=species]"
      /> */}
      {/* WEAKNESS TYPE */}
      <ButtonList
        name="weaknessType"
        x={12.7}
        y={85}
        size={2.5}
        options={ELEMENTS_OPTIONS}
        control={control}
      />
      {/* WEAKNESS AMOUNT */}
      <InteractiveSelect
        name="weaknessAmount"
        x={18.5}
        y={85}
        height={4.2}
        width={7}
        choices={WEAKNESS_OPTIONS}
        control={control}
      />
      {/* RESISTANCE TYPE */}
      <ButtonList
        name="resistanceType"
        x={46}
        y={85}
        size={2.5}
        options={ELEMENTS_OPTIONS}
        control={control}
      />
      {/* RESISTANCE AMOUNT */}
      <InteractiveSelect
        name="resistanceAmount"
        x={51.5}
        y={85}
        height={4.2}
        width={7}
        choices={RESISTANCE_OPTIONS}
        control={control}
      />
      {/* RETREAT */}
      <InteractiveSelect
        name="retreat"
        x={70.8}
        y={85}
        height={3.9}
        width={22.3}
        choices={RETREAT_OPTIONS}
        control={control}
      />
      {/* DESCRIPTION */}
      <InteractiveTextarea
        name="description"
        x={8.5}
        y={88.8}
        height={5.6}
        width={81.7}
        fontSize={15}
        control={control}
      />
      {/* ILLUSTRATOR */}
      <InteractiveInput
        name="illustrator"
        x={5.4}
        y={94.4}
        height={2.2}
        width={22}
        fontSize={10.5}
        control={control}
        prefix="Illus. "
      />
      {/* COLLECTION RARITY */}
      {/* <InteractiveArea
        x={81}
        y={94.9}
        height={2.2}
        width={14.2}
        handleClick={handleBox}
        linkedGroup="06"
        focusField="input[name=cardNumber]"
      /> */}
    </Box>
  );
};

export default InteractiveLayer;
