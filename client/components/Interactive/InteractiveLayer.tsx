import React, { useMemo } from "react";
import InteractiveInput from "./InteractiveInput";
import InteractiveFile from "./InteractiveFile";
import InteractiveSelect from "./InteractiveSelect";
import InteractiveTextarea from "./InteractiveTextarea";
import InteractiveCheckbox from "./InteractiveCheckbox";
import InteractiveArea from "./InteractiveArea";
import InteractiveIcon from "./InteractiveIcon";
import ButtonList from "./ButtonList";
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
import { Box, useColorMode } from "@chakra-ui/react";
import FieldsCollection from "~components/Fields/FieldsCollection";
import FieldsLengthWeight from "~components/Fields/FieldsLengthWeight";
import FieldsAttackTab from "~components/Fields/FieldsAttackTab";
import Pen from "public/assets/img/pen.svg";
import Star from "public/assets/img/star.svg";
import Sword from "public/assets/img/sword.svg";
import Add from "public/assets/img/add.svg";
import Stage from "public/assets/img/stage.svg";
import HP from "public/assets/img/hp.svg";
import Pokeball from "public/assets/img/pokeball.svg";
import { useTranslation } from "next-i18next";
import useAttacks from "~hooks/useAttacks";
import { cardAtom } from "~atoms/card";
import { useRecoilValue } from "recoil";

