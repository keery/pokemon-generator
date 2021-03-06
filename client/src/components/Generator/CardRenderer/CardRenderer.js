import React from 'react'
import { Layer, Group, Stage } from 'react-konva'
import { useFormContext } from 'react-hook-form'
// import { generateImg } from '../helper'
import Name from './Name'
import Attacks from './Attacks'
import MainImage from './MainImage'
import Evolution from './Evolution'
import HP from './HP'
import SubInfo from './SubInfo'
import TypeWithAmount from './TypeWithAmount'
import Description from './Description'
import Illustrator from './Illustrator'
import CollectionNumber from './CollectionNumber'
import TypeBackground from './TypeBackground'
import Rarity from './Rarity'
import Retreat from './Retreat'

const CardRenderer = () => {
  const stageRef = React.createRef()
  const { control } = useFormContext()

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

  // const updateImgPos = (event) => {
  //   const { attrs } = event.target
  //   this.setState({ [`${attrs.name}X`]: attrs.x, [`${attrs.name}Y`]: attrs.y })
  // }

  // calculateAspectRatioFit(srcWidth, srcHeight, maxWidth, maxHeight) {
  //   if (srcWidth > maxWidth || srcHeight > maxHeight) {
  //     let height = 0
  //     let width = 0

  //     if (srcWidth > srcHeight) {
  //       height = maxHeight + 4
  //       width = (srcWidth / srcHeight) * height
  //     } else {
  //       width = maxWidth + 4
  //       height = (srcHeight / srcWidth) * width
  //     }

  //     return { width, height }
  //   }

  //   return { width: srcWidth, height: srcHeight }
  // }

  return (
    <>
      <Stage width={540} height={755} ref={stageRef}>
        <Layer>
          <TypeBackground control={control} />
          <Name control={control} />
          {/* <MainImage control={control} /> */}
          <Evolution control={control} />
          <HP control={control} />
          <SubInfo control={control} />
          <Attacks control={control} />
          <Group x={29} y={627} width={570}>
            <TypeWithAmount control={control} name="weakness" />
            <TypeWithAmount control={control} name="resistance" x={178} />
            <Retreat control={control} />
          </Group>
          <Description control={control} />
          <Illustrator control={control} />
          <CollectionNumber control={control} />
          <Rarity control={control} />
        </Layer>
      </Stage>
    </>
  )
}

export default CardRenderer
