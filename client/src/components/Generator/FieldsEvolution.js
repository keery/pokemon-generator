import React from 'react'
import { Box, Input, Select } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { Field, FileInput } from '..'

const FieldsEvolution = () => {
  const { t } = useTranslation('generator')

  return (
    <Box>
      <Field label={t('stage')}>
        <Select name="stage">
          <option value="basic">Basic</option>
          <option value="stage1">Stage 1</option>
          <option value="stage2">Stage 2</option>
        </Select>
      </Field>
      <Field label={t('name')}>
        <Input name="nameEvolution" type="text" />
      </Field>
      <Field label={t('picture')}>
        <FileInput name="evolvePicture" />
      </Field>
    </Box>
  )
}

export default FieldsEvolution
