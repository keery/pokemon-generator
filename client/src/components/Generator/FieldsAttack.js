import React from 'react'
import { Box, Input, Select, Textarea, Flex } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { useFormContext } from 'react-hook-form'
import { Field } from '..'
import { DAMAGE_CHOICES, ATTACK_AMOUNT_CHOICES, ELEMENTS } from '../../const'

const optionsDamage = DAMAGE_CHOICES.map((el) => (
  <option value={el} key={el}>
    {el}
  </option>
))

const optionsType = ELEMENTS.map((el) => (
  <option value={el} key={el}>
    {el}
  </option>
))

const optionsAmount = ATTACK_AMOUNT_CHOICES.map((el) => (
  <option value={el} key={el}>
    {el}
  </option>
))

const FieldsAttack = ({ name }) => {
  const { t } = useTranslation('generator')
  const { register } = useFormContext()

  return (
    <Box>
      <Field label={t('name')}>
        <Input name={`${name}.name`} type="text" ref={register} />
      </Field>
      <Field label={t('damage')}>
        <Select name={`${name}.damage`} placeholder=" " ref={register}>
          {optionsDamage}
        </Select>
      </Field>
      <Field label={t('info')}>
        <Textarea name={`${name}.info`} ref={register} />
      </Field>
      <Field label={`${t('amount')} / ${t('type')}`}>
        <Flex>
          <Select name={`${name}.amount`} mr={3} w="40%" ref={register}>
            {optionsAmount}
          </Select>
          <Select
            name={`${name}.type`}
            textTransform="capitalize"
            placeholder=" "
            w="60%"
            ref={register}
          >
            {optionsType}
          </Select>
        </Flex>
      </Field>
    </Box>
  )
}

export default FieldsAttack
