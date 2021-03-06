import React from 'react'
import { Box, Input, Select } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { useFormContext } from 'react-hook-form'
import { Field, FileInput } from '..'

const FieldsEvolution = () => {
  const { t } = useTranslation('generator')
  const { register } = useFormContext()

  return (
    <Box>
      <Field label={t('stage')}>
        <Select name="stage" ref={register}>
          <option value="basic">Basic</option>
          <option value="stage1">Stage 1</option>
          <option value="stage2">Stage 2</option>
        </Select>
      </Field>
      <Field label={t('name')}>
        <Input name="nameEvolution" type="text" ref={register} />
      </Field>
      <Field label={t('picture')}>
        <FileInput name="evolvePicture" ref={register} />
      </Field>
    </Box>
  )
}

export default FieldsEvolution
