import { RgbaColor } from "react-colorful";
import Router from "next/router";

export const getRgbaColor = (color: RgbaColor): string => {
  return `rgba(${color.r}, ${color.g}, ${color.b}, ${
    typeof color.a === "undefined" ? 1 : color.a
  })`;
};

export const observeFieldResize = (
  field,
  fullWidth: number,
  fontSize: number
) => {
  new ResizeObserver(() => {
    if (!field) return;
    field.style.fontSize = (field.clientWidth / fullWidth) * fontSize + "px";
  }).observe(field);
};

export const setUrlModal = (name: string) => {
  Router.push(`/?modal=${name}`, `modal/${name}`, { shallow: true });
};

export const openModalWithUrl = (name: string, open: () => void): void => {
  setUrlModal(name);
  open();
};

export const closeModalWithUrl = (close: () => void): void => {
  Router.push(`/`, undefined, { shallow: true });
  close();
};
