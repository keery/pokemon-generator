import React, { useEffect } from "react";
import { Layer, Group, Stage } from "react-konva";
import { useFormContext } from "react-hook-form";
import { Box, Image } from "@chakra-ui/react";
import Name from "./Card/Name";
import Attacks from "./Card/Attacks";
import MainImage from "./Card/MainImage";
import Evolution from "./Card/Evolution";
import HP from "./Card/HP";
import SubInfo from "./Card/SubInfo";
import TypeWithAmount from "./Card/TypeWithAmount";
import Description from "./Card/Description";
import Illustrator from "./Card/Illustrator";
import CollectionNumber from "./Card/CollectionNumber";
import TypeBackground from "./Card/TypeBackground";
import Rarity from "./Card/Rarity";
import Retreat from "./Card/Retreat";
import { DragEndEvent } from "leaflet";

const CardRenderer = () => {
  const stageRef = React.createRef();
  const { control, setValue, formState, getValues } = useFormContext();
  // constructor(props) {
  //   super(props)

  //   this.state = {
  //     mainImage: null,
  //     evolvePicture: null,
  //     rarityLogo: null,
  //     attack1Img: null,
  //     attack2Img: null,
  //     sliceStage: generateImg(sliceStageImg),
  //   }

  //   this.getStateFromProps = this.getStateFromProps.bind(this)
  // }

  // async getStateFromProps(prevProps) {
  //   const {
  //     type,
  //     stage,
  //     weaknessType,
  //     resistanceType,
  //     retreat,
  //     rarity,
  //     attack1: { attack1Type, attack1Amount },
  //     attack2: { attack2Type, attack2Amount },
  //     mainImage,
  //     evolvePicture,
  //   } = this.props
  //   const nextState = {}

  //   if (prevProps.stage !== stage) {
  //     // Move name to the left if is an evolution
  //     nextState.nameX = stage !== 'basic' ? 142 : 54
  //   }
  //   if (
  //     (prevProps.stage !== stage || prevProps.type !== type) &&
  //     stage !== '' &&
  //     type !== ''
  //   ) {
  //     nextState.bg = await this.getDynamicImg(`${type}-${stage}.png`)
  //   }
  //   if (prevProps.retreat !== retreat) {
  //     nextState.retreatImg =
  //       retreat > 0 && retreat <= 4
  //         ? await this.getDynamicImg(`retreat-${retreat}.png`)
  //         : null
  //   }
  //   if (prevProps.rarity !== rarity) {
  //     nextState.rarityLogo = rarity
  //       ? await this.getDynamicImg(`rarity-${rarity}.png`)
  //       : null
  //   }
  //   if (prevProps.mainImage !== mainImage) {
  //     nextState.mainImage = mainImage
  //       ? await this.createImg(mainImage.src, 412, 294)
  //       : null
  //   }
  //   if (prevProps.evolvePicture !== evolvePicture) {
  //     nextState.evolvePicture = evolvePicture
  //       ? await this.createImg(evolvePicture.src, 66, 60)
  //       : null
  //   }

  //   return nextState
  // }

  // const createImg = (src, maxWidth = false, maxHeight = false) => {
  //   return new Promise((resolve, reject) => {
  //     const img = new Image()
  //     img.crossOrigin = 'anonymous'
  //     img.src = src

  //     img.onload = () => {
  //       if (maxHeight || maxWidth) {
  //         const ratio = this.calculateAspectRatioFit(
  //           img.width,
  //           img.height,
  //           maxWidth,
  //           maxHeight,
  //         )
  //         img.width = ratio.width
  //         img.height = ratio.height
  //       }
  //       resolve(img)
  //     }

  //     return img
  //   })
  // }

  // const getDynamicImg = (file) => {
  //   return this.createImg(require(`../assets/1-gen/${file}`))
  // }

  useEffect(() => {
    console.log("dirtyFields", formState.dirtyFields);
  }, [formState.dirtyFields]);

  const updateImgPos = (event: DragEndEvent): void => {
    const { attrs } = event.target;
    setValue(`${attrs.name}X`, attrs.x);
    setValue(`${attrs.name}Y`, attrs.y);
    console.log("o", getValues(), `${attrs.name}Y`);
  };

  return (
    <Box border="none" pos="relative">
      <Image
        src="assets/img/pokemon-water-3.png"
        pos="absolute"
        left="105%"
        right="0%"
        w="210px"
        transform="rotateY(180deg)"
      />
      <Image
        src="assets/img/kaiminus.png"
        pos="absolute"
        bottom="-10%"
        left="100%"
        // transform="rotateY(180deg)"
        w="300px"
      />
      <Image
        src="assets/img/carapuce.png"
        pos="absolute"
        right="100%"
        top="20%"
        width="270px"
        transform="rotate(20deg)"
      />
      <Box
        pos="absolute"
        left="0"
        top="0"
        right="0"
        bottom="0"
        layerStyle="glass"
        borderRadius="1.8rem"
      />
      <Stage width={500} height={700}>
        {/* <Stage width={540} height={755} ref={stageRef}> */}
        <Layer>
          <TypeBackground control={control} />
          <Name control={control} />
          <HP control={control} />
          <SubInfo control={control} />
          <Attacks control={control} />
          <MainImage control={control} updateImgPos={updateImgPos} />
          <Evolution control={control} />
          {/* <Rect x={25} y={590} width={570} height={30} fill="#000000" /> */}
          <Group x={38} y={593} width={570}>
            <TypeWithAmount control={control} name="weakness" />
            <TypeWithAmount control={control} name="resistance" x={165} />
            <Retreat control={control} />
          </Group>
          <Description control={control} />
          <Illustrator control={control} />
          <CollectionNumber control={control} />
          <Rarity control={control} />
        </Layer>
      </Stage>
    </Box>
  );
};

export default CardRenderer;
