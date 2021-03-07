import React from 'react'
import { Box, Input, Textarea } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { useFormContext } from 'react-hook-form'
import { Field } from '..'
import { DAMAGE_CHOICES, ATTACK_AMOUNT_CHOICES, ELEMENTS } from '../../const'
import Select from '../Select'

const optionsDamage = DAMAGE_CHOICES.map((el) => ({
  value: el,
  label: el,
}))

const optionsType = ELEMENTS.map((el) => ({
  value: el,
  label: el,
}))

const optionsAmount = ATTACK_AMOUNT_CHOICES.map((el) => ({
  value: el,
  label: el,
}))

const FieldsAttack = ({ name }) => {
  const { t } = useTranslation('generator')
  const { register, control } = useFormContext()

  return (
    <Box>
      <Field label={t('name')}>
        <Input name={`${name}.name`} type="text" ref={register} />
      </Field>
      <Field label={t('damage')}>
        <Select
          name={`${name}.damage`}
          options={optionsDamage}
          control={control}
          hasIcon={false}
          isClearable
        />
      </Field>
      <Field label={t('info')}>
        <Textarea name={`${name}.info`} ref={register} />
      </Field>
      <Field label={t('amount')}>
        <Select
          name={`${name}.amount`}
          options={optionsAmount}
          hasIcon={false}
        />
      </Field>
      <Field label={t('type')}>
        <Select name={`${name}.type`} isClearable options={optionsType} />
      </Field>
    </Box>
  )
}

export default FieldsAttack
