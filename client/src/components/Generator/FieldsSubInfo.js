import React from 'react'
import { Box, Select } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { useFormContext } from 'react-hook-form'
import { Field } from '..'
import {
  ELEMENTS,
  WEAKNESS_CHOICES,
  RESISTANCE_CHOICES,
  RETREAT_CHOICES,
} from '../../const'

const optionsType = ELEMENTS.map((el) => (
  <option value={el} key={el}>
    {el}
  </option>
))

const optionsWeakness = WEAKNESS_CHOICES.map((el) => (
  <option value={el} key={el}>
    {el}
  </option>
))

const optionsResistance = RESISTANCE_CHOICES.map((el) => (
  <option value={el} key={el}>
    {el}
  </option>
))

const optionsRetreat = RETREAT_CHOICES.map((el) => (
  <option value={el} key={el}>
    {el}
  </option>
))

const FieldsSubInfo = () => {
  const { t } = useTranslation('generator')
  const { register } = useFormContext()

  return (
    <Box>
      <Field label={t('weaknessType')}>
        <Select
          name="weaknessType"
          placeholder=" "
          textTransform="capitalize"
          ref={register}
        >
          {optionsType}
        </Select>
      </Field>
      <Field label={t('weaknessAmount')}>
        <Select name="weaknessAmount" ref={register}>
          {optionsWeakness}
        </Select>
      </Field>
      <Field label={t('resistanceType')}>
        <Select
          name="resistanceType"
          placeholder=" "
          textTransform="capitalize"
          ref={register}
        >
          {optionsType}
        </Select>
      </Field>
      <Field label={t('resistanceAmount')}>
        <Select name="resistanceAmount" ref={register}>
          {optionsResistance}
        </Select>
      </Field>
      <Field label={t('retreat')}>
        <Select name="retreat" ref={register}>
          {optionsRetreat}
        </Select>
      </Field>
    </Box>
  )
}

export default FieldsSubInfo
