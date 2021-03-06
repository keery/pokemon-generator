import React from 'react'
import { Stage } from 'react-konva'
import { withTranslation } from 'react-i18next'
import isEqual from 'lodash.isequal'
import { useForm, FormProvider } from 'react-hook-form'
import { Box, Flex } from '@chakra-ui/react'
import DEFAULT_STATE from './Generator.d'
import { encrypt, decrypt } from '../../helper'
import CardRenderer from '../../components/Generator/CardRenderer/CardRenderer'
import {
  GeneratorDrawer,
  ShapesBackground,
  PanelActions,
  LayerCard,
} from '../../components/Generator'

const Generator = () => {
  const cachedCard = localStorage.getItem(process.env.REACT_APP_KEY_CACHE)

  const form = useForm({
    defaultValues: cachedCard
      ? decrypt(cachedCard, process.env.REACT_APP_ENCRYPT_KEY)
      : DEFAULT_STATE,
  })

  const onSubmit = (data) => {
    console.log(data)
  }

  // handleChange = (event) => {
  //   const nested = event.target.getAttribute('nested')
  //   if (nested) {
  //     this.setState(
  //       {
  //         [nested]: {
  //           ...this.state[nested],
  //           [event.target.name]: event.target.value,
  //         },
  //       },
  //       this.cacheCard,
  //     )
  //   } else
  //     this.setState({ [event.target.name]: event.target.value }, this.cacheCard)
  // }

  // cacheCard = () => {
  //   localStorage.setItem(
  //     KEY_CACHE_POKECARD,
  //     encrypt(this.state, REACT_APP_ENCRYPT_KEY),
  //   )
  // }

  // exportCard = () => {
  //   const link = document.createElement('a')
  //   link.download = 'card.png'
  //   link.href = this.stageRef.current.getStage().toDataURL()
  //   document.body.appendChild(link)
  //   link.click()
  //   document.body.removeChild(link)
  // }

  // resetCard = () => {
  //   if (
  //     !isEqual(this.state, DEFAULT_STATE) &&
  //     window.confirm(this.props.t('confirmReset'))
  //   ) {
  //     this.setState(DEFAULT_STATE)
  //     this.flip = true
  //     localStorage.removeItem(KEY_CACHE_POKECARD)
  //   }
  // }

  // updateImgPos = (event) => {
  //   const { attrs } = event.target
  //   this.setState(
  //     { [`${attrs.name}X`]: attrs.x, [`${attrs.name}Y`]: attrs.y },
  //     this.cacheCard,
  //   )
  // }

  // setRetreatVisible = (visible) => {
  //   this.setState({ retreatVisible: visible }, this.cacheCard)
  // }

  // removePicture = (pictureName) => {
  //   this.setState({ [pictureName]: null }, this.cacheCard)
  // }

  // handleBox = (number, focusField = null) => {
  //   const { openedGroup } = this.state

  //   // Divided in if/else in order to avoid focus on closing
  //   if (openedGroup === number) {
  //     this.setState({ openedGroup: '' })
  //   } else {
  //     if (focusField) {
  //       const input = document.querySelector(focusField)

  //       if (input) input.focus()
  //       else console.log(`${focusField} to focus doesn't exist`)
  //     }
  //     this.setState({ openedGroup: number })
  //   }
  // }

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <GeneratorDrawer />
        <ShapesBackground />
        <Flex justifyContent="center">
          <Box pos="relative" w={540} h={755}>
            <CardRenderer />
            {/* <LayerCard
              {...this.state}
              handleChange={this.handleChange}
              setRetreatVisible={this.setRetreatVisible}
              removePicture={this.removePicture}
              mainImageUppy={this.mainImageUppy}
              evolvePictureUppy={this.evolvePictureUppy}
              handleBox={this.handleBox}
            /> */}
            {/* <Framer /> */}
          </Box>
        </Flex>
        <PanelActions />
      </form>
    </FormProvider>
  )
}

export default Generator
