import React from "react";
import { useTheme, useColorMode } from "@chakra-ui/react";
import ReactSelect from "react-select";
import { useController, Control, useWatch } from "react-hook-form";
import dynamic from "next/dynamic";
import { useTranslation } from "next-i18next";

const getStyle = (theme, iconPath, colorMode) => {
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
        color: theme.colors.main,
        ":hover": {
          color: theme.colors.main,
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
    indicatorSeparator: (base) => ({ ...base, backgroundColor: "#cacaca" }),
    singleValue: (base) => ({ ...base, color: "#3b434c", fontWeight: "500" }),
    menu: (base) => ({
      ...base,
      zIndex: "999",
      backgroundColor: "rgb(99 98 98 / 83%)",
      backdropFilter: "blur(159px) saturate(160%)",
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
                backgroundImage: `url(/assets/img/1-gen/${iconPath.replace(
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
        border: isFocused ? "1px solid #fefeff" : "1px solid #cacaca",
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
              width: "22px",
              height: "22px",
              marginRight: "15px",
              backgroundSize: "contain",
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

interface Props {
  name: string;
  control: Control;
  placeholder?: string;
  isClearable?: boolean;
  iconPath?: string;
  options: Record<string, any>[];
}

const Select = ({
  name,
  control,
  options,
  placeholder = "",
  iconPath = null,
  isClearable = false,
}: Props) => {
  const { t } = useTranslation("generator");
  const { colorMode } = useColorMode();
  const theme = useTheme();
  const { field } = useController({
    name,
    control,
  });
  const value = useWatch({ control, name });

  const onChange = (data) => {
    field.onChange(data || "");
  };

  return (
    <ReactSelect
      name={name}
      placeholder={placeholder}
      options={options}
      styles={getStyle(theme, iconPath, colorMode)}
      onChange={onChange}
      isClearable={isClearable}
      menuPortalTarget={document.body}
      menuPlacement="auto"
      formatOptionLabel={({ label }) => t(label)}
      value={value}
      // menuIsOpen
    />
  );
};

export default dynamic(() => Promise.resolve(Select), {
  ssr: false,
});
