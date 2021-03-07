import React from 'react'
import { useTheme } from '@chakra-ui/react'
import ReactSelect from 'react-select'
import { useController } from 'react-hook-form'

const getStyle = (theme, hasIcon) => {
  const before = {
    content: '""',
    display: 'inline-block',
    backgroundPosition: 'center',
    width: '32px',
    height: '32px',
  }

  return {
    menuPortal: (base) => ({ ...base, zIndex: 9999 }),
    control: (styles, { getValue }) => {
      const value = getValue()
      return {
        ...styles,
        textTransform: 'capitalize',
        border: '1px solid #ededed',
        backgroundColor: theme.colors.grey['100'],
        borderRadius: theme.radii.md,
        height: '40px',
        ...(hasIcon && value.length > 0
          ? {
              ':before': {
                ...before,
                marginLeft: '8px',
                backgroundImage: `url(/assets/1-gen/1-${value[0].value}.png)`,
              },
            }
          : {}),
        ':hover': {
          borderColor: theme.colors.gray['300'],
        },
      }
    },
    option: (styles, { data, isSelected }) => {
      return {
        ...styles,
        textTransform: 'capitalize',
        display: 'flex',
        alignItems: 'center',
        backgroundColor: isSelected
          ? theme.colors.blue['500']
          : styles.backgroundColor,
        ':before': hasIcon
          ? {
              ...before,
              marginRight: '10px',
              backgroundImage: `url(/assets/1-gen/1-${data.value}.png)`,
              borderRadius: theme.radii.md,
              backgroundColor: isSelected
                ? theme.colors.blue['200']
                : theme.colors.grey['100'],
              border: '1px solid',
              borderColor: isSelected ? theme.colors.blue['500'] : '#ededed',
            }
          : {},
      }
    },
  }
}
const Select = ({
  name,
  control,
  options,
  placeholder = '',
  hasIcon = true,
  isClearable = false,
}) => {
  const theme = useTheme()
  const { field } = useController({
    name,
    control,
  })

  const onChange = (data) => {
    field.onChange(data?.value || '')
  }

  return (
    <ReactSelect
      name={name}
      placeholder={placeholder}
      options={options}
      styles={getStyle(theme, hasIcon)}
      onChange={onChange}
      isClearable={isClearable}
      menuPortalTarget={document.body}
      menuPlacement="auto"
      defaultValue={
        Boolean(field.value) ? { value: field.value, label: field.value } : null
      }
    />
  )
}

export default Select
