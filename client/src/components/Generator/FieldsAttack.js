import React from 'react'
import { Box, Input, Select, Textarea, Flex } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
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

const FieldsAttack = ({ attackNumber }) => {
  const { t } = useTranslation('generator')

  return (
    <Box>
      <Field label={t('name')}>
        <Input name={`attack${attackNumber}Name`} type="text" />
      </Field>
      <Field label={t('damage')}>
        <Select name={`attack${attackNumber}Damage`} placeholder=" ">
          {optionsDamage}
        </Select>
      </Field>
      <Field label={t('info')}>
        <Textarea name={`attack${attackNumber}Info`} />
      </Field>
      <Field label={`${t('amount')} / ${t('type')}`}>
        <Flex>
          <Select name={`attack${attackNumber}Amount`} mr={3} w="40%">
            {optionsAmount}
          </Select>
          <Select
            name={`attack${attackNumber}Type`}
            textTransform="capitalize"
            placeholder=" "
            w="60%"
          >
            {optionsType}
          </Select>
        </Flex>
      </Field>
    </Box>
  )
}

export default FieldsAttack
