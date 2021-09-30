import React from 'react'
import { Box, Input, Textarea, Flex } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { useFormContext } from 'react-hook-form'
import Select from '../Select'
import { Field } from '..'
import { RARITY_CHOICES } from '../../const'

const optionsRarity = RARITY_CHOICES.map((el) => ({
  value: el,
  label: el,
}))

const FieldsBottomInfo = () => {
  const { t } = useTranslation('generator')
  const { register, control } = useFormContext()

  return (
    <Box>
      <Field label={t('description')}>
        <Textarea name="description" ref={register} />
      </Field>
      <Field label={t('illustrator')}>
        <Input name="illustrator" type="text" ref={register} />
      </Field>
      <Field label={t('collectionNumber')}>
        <Flex alignItems="center">
          <Input name="cardNumber" type="text" ref={register} />
          <Box mx={3} fontWeight="600">
            /
          </Box>
          <Input name="totalCollection" type="text" ref={register} />
        </Flex>
      </Field>
      <Field label={t('rarity')}>
        <Select
          name="rarity"
          control={control}
          options={optionsRarity}
          iconPath="rarity-{{value}}.png"
        />
      </Field>
    </Box>
  )
}

export default FieldsBottomInfo
