import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Stage } from 'react-konva'
import { withTranslation } from 'react-i18next'
import isEqual from 'lodash.isequal'
import DEFAULT_STATE from './Generator.d'
import { encrypt, decrypt } from '../../helper'
import { withStore } from '../../hoc'
import { Box, Flex } from '@chakra-ui/react'
import { CardRenderer, LayerCard } from '../../components'
import {
  GeneratorDrawer,
  ShapesBackground,
  PanelActions,
} from '../../components/Generator'
import {
  ELEMENTS,
  HP_CHOICES,
  WEAKNESS_CHOICES,
  DAMAGE_CHOICES,
  ATTACK_AMOUNT_CHOICES,
  RARITY_CHOICES,
  KEY_CACHE_POKECARD,
  RETREAT_CHOICES,
  RESISTANCE_CHOICES,
} from '../../const'

const {
  REACT_APP_VERSION,
  REACT_APP_TITLE,
  REACT_APP_ENCRYPT_KEY,
} = process.env

class Generator extends Component {
  constructor(props) {
    super(props)

    const cachedCard = localStorage.getItem(KEY_CACHE_POKECARD)
    this.state = cachedCard
      ? decrypt(cachedCard, REACT_APP_ENCRYPT_KEY)
      : DEFAULT_STATE
    this.stageRef = React.createRef()
    // this.mainPictureUppy = getUppy(
    //   'uppy-main-picture',
    //   props.transloaditParams,
    //   props.i18n.language,
    // )
    // this.evolvePictureUppy = getUppy(
    //   'uppy-evolve-picture',
    //   props.transloaditParams,
    //   props.i18n.language,
    // )
  }

  handleChange = (event) => {
    const nested = event.target.getAttribute('nested')
    if (nested) {
      this.setState(
        {
          [nested]: {
            ...this.state[nested],
            [event.target.name]: event.target.value,
          },
        },
        this.cacheCard,
      )
    } else
      this.setState({ [event.target.name]: event.target.value }, this.cacheCard)
  }

  cacheCard = () => {
    localStorage.setItem(
      KEY_CACHE_POKECARD,
      encrypt(this.state, REACT_APP_ENCRYPT_KEY),
    )
  }

  exportCard = () => {
    const link = document.createElement('a')
    link.download = 'card.png'
    link.href = this.stageRef.current.getStage().toDataURL()
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  resetCard = () => {
    if (
      !isEqual(this.state, DEFAULT_STATE) &&
      window.confirm(this.props.t('confirmReset'))
    ) {
      this.setState(DEFAULT_STATE)
      this.flip = true
      localStorage.removeItem(KEY_CACHE_POKECARD)
    }
  }

  updateImgPos = (event) => {
    const { attrs } = event.target
    this.setState(
      { [`${attrs.name}X`]: attrs.x, [`${attrs.name}Y`]: attrs.y },
      this.cacheCard,
    )
  }

  setRetreatVisible = (visible) => {
    this.setState({ retreatVisible: visible }, this.cacheCard)
  }

  removePicture = (pictureName) => {
    this.setState({ [pictureName]: null }, this.cacheCard)
  }

  handleBox = (number, focusField = null) => {
    const { openedGroup } = this.state

    // Divided in if/else in order to avoid focus on closing
    if (openedGroup === number) {
      this.setState({ openedGroup: '' })
    } else {
      if (focusField) {
        const input = document.querySelector(focusField)

        if (input) input.focus()
        else console.log(`${focusField} to focus doesn't exist`)
      }
      this.setState({ openedGroup: number })
    }
  }

  render() {
    const {
      name,
      type,
      mainPicture,
      hp,
      species,
      length,
      weight,
      stage,
      nameEvolution,
      evolvePicture,
      weaknessType,
      weaknessAmount,
      resistanceType,
      resistanceAmount,
      retreat,
      description,
      illustrator,
      cardNumber,
      totalCollection,
      rarity,
      attack1,
      attack2,
      openedGroup,
    } = this.state

    return (
      <Box>
        {/* <GeneratorDrawer /> */}
        <ShapesBackground />
        <Flex justifyContent="center">
          <Box pos="relative" w={540} h={755}>
            <Stage width={540} height={755} ref={this.stageRef}>
              <CardRenderer {...this.state} updateImgPos={this.updateImgPos} />
            </Stage>
            <LayerCard
              {...this.state}
              handleChange={this.handleChange}
              setRetreatVisible={this.setRetreatVisible}
              removePicture={this.removePicture}
              mainPictureUppy={this.mainPictureUppy}
              evolvePictureUppy={this.evolvePictureUppy}
              handleBox={this.handleBox}
            />
          </Box>
        </Flex>
        <PanelActions />
      </Box>
    )
  }
}

Generator.propTypes = {
  transloaditParams: PropTypes.shape({
    signature: PropTypes.string,
    params: PropTypes.string,
  }).isRequired,
}

export default withTranslation('generator')(
  withStore(['transloaditParams'])(Generator),
)
