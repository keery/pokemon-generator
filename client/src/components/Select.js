import React from 'react'
import { useTheme } from '@chakra-ui/react'
import ReactSelect from 'react-select'
import { useController } from 'react-hook-form'

const getStyle = (theme, iconPath) => {
  const before = {
    content: '""',
    display: 'inline-block',
    backgroundPosition: 'center',
    width: '32px',
    height: '32px',
    backgroundRepeat: 'no-repeat',
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
        ...(iconPath && value.length > 0
          ? {
              ':before': {
                ...before,
                marginLeft: '8px',
                backgroundImage: `url(/assets/1-gen/${iconPath.replace(
                  '{{value}}',
                  value[0].value,
                )})`,
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
        ':before': iconPath
          ? {
              ...before,
              marginRight: '10px',
              backgroundImage: `url(/assets/1-gen/${iconPath.replace(
                '{{value}}',
                data.value,
              )})`,
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
  iconPath = null,
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
      styles={getStyle(theme, iconPath)}
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
