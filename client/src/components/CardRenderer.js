import React, { Component, Fragment } from 'react'
import { Layer, Text, Group, Rect, Image as KonvaImage } from 'react-konva'
import PropTypes from 'prop-types'
import Attack from './Attack'
import ImageCanvas from './ImageCanvas'
import TypeAmount from './TypeAmount'
import sliceStageImg from '../assets/1-gen/slice-stage.png'
import { generateImg } from '../helper'
// import '../containers/App/App.scss';

class CardRenderer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      mainPicture: null,
      evolvePicture: null,
      nameX: 54,
      nameY: 58,
      rarityLogo: null,
      attack1Img: null,
      attack2Img: null,
      sliceStage: generateImg(sliceStageImg),
    }

    this.getStateFromProps = this.getStateFromProps.bind(this)
  }

  async componentDidMount() {
    const nextState = await this.getStateFromProps({
      attack1: {},
      attack2: {},
    })
    this.setState(nextState)
  }

  async componentDidUpdate(prevProps, prevState) {
    const nextState = await this.getStateFromProps(prevProps)
    if (Object.keys(nextState).length > 0) this.setState(nextState)
  }

  async getStateFromProps(prevProps) {
    const {
      type,
      stage,
      weaknessType,
      resistanceType,
      retreat,
      rarity,
      attack1: { attack1Type, attack1Amount },
      attack2: { attack2Type, attack2Amount },
      mainPicture,
      evolvePicture,
    } = this.props
    const nextState = {}

    if (prevProps.stage !== stage) {
      // Move name to the left if is an evolution
      nextState.nameX = stage !== 'basic' ? 142 : 54
    }
    if (
      (prevProps.stage !== stage || prevProps.type !== type) &&
      stage !== '' &&
      type !== ''
    ) {
      nextState.bg = await this.getDynamicImg(`${type}-${stage}.png`)
    }
    if (prevProps.attack1.attack1Type !== attack1Type) {
      nextState.attack1Img =
        attack1Type !== '' && attack1Amount !== ''
          ? await this.getDynamicImg(`${attack1Amount}-${attack1Type}.png`)
          : null
    }
    if (prevProps.attack2.attack2Type !== attack2Type) {
      nextState.attack2Img =
        attack2Type !== '' && attack2Amount !== ''
          ? await this.getDynamicImg(`${attack2Amount}-${attack2Type}.png`)
          : null
    }
    if (prevProps.weaknessType !== weaknessType) {
      nextState.weaknessImg = weaknessType
        ? await this.getDynamicImg(`1-${weaknessType}.png`)
        : null
    }
    if (prevProps.resistanceType !== resistanceType) {
      nextState.resistanceImg = resistanceType
        ? await this.getDynamicImg(`1-${resistanceType}.png`)
        : null
    }
    if (prevProps.retreat !== retreat) {
      nextState.retreatImg =
        retreat > 0 && retreat <= 4
          ? await this.getDynamicImg(`retreat-${retreat}.png`)
          : null
    }
    if (prevProps.rarity !== rarity) {
      nextState.rarityLogo = rarity
        ? await this.getDynamicImg(`rarity-${rarity}.png`)
        : null
    }
    if (prevProps.mainPicture !== mainPicture) {
      nextState.mainPicture = mainPicture
        ? await this.createImg(mainPicture.src, 412, 294)
        : null
    }
    if (prevProps.evolvePicture !== evolvePicture) {
      nextState.evolvePicture = evolvePicture
        ? await this.createImg(evolvePicture.src, 66, 60)
        : null
    }

    return nextState
  }

  createImg = (src, maxWidth = false, maxHeight = false) => {
    return new Promise((resolve, reject) => {
      const img = new Image()
      img.crossOrigin = 'anonymous'
      img.src = src

      img.onload = () => {
        if (maxHeight || maxWidth) {
          const ratio = this.calculateAspectRatioFit(
            img.width,
            img.height,
            maxWidth,
            maxHeight,
          )
          img.width = ratio.width
          img.height = ratio.height
        }
        resolve(img)
      }

      return img
    })
  }

  getDynamicImg = (file) => {
    return this.createImg(require(`../assets/1-gen/${file}`))
  }

  updateImgPos = (event) => {
    const { attrs } = event.target
    this.setState({ [`${attrs.name}X`]: attrs.x, [`${attrs.name}Y`]: attrs.y })
  }

  calculateAspectRatioFit(srcWidth, srcHeight, maxWidth, maxHeight) {
    if (srcWidth > maxWidth || srcHeight > maxHeight) {
      let height = 0
      let width = 0

      if (srcWidth > srcHeight) {
        height = maxHeight + 4
        width = (srcWidth / srcHeight) * height
      } else {
        width = maxWidth + 4
        height = (srcHeight / srcWidth) * width
      }

      return { width, height }
    }

    return { width: srcWidth, height: srcHeight }
  }

  render() {
    const {
      attack1Img,
      attack2Img,
      sliceStage,
      nameY,
      nameX,
      evolvePicture,
      mainPicture,
      weaknessImg,
      resistanceImg,
      retreatImg,
      rarityLogo,
    } = this.state

    const {
      nameEvolution,
      hp,
      name,
      stage,
      resistanceAmount,
      description,
      illustrator,
      cardNumber,
      totalCollection,
      species,
      length,
      weight,
      type,
      retreatVisible,
      weaknessAmount,
      evolvePictureX,
      evolvePictureY,
      mainPictureX,
      mainPictureY,
      updateImgPos,
      attack1: { attack1Name, attack1Damage, attack1Info },
      attack2: { attack2Name, attack2Damage, attack2Info },
    } = this.props

    let tiny = false
    let attack2Y = false
    let setNumber = cardNumber
    if (totalCollection !== '') {
      if (cardNumber !== '') setNumber += '/'
      setNumber += totalCollection
    }

    if (
      (attack1Name !== '' ||
        attack1Damage !== '' ||
        attack1Info !== '' ||
        attack1Img) &&
      (attack2Name !== '' ||
        attack2Damage !== '' ||
        attack2Info !== '' ||
        attack2Img)
    ) {
      tiny = true
      attack2Y = 540
    }

    let pokemonInfo = ''
    if (species !== '') pokemonInfo += `${species} Pokémon`
    if (species !== '' && (length !== '' || weight !== '')) pokemonInfo += '. '
    if (length !== '') pokemonInfo += `Length: ${length}`
    if (length !== '' && weight !== '') pokemonInfo += ', '
    if (weight !== '') pokemonInfo += `Weight: ${weight}`

    return (
      <Fragment>
        <Layer>
          <ImageCanvas src={`${type}-${stage}.png`} width={540} height={759} />
          <Text
            text={name}
            fontFamily="pokename"
            fontSize={31}
            y={nameY}
            x={nameX}
          />
          {mainPicture && (
            <Group
              width={412}
              height={289}
              y={95}
              x={65}
              clipWidth={412}
              clipHeight={295}
              clipY={0}
              clipX={-2}
            >
              <KonvaImage
                image={mainPicture}
                y={mainPictureY}
                x={mainPictureX}
                draggable
                name="mainPicture"
                onDragEnd={updateImgPos}
              />
            </Group>
          )}
          {stage !== 'basic' && (
            <Group>
              <KonvaImage
                image={sliceStage}
                x={54}
                y={85}
                width={84}
                height={55}
              />
              <Group
                width={66}
                height={60}
                y={60}
                x={46}
                clipWidth={66}
                clipHeight={57}
                clipY={0}
                clipX={0}
              >
                <KonvaImage
                  image={evolvePicture}
                  y={evolvePictureY}
                  x={evolvePictureX}
                  name="evolvePicture"
                  onDragEnd={updateImgPos}
                  draggable
                />
              </Group>
              {nameEvolution !== '' && (
                <Text
                  text={`Evolves from ${nameEvolution}`}
                  fontFamily="pokevolution"
                  fontSize={13}
                  y={31}
                  x={115}
                />
              )}
            </Group>
          )}
          {hp !== '' && (
            <Text
              text={`${hp} HP`}
              fontFamily="pokehp"
              width={150}
              height={150}
              fontSize={28}
              y={54}
              x={292}
              align="right"
              fill="#ff1f00"
            />
          )}
          {pokemonInfo !== '' && (
            <Text
              text={`${pokemonInfo}.`}
              fontFamily="pokevolution"
              width={367}
              fontSize={16}
              y={411}
              x={82}
              wrap="none"
              align="center"
            />
          )}

          <Attack
            x={39}
            y={442}
            tiny={tiny}
            name={attack1Name}
            damage={attack1Damage}
            desc={attack1Info}
            imgTypeAmount={attack1Img}
          />
          <Rect
            visible={tiny}
            x={37}
            y={525}
            width={469}
            height={2.25}
            fill="#000000"
          />
          <Attack
            x={39}
            y={attack2Y || 442}
            tiny={tiny}
            name={attack2Name}
            damage={attack2Damage}
            desc={attack2Info}
            imgTypeAmount={attack2Img}
          />
          <Group x={29} y={627} width={570}>
            <TypeAmount type={weaknessImg} amount={weaknessAmount} />
            <TypeAmount
              type={resistanceImg}
              amount={resistanceAmount}
              x={178}
            />
            {retreatVisible && retreatImg && (
              <KonvaImage x={376} y={20} image={retreatImg} />
            )}
          </Group>
          {description !== '' && (
            <Group x={57} y={680} width={423}>
              <Text
                text={description}
                fontFamily="pokevolution"
                width={420}
                height={37.5}
                fontSize={15}
                lineHeight={1.1}
              />
            </Group>
          )}
          {illustrator !== '' && (
            <Text
              text={illustrator}
              fontFamily="pokename"
              width={112}
              height={12}
              wrap="none"
              fontSize={10.5}
              y={721}
              x={30}
            />
          )}
          {setNumber !== '' && (
            <Text
              text={setNumber}
              fontFamily="pokename"
              width={52}
              height={12}
              wrap="none"
              fontSize={12}
              align="right"
              y={719}
              x={438}
            />
          )}
          {rarityLogo && (
            <KonvaImage
              image={rarityLogo}
              y={718}
              x={495}
              width={10.5}
              height={10.5}
            />
          )}
        </Layer>
      </Fragment>
    )
  }
}

