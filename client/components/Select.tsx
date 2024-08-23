import React from "react";
import { useTheme, useColorMode } from "@chakra-ui/react";
import ReactSelect from "react-select";
import { useFormContext } from "react-hook-form";
import dynamic from "next/dynamic";
import { useTranslation } from "next-i18next";
import { Select as SelectOption } from "~constants";

const getStyle = (theme, iconPath, colorMode, hasColorInverted) => {
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
    dropdownIndicator: (base) => {
      if (colorMode === "dark") {
        return {
          color: "transparent",
          ":after": {
            content: "''",
            width: "3px",
            height: "3px",
            color: "#212529",
            cursor: "pointer",
            boxShadow:
              "3px 3px, 6px 3px, 9px 3px, 12px 3px, 15px 3px, 18px 3px, 21px 3px, 3px 6px, 6px 6px, 9px 6px, 12px 6px, 15px 6px, 18px 6px, 21px 6px, 6px 9px, 9px 9px, 12px 9px, 15px 9px, 18px 9px, 6px 12px, 9px 12px, 12px 12px, 15px 12px, 18px 12px, 9px 15px, 12px 15px, 15px 15px, 12px 18px",
            position: "absolute",
            top: "calc(50% - 12px)",
            right: "30px",
            pointerEvents: "none",
          },
          ":hover:after": {
            color: "#5f6060",
          },
        };
      }
      return {
        ...base,
        color: hasColorInverted ? "white" : theme.colors.new[1],
        ":hover": {
          color: hasColorInverted ? "white" : theme.colors.new[1],
        },
      };
    },
    clearIndicator: (base) => ({
      ...base,
      color: "#929292",
      ":hover": {
        ...base[":hover"],
        color: theme.colors.main,
        cursor: "pointer",
      },
    }),
    container: (base) => ({ ...base, width: "100%" }),
    indicatorSeparator: (base) => ({ ...base, backgroundColor: "#bdccde" }),
    singleValue: (base) => ({
      ...base,
      color: hasColorInverted ? "white" : "#3b434c",
      fontWeight: "500",
    }),
    menu: (base) => ({
      ...base,
      zIndex: "999",
      backgroundColor: "rgb(99 98 98 / 83%)",
      backdropFilter: "blur(159px) saturate(160%)",
    }),
    input: (base) => ({
      ...base,
      color: hasColorInverted ? "white" : base.color,
    }),
    control: (styles, { getValue, isFocused }) => {
      const value = getValue();

      const iconPreview =
        iconPath && value.length > 0
          ? {
              ":before": {
                ...before,
                marginLeft: "10px",
                marginRight: "5px",
                width: "24px",
                height: "24px",
                backgroundSize: "contain",
                backgroundImage: `url(/assets/img/${iconPath.replace(
                  "{{value}}",
                  value[0].value
                )})`,
              },
            }
          : {};
      if (colorMode === "dark") {
        return {
          ...styles,
          ...theme.layerStyles["nes-input"],
          height: "40px",
          padding: 0,
          ...iconPreview,
          ":after": {
            content: "''",
            position: "absolute",
            zIndex: "-1",
            left: "-4px",
            top: "-4px",
            right: "-4px",
            bottom: "-4px",
            backgroundColor: "white",
          },
        };
      }

      return {
        ...styles,
        color: "white",
        textTransform: "capitalize",
        transition: "border-color 200ms",
        boxShadow: isFocused ? "0px 0px 9px #a0c2ff !important" : "none",
        border: isFocused ? "1px solid #fefeff" : "1px solid #bdccde",
        backgroundColor: "rgb(255 255 255 / 30%)",
        borderRadius: theme.radii.sm,
        height: "40px",
        ...iconPreview,
        ":hover": {
          borderColor: isFocused ? "#fefeff" : "#77b2f5",
        },
      };
    },
    option: (styles, { data, isSelected }) => {
      return {
        ...styles,
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
              width: "22px",
              height: "22px",
              marginRight: "15px",
              backgroundSize: "contain",
              backgroundImage: `url(/assets/img/${iconPath.replace(
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

interface Props {
  name: string;
  placeholder?: string;
  isClearable?: boolean;
  iconPath?: string;
  hasColorInverted?: boolean;
  onChange?: (value: any) => void;
  options: SelectOption<string | number>[];
  isTranslated?: boolean;
}

const Select = ({
  name,
  options,
  placeholder = "",
  iconPath = null,
  isClearable = false,
  onChange = null,
  hasColorInverted = false,
  isTranslated = false,
}: Props) => {
  const { t } = useTranslation("generator");
  const { watch, setValue } = useFormContext();
  const { colorMode } = useColorMode();
  const theme = useTheme();
  const value = watch(name);

  const onChangeSelect = (data) => {
    // Block value that are not in options
    if (data !== null && !options.some(({ value }) => data.value === value))
      return;

    setValue(name, data || "");
    if (onChange) {
      onChange(data);
    }
  };

  return (
    <ReactSelect
      name={name}
      placeholder={placeholder}
      options={options}
      styles={getStyle(theme, iconPath, colorMode, hasColorInverted)}
      onChange={onChangeSelect}
      isClearable={isClearable}
      menuPortalTarget={document.body}
      menuPlacement="auto"
      formatOptionLabel={({ label, value }) =>
        isTranslated ? t(label, { value }) : label
      }
      value={value}
      // menuIsOpen
    />
  );
};

export default dynamic(() => Promise.resolve(Select), {
  ssr: false,
});
