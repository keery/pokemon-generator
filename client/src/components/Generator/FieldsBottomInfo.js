import React from 'react'
import { Box, Input, Select, Textarea, Flex } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { Field } from '..'
import { RARITY_CHOICES } from '../../const'

const optionsRarity = RARITY_CHOICES.map((el) => (
  <option value={el} key={el}>
    {el}
  </option>
))

const FieldsBottomInfo = () => {
  const { t } = useTranslation('generator')

  return (
    <Box>
      <Field label={t('description')}>
        <Textarea name="description" />
      </Field>
      <Field label={t('illustrator')}>
        <Input name="illustrator" type="text" />
      </Field>
      <Field label={t('collectionNumber')}>
        <Flex alignItems="center">
          <Input name="cardNumber" type="text" />
          <Box mx={3} fontWeight="600">
            /
          </Box>
          <Input name="totalCollection" type="text" />
        </Flex>
      </Field>
      <Field label={t('rarity')}>
        <Select name="rarity" textTransform="capitalize">
          {optionsRarity}
        </Select>
      </Field>
    </Box>
  )
}

export default FieldsBottomInfo