CardRenderer.defaultProps = {
  type: 'fire',
  stage: 'basic',
  hp: '',
  name: '',
  resistanceAmount: '',
  description: '',
  illustrator: '',
  cardNumber: '',
  totalCollection: '',
  species: '',
  length: '',
  weight: '',
  weaknessAmount: '',
  weaknessType: '',
  resistanceType: '',
  retreat: '',
  rarity: '',
  mainPicture: '',
  evolvePicture: '',
  nameEvolution: '',
  attack1: {
    attack2Name: '',
    attack2Damage: '',
    attack2Info: '',
    attack2Type: '',
    attack2Amount: '',
  },
  attack2: {
    attack2Name: '',
    attack2Damage: '',
    attack2Info: '',
    attack2Type: '',
    attack2Amount: '',
  },
}

CardRenderer.propTypes = {
  type: PropTypes.string,
  stage: PropTypes.string,
  hp: PropTypes.string,
  name: PropTypes.string,
  resistanceAmount: PropTypes.string,
  description: PropTypes.string,
  illustrator: PropTypes.string,
  cardNumber: PropTypes.string,
  totalCollection: PropTypes.string,
  species: PropTypes.string,
  length: PropTypes.string,
  weight: PropTypes.string,
  weaknessAmount: PropTypes.string,
  weaknessType: PropTypes.string,
  resistanceType: PropTypes.string,
  retreat: PropTypes.string,
  retreatVisible: PropTypes.bool.isRequired,
  rarity: PropTypes.string,
  nameEvolution: PropTypes.string,
  evolvePicture: PropTypes.shape({
    src: PropTypes.string,
    name: PropTypes.string,
  }),
  evolvePictureX: PropTypes.number.isRequired,
  evolvePictureY: PropTypes.number.isRequired,
  mainPicture: PropTypes.shape({
    src: PropTypes.string,
    name: PropTypes.string,
  }),
  mainPictureX: PropTypes.number.isRequired,
  mainPictureY: PropTypes.number.isRequired,
  updateImgPos: PropTypes.func.isRequired,
  attack1: PropTypes.shape({
    attack1Name: PropTypes.string,
    attack1Damage: PropTypes.string,
    attack1Info: PropTypes.string,
    attack1Type: PropTypes.string,
    attack1Amount: PropTypes.string,
  }),
  attack2: PropTypes.shape({
    attack2Name: PropTypes.string,
    attack2Damage: PropTypes.string,
    attack2Info: PropTypes.string,
    attack2Type: PropTypes.string,
    attack2Amount: PropTypes.string,
  }),
}

export default CardRenderer
