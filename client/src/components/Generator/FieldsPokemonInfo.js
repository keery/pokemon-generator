import React from 'react'
import { Box, Input, InputRightAddon, InputGroup } from '@chakra-ui/react'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { Field, FileInput } from '..'
import Select from '../Select'
import { ELEMENTS, HP_CHOICES } from '../../const'
import getUppy from '../../getUppy'

const optionsType = ELEMENTS.map((el) => ({
  value: el,
  label: el,
}))

const optionsHP = HP_CHOICES.map((el) => ({
  value: el,
  label: `${el} HP`,
}))

const FieldsPokemonInfo = () => {
  const { t } = useTranslation('generator')
  const { register, watch, control } = useFormContext()
  console.log(watch())

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
        <Select name="type" options={optionsType} control={control} />
      </Field>
      <Field label={t('picture')}>
        <FileInput name="mainImage" />
      </Field>
      <Field label="HP">
        <Select
          name="hp"
          options={optionsHP}
          control={control}
          hasIcon={false}
        />
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
            borderRightRadius="md"
            bg="white"
            fontWeight="500"
          />
        </InputGroup>
      </Field>
    </Box>
  )
}

export default FieldsPokemonInfo