const InteractiveLayer = () => {
  const { t } = useTranslation("generator");
  const { control } = useFormContext();
  const stage = useWatch({
    control,
    name: "stage",
  });
  const { isTiny } = useAttacks(control);
  const card = useRecoilValue(cardAtom);
  const isBasicStage = useMemo(() => stage.value === BASIC, [stage]);
  const { colorMode } = useColorMode();

  return (
    <Box
      className="InteractiveLayer"
      visibility={
        Boolean(card.selectedImg) || card.isFlipped ? "hidden" : "visible"
      }
      opacity={Boolean(card.selectedImg) || card.isFlipped ? 0 : 1}
      transition="visibility 200ms linear,opacity 200ms linear"
    >
      {/* MAIN PICTURE */}
      <InteractiveFile
        name="mainImage"
        width={76.4}
        height={isBasicStage ? 38.8 : 35.8}
        x={11.6}
        y={isBasicStage ? 12.7 : 15.5}
        zIndex={8}
        control={control}
        resizeModalConf={{
          originalWidth: 381,
          originalHeight: 271,
          heightImgArea: 298,
          widthImgArea: 419,
          width: 450,
          height: 375,
        }}
        icon={{
          placement: "left",
          top: "30%",
          label: t("picture"),
          lineLength: 13.8,
          linePos: 32,
        }}
      />
      {/* STAGE */}
      <InteractiveSelect
        name="stage"
        x={8.9}
        y={isBasicStage ? 3.9 : 4.7}
        height={3.3}
        width={isBasicStage ? 20 : 11}
        choices={STAGE_OPTIONS}
        control={control}
        hasEmptyOption={false}
        icon={
          <InteractiveIcon
            placement="left"
            top={isBasicStage ? "4.3%" : "4.8%"}
            label={t("stage")}
            icon={<Stage />}
            lineLength={11}
            linePos={6}
          />
        }
      />
      {/* EVOLUTION NAME */}
      {!isBasicStage && (
        <>
          <InteractiveInput
            name="nameEvolution"
            x={35.6}
            y={4.2}
            height={2.6}
            width={30}
            fontSize={13}
            fontFamily="pokevolution"
            control={control}
            fullWidth={145}
            icon={
              <InteractiveIcon
                placement="top"
                left="16%"
                label={t("nameEvolve")}
                icon={<Pen />}
                lineLength={6.5}
                linePos={37}
              />
            }
          />
          <InteractiveFile
            name="evolvePicture"
            width={12.2}
            height={7.6}
            x={8.6}
            zIndex={10}
            y={7.9}
            resizeModalConf={{
              originalWidth: 61,
              originalHeight: 53,
              heightImgArea: 266,
              widthImgArea: 305,
              width: 400,
              height: 350,
            }}
            control={control}
            noText
            icon={{
              placement: "left",
              top: "11%",
              label: t("pictureEvolve"),
              lineLength: 10.5,
              linePos: 13,
            }}
          />
        </>
      )}
      {/* NAME */}
      <InteractiveInput
        name="name"
        x={stage.value === BASIC ? 8.9 : 25.8}
        y={7}
        height={4.2}
        width={stage.value === BASIC ? 54 : 37.4}
        fullWidth={stage.value === BASIC ? 265 : 183}
        fontSize={31}
        control={control}
        icon={
          <InteractiveIcon
            placement="top"
            left={isBasicStage ? "25%" : "50%"}
            label={t("name")}
            icon={<Pen />}
            lineLength={9.3}
            linePos={isBasicStage ? 31.5 : 55}
          />
        }
      />
      {/* HP */}
      <InteractiveSelect
        name="hp"
        x={63.4}
        y={7}
        height={4.2}
        width={19.8}
        choices={HP_OPTIONS}
        className="hp"
        control={control}
        icon={
          <InteractiveIcon
            placement="top"
            left="77%"
            label="HP"
            icon={<HP />}
            lineLength={8.8}
            linePos={80}
          />
        }
      />
      {/* TYPE */}
      <ButtonList
        name="type"
        x={83.4}
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
            linePos={8}
          />
        }
      />

      {/* SPECIES SIZE WEIGHT */}
      <InteractiveArea
        name="species-size-weight"
        x={13.9}
        y={53.7}
        height={3}
        width={71.9}
        inputTarget="field-species"
        labelTarget="field-species-label"
        noRadius
        fields={<FieldsLengthWeight control={control} />}
        icon={
          <InteractiveIcon
            placement="right"
            top="53.2%"
            label={t("details")}
            icon={<Pen />}
            lineLength={16.3}
            linePos={55}
          />
        }
      />
      {/* ATTACK 1 */}
      <InteractiveArea
        name="attack-1"
        x={6.8}
        y={57}
        height={isTiny ? 12 : 24.5}
        width={86}
        inputTarget="field-attack1"
        labelTarget="field-attack1-label"
        fields={<FieldsAttackTab />}
        icon={
          <InteractiveIcon
            placement="left"
            top={isTiny ? "61%" : "67%"}
            label={t("attack1")}
            icon={<Sword fontSize="1.1rem" />}
            lineLength={8.8}
            linePos={isTiny ? 62.7 : 68.6}
          />
        }
      />
      {/* ATTACK 2 */}
      {isTiny ? (
        <InteractiveArea
          name="attack-2"
          x={6.8}
          y={70}
          height={11.8}
          width={86}
          inputTarget="field-attack2"
          labelTarget="field-attack2-label"
          fields={<FieldsAttackTab defaultIndex={1} />}
          icon={
            <InteractiveIcon
              placement="left"
              top={"74%"}
              label={t("attack2")}
              icon={<Sword fontSize="1.1rem" />}
              lineLength={8.8}
              linePos={75.8}
            />
          }
        />
      ) : (
        <InteractiveArea
          name="attack-2"
          x={6.8}
          y={79.9}
          height={0}
          width={86}
          inputTarget="field-attack2"
          labelTarget="field-attack2-label"
          fields={<FieldsAttackTab defaultIndex={1} />}
          border="none"
          icon={
            <InteractiveIcon
              placement="left"
              top={"75%"}
              label={t("attack2")}
              icon={<Add fontSize="1.1rem" fill="#62b93a" />}
              lineLength={0}
              linePos={75.8}
            />
          }
        />
      )}

      {/* WEAKNESS TYPE */}
      <ButtonList
        name="weaknessType"
        x={12.9}
        y={84.8}
        size={5.4}
        options={ELEMENTS_OPTIONS}
        control={control}
        icon={
          <InteractiveIcon
            placement="left"
            top="84.5%"
            label={t("weakness")}
            icon={<Pokeball />}
            lineLength={15}
            linePos={86.4}
          />
        }
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
        icon={
          <InteractiveIcon
            placement="bottom"
            isSecondLine
            left="8%"
            label={t("weakAmount")}
            icon={<Pen />}
            lineLength={19.8}
            linePos={21.7}
          />
        }
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
        icon={
          <InteractiveIcon
            placement="bottom"
            isSecondLine
            left="51%"
            label={t("resAmount")}
            icon={<Pen />}
            lineLength={19.8}
            linePos={55.7}
          />
        }
      />

      {/* RESISTANCE TYPE */}
      <ButtonList
        name="resistanceType"
        x={45.8}
        y={84.8}
        size={5.4}
        options={ELEMENTS_OPTIONS}
        control={control}
        icon={
          <InteractiveIcon
            placement="bottom"
            left="32%"
            label={t("resistance")}
            icon={<Pokeball />}
            lineLength={13.5}
            linePos={48.4}
          />
        }
      />

      {/* RETREAT */}
      <InteractiveSelect
        name="retreat"
        x={69}
        y={84.7}
        height={4}
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
            linePos={86.3}
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
        fullWidth={404}
        control={control}
        icon={
          <InteractiveIcon
            placement="left"
            top="91.7%"
            label={t("description")}
            icon={<Pen />}
            lineLength={10.6}
            linePos={93.3}
          />
        }
      />
      {/* ILLUSTRATOR */}
      <InteractiveInput
        name="illustrator"
        x={5.4}
        y={94.5}
        height={2.2}
        width={22}
        fontSize={10.5}
        control={control}
        prefix="Illus. "
        fullWidth={105}
        icon={
          <InteractiveIcon
            placement="bottom"
            left="-5%"
            label={t("illustrator")}
            icon={<Pen />}
            lineLength={5.4}
            linePos={10}
          />
        }
      />
      {/* COLLECTION */}
      <InteractiveArea
        name="collection"
        x={81.2}
        y={94.5}
        height={2.2}
        width={10}
        inputTarget="field-collection"
        labelTarget="field-collection-label"
        fields={<FieldsCollection control={control} />}
        icon={
          <InteractiveIcon
            placement="bottom"
            left="84%"
            label={t("collectionNb")}
            icon={<Pen />}
            lineLength={5.4}
            linePos={88}
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
            linePos={95.3}
          />
        }
      />
      {/* FIRST EDITION */}
      <InteractiveCheckbox
        name="firstEdition"
        x={6}
        y={53}
        height={4.3}
        width={7.4}
        icon={{
          placement: "left",
          top: "53%",
          label: t("1edition"),
          lineLength: 8,
          linePos: 54.6,
        }}
      />
    </Box>
  );
};

export default InteractiveLayer;
