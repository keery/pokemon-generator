import React from "react";
import { useTheme } from "@chakra-ui/react";
import ReactSelect from "react-select";
import { useController, Control, useWatch } from "react-hook-form";
import dynamic from "next/dynamic";
import { useTranslation } from "next-i18next";

const getStyle = (theme, fontSize) => {
  return {
    menuPortal: (base) => ({ ...base, zIndex: 9999 }),
    clearIndicator: () => ({
      display: "none",
    }),
    valueContainer: (base) => ({
      ...base,
      padding: 0,
      input: {
        height: 0,
      },
    }),
    container: (base) => ({ ...base, width: "100%" }),
    indicatorsContainer: (base) => ({
      ...base,
      width: "fit-content",
      height: "100%",
      alignSelf: "center",
      color: "white",
    }),
    dropdownIndicator: (base) => ({
      ...base,
      color: theme.colors.new["4"],
      cursor: "pointer",
      ":hover": {
        color: theme.colors.new["4"],
      },
      svg: {
        width: "40px",
        height: "40px",
      },
    }),
    indicatorSeparator: () => ({ display: "none" }),
    input: (base) => ({ ...base }),
    singleValue: (base) => ({
      ...base,
      color: "white",
      position: "static",
      transform: "none",
      fontWeight: "800",
      fontSize,
      lineHeight: 1.2,
      textTransform: "none",
      fontFamily: theme.fonts.title,
      maxWidth: "100%",
      overflow: "hidden",
      transition: "font-size linear 200ms",
    }),
    menu: (base) => ({
      ...base,
      ...theme.layerStyles.darkBlur,
      zIndex: 999,
    }),
    control: (styles) => {
      return {
        ...styles,
        backgroundColor: "transparent",
        color: "white",
        textTransform: "capitalize",
        transition: "border-color 200ms",
        border: "none",
        width: "fit-content",
        boxShadow: "none",
        ":hover": {
          border: "none",
        },
      };
    },
    option: (styles, { isSelected }) => {
      return {
        ...styles,
        display: "flex",
        alignItems: "center",
        color: "white",
        fontFamily: theme.fonts.title,
        fontSize: "1.3rem",
        backgroundColor: isSelected ? "rgb(81 111 179 / 33%)" : "transparent",
        ":hover": {
          backgroundColor: isSelected
            ? "rgb(81 111 179 / 33%)"
            : "rgb(255 255 255 / 30%)",
        },
      };
    },
  };
};

interface Props {
  name: string;
  control: Control<any>;
  placeholder?: string;
  isClearable?: boolean;
  fontSize?: string;
  onChange?: (value: any) => void;
  options: Record<string, any>[];
}

const SortSelect = ({
  name,
  control,
  options,
  fontSize,
  placeholder = "",
  isClearable = false,
  onChange = null,
}: Props) => {
  const { t } = useTranslation("gallery");
  const theme = useTheme();
  const { field } = useController({
    name,
    control,
  });
  const value = useWatch({ control, name });

  const onChangeSelect = (data) => {
    field.onChange(data || "");
    if (onChange) {
      onChange(data);
    }

    const topList = document.getElementById("top-list");
    topList.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <ReactSelect
      className="sortSelect"
      name={name}
      placeholder={placeholder}
      options={options}
      styles={getStyle(theme, fontSize)}
      onChange={onChangeSelect}
      isSearchable={false}
      isClearable={isClearable}
      menuPortalTarget={document.body}
      menuPlacement="auto"
      formatOptionLabel={({ label }) => t(label)}
      value={value}
      // menuIsOpen
    />
  );
};

export default dynamic(() => Promise.resolve(SortSelect), {
  ssr: false,
});
