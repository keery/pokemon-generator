import React from 'react'
import {
  Box,
  Input,
  Select,
  InputRightAddon,
  InputGroup,
} from '@chakra-ui/react'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { Field, FileInput } from '..'
import { ELEMENTS, HP_CHOICES } from '../../const'
import getUppy from '../../getUppy'

const optionsType = ELEMENTS.map((el) => (
  <option value={el} key={el}>
    {el}
  </option>
))

const optionsHP = HP_CHOICES.map((el) => (
  <option value={el} key={el}>
    {`${el} HP`}
  </option>
))

const FieldsPokemonInfo = () => {
  const { t } = useTranslation('generator')
  const { register } = useFormContext()

  // const mainImageUppy = getUppy(
  //   'uppy-main-picture',
  //   props.transloaditParams,
  //   props.i18n.language,
  // )

  return (
    <Box>
      <Field label={t('name')}>
        <Input name="name" type="text" ref={register} />
      </Field>
      <Field label={t('type')}>
        <Select name="type" textTransform="capitalize" ref={register}>
          {optionsType}
        </Select>
      </Field>
      <Field label={t('picture')}>
        <FileInput name="mainImage" />
      </Field>
      <Field label="HP">
        <Select name="hp" ref={register}>
          {optionsHP}
        </Select>
      </Field>
      <Field label={t('species')}>
        <Input name="species" type="text" ref={register} />
      </Field>
      <Field label={t('length')}>
        <Input
          name="length"
          type="text"
          placeholder={'0\' 0"'}
          ref={register}
        />
      </Field>
      <Field label={t('weight')}>
        <InputGroup>
          <Input name="weight" type="text" ref={register} />
          <InputRightAddon
            children="lbs"
            borderRightRadius="10px"
            bg="white"
            fontWeight="500"
          />
        </InputGroup>
      </Field>
    </Box>
  )
}

export default FieldsPokemonInfo
