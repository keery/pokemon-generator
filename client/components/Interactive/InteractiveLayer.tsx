import React, { useMemo } from "react";
import InteractiveInput from "./InteractiveInput";
import InteractiveFile from "./InteractiveFile";
import InteractiveSelect from "./InteractiveSelect";
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
  STAGE_OPTIONS,
  RARITY_OPTIONS,
} from "~constants";
import InteractiveIcon from "./InteractiveIcon";
import Pen from "public/assets/img/pen.svg";
import Star from "public/assets/img/star.svg";
import Sword from "public/assets/img/sword.svg";
import Pokeball from "public/assets/img/pokeball.svg";
import { useTranslation } from "next-i18next";

const InteractiveLayer = () => {
  const { t } = useTranslation("generator");
  const { control } = useFormContext();
  const stage = useWatch({
    control,
    name: "stage",
  });

  const isBasicStage = useMemo(() => stage.value === BASIC, [stage]);

  return (
    <>
      {/* MAIN PICTURE */}
      <InteractiveFile
        name="mainImage"
        width={76.3}
        height={38.9}
        x={11.6}
        y={12.6}
        control={control}
        icon={{
          placement: "left",
          top: "30%",
          label: t("picture"),
          lineLength: 13.8,
        }}
      />
      {/* STAGE */}
      <InteractiveSelect
        name="stage"
        x={8.9}
        y={isBasicStage ? 4.8 : 5.3}
        height={3}
        width={isBasicStage ? 20 : 11}
        choices={STAGE_OPTIONS}
        control={control}
        icon={
          <InteractiveIcon
            placement="left"
            top={isBasicStage ? "4.3%" : "4.8%"}
            label={t("stage")}
            icon={<Pen />}
            lineLength={11}
          />
        }
      />
      {/* EVOLUTION NAME */}
      {!isBasicStage && (
        <>
          <InteractiveInput
            name="nameEvolution"
            x={35.6}
            y={4.5}
            height={2.6}
            width={30}
            fontSize={13}
            fontFamily="pokevolution"
            control={control}
            icon={
              <InteractiveIcon
                placement="top"
                left="40%"
                label={t("nameEvolve")}
                icon={<Pen />}
                lineLength={6.5}
              />
            }
          />
          <InteractiveFile
            name="evolvePicture"
            width={12.2}
            height={7.6}
            x={8.6}
            y={7.9}
            control={control}
            noText
            icon={{
              placement: "left",
              top: "11%",
              label: t("pictureEvolve"),
              lineLength: 10.5,
            }}
          />
        </>
      )}
      {/* NAME */}
      <InteractiveInput
        name="name"
        x={stage.value === BASIC ? 8.9 : 25.8}
        y={7}
        height={4.3}
        width={stage.value === BASIC ? 55 : 37.4}
        fontSize={31}
        control={control}
        icon={
          <InteractiveIcon
            placement="top"
            left={isBasicStage ? "25%" : "21%"}
            label={t("name")}
            icon={<Pen />}
            lineLength={9.3}
          />
        }
      />
      {/* HP */}
      <InteractiveSelect
        name="hp"
        x={63.4}
        y={6.8}
        height={4.5}
        width={19.8}
        choices={HP_OPTIONS}
        className="hp"
        control={control}
        icon={
          <InteractiveIcon
            placement="top"
            left="73%"
            label="HP"
            icon={<Pen />}
            lineLength={8.8}
          />
        }
      />
      {/* TYPE */}
      <ButtonList
        name="type"
        x={83.3}
        y={5.6}
        size={7}
        options={ELEMENTS_OPTIONS}
        control={control}
        removeButton={false}
        icon={
          <InteractiveIcon
            placement="right"
            top="6.2%"
            label={t("type")}
            icon={<Pokeball />}
            lineLength={11.8}
          />
        }
      />

      {/* SPECIES SIZE WEIGHT */}
      <InteractiveArea
        x={13.9}
        y={53.7}
        height={3}
        width={71.9}
        inputTarget="field-species"
        labelTarget="field-species-label"
        noRadius
        icon={
          <InteractiveIcon
            placement="right"
            top="53.2%"
            label={t("details")}
            icon={<Pen />}
            lineLength={16.3}
          />
        }
      />
      {/* ATTACK */}
      <InteractiveArea
        x={6.8}
        y={58}
        height={23}
        width={86}
        inputTarget="field-attack1"
        labelTarget="field-attack1-label"
        icon={
          <InteractiveIcon
            placement="left"
            top="67%"
            label={t("attack1")}
            icon={<Sword />}
            lineLength={8.8}
          />
        }
      />
      {/* WEAKNESS TYPE */}
      <ButtonList
        name="weaknessType"
        x={12.9}
        y={84.8}
        size={5.4}
        options={ELEMENTS_OPTIONS}
        control={control}
      />
      {/* WEAKNESS AMOUNT */}
      <InteractiveSelect
        name="weaknessAmount"
        x={18.5}
        y={85}
        height={3.5}
        width={7}
        choices={WEAKNESS_OPTIONS}
        control={control}
      />
      {/* RESISTANCE TYPE */}
      <ButtonList
        name="resistanceType"
        x={45.8}
        y={84.8}
        size={5.4}
        options={ELEMENTS_OPTIONS}
        control={control}
      />
      {/* RESISTANCE AMOUNT */}
      <InteractiveSelect
        name="resistanceAmount"
        x={51.5}
        y={85}
        height={3.5}
        width={7}
        choices={RESISTANCE_OPTIONS}
        control={control}
      />
      {/* RETREAT */}
      <InteractiveSelect
        name="retreat"
        x={69}
        y={84.7}
        height={4.1}
        width={24.4}
        choices={RETREAT_OPTIONS}
        control={control}
        icon={
          <InteractiveIcon
            placement="right"
            top="84.6%"
            label={t("retreat")}
            icon={<Pen />}
            lineLength={8.7}
          />
        }
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
        icon={
          <InteractiveIcon
            placement="left"
            top="89.7%"
            label={t("description")}
            icon={<Pen />}
            lineLength={10.6}
          />
        }
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
        icon={
          <InteractiveIcon
            placement="bottom"
            left="5.5%"
            label={t("illustrator")}
            icon={<Pen />}
            lineLength={5.4}
          />
        }
      />
      {/* COLLECTION */}
      <InteractiveArea
        x={81.5}
        y={94.5}
        height={2.2}
        width={10}
        inputTarget="field-collection"
        labelTarget="field-collection-label"
        icon={
          <InteractiveIcon
            placement="bottom"
            left="75.8%"
            label={t("collectionNb")}
            icon={<Pen />}
            lineLength={5.4}
          />
        }
      />
      {/* RARITY */}
      <ButtonList
        name="rarity"
        x={91.05}
        y={94}
        size={4}
        options={RARITY_OPTIONS}
        control={control}
        prefix="rarity-"
        icon={
          <InteractiveIcon
            placement="right"
            top="93.6%"
            label={t("rarity")}
            icon={<Star />}
            lineLength={7}
          />
        }
      />
    </>
  );
};

export default InteractiveLayer;
