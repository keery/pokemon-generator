import React from "react";
import { useTheme } from "@chakra-ui/react";
import ReactSelect from "react-select";
import { useController, useFormContext } from "react-hook-form";
import dynamic from "next/dynamic";

const getStyle = (theme, iconPath) => {
  const before = {
    content: '""',
    display: "inline-block",
    backgroundPosition: "center",
    width: "32px",
    height: "32px",
    backgroundRepeat: "no-repeat",
  };

  return {
    menuPortal: (base) => ({ ...base, zIndex: 9999 }),
    dropdownIndicator: (base) => ({
      ...base,
      color: "#929292",
      ":hover": {
        color: theme.colors.main,
      },
    }),
    clearIndicator: (base) => ({
      ...base,
      color: "#929292",
      ":hover": {
        ...base[":hover"],
        color: theme.colors.main,
        cursor: "pointer",
      },
    }),
    indicatorSeparator: (base) => ({ ...base, backgroundColor: "#929292" }),
    singleValue: (base) => ({ ...base, color: "#3b434c", fontWeight: "500" }),
    menu: (base) => ({
      ...base,
      zIndex: "999",
      backgroundColor: "rgb(99 98 98 / 83%)",
      backdropFilter: "blur(159px) saturate(160%)",
    }),
    control: (styles, { getValue, isFocused }) => {
      const value = getValue();

      return {
        ...styles,
        color: "white",
        textTransform: "capitalize",
        transition: "border-color 200ms",
        boxShadow: isFocused ? "0px 0px 2px #868686" : "none",
        border: isFocused ? "1px solid #5389c5" : "1px solid #cacaca",
        backgroundColor: "rgb(255 255 255 / 30%)",
        borderRadius: theme.radii.sm,
        height: "40px",
        ...(iconPath && value.length > 0
          ? {
              ":before": {
                ...before,
                marginLeft: "8px",
                backgroundSize: "50px",
                backgroundImage: `url(/assets/img/1-gen/${iconPath.replace(
                  "{{value}}",
                  value[0].value
                )})`,
              },
            }
          : {}),
        ":hover": {
          borderColor: "#77b2f5",
        },
      };
    },
    option: (styles, { data, isSelected }) => {
      return {
        ...styles,
        textTransform: "capitalize",
        display: "flex",
        alignItems: "center",
        color: "white",
        backgroundColor: isSelected ? theme.colors.main : "transparent",
        ":hover": {
          backgroundColor: isSelected
            ? theme.colors.main
            : "rgb(255 255 255 / 30%)",
        },
        ":before": iconPath
          ? {
              ...before,
              marginRight: "10px",
              backgroundSize: "45px",
              backgroundImage: `url(/assets/img/1-gen/${iconPath.replace(
                "{{value}}",
                data.value
              )})`,
              borderRadius: theme.radii.md,
            }
          : {},
      };
    },
  };
};
const Select = ({
  name,
  control,
  options,
  placeholder = "",
  iconPath = null,
  isClearable = false,
}) => {
  const theme = useTheme();
  const form = useFormContext();
  const { field } = useController({
    name,
    control,
  });

  const onChange = (data) => {
    field.onChange(data?.value || "");
  };

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
      // menuIsOpen
    />
  );
};

export default dynamic(() => Promise.resolve(Select), {
  ssr: false,
});
