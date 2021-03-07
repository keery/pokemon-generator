import React from 'react'
import { Box, Input } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { useFormContext } from 'react-hook-form'
import { Field, FileInput } from '..'
import Select from '../Select'

const optionsStage = [
  { value: 'basic', label: 'Basic' },
  { value: 'stage1', label: 'Stage 1' },
  { value: 'stage2', label: 'Stage 2' },
]

const FieldsEvolution = () => {
  const { t } = useTranslation('generator')
  const { register, control } = useFormContext()

  return (
    <Box>
      <Field label={t('stage')}>
        <Select
          name="stage"
          options={optionsStage}
          control={control}
          hasIcon={false}
        />
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
