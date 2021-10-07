import { RgbaColor } from "react-colorful";

export const getRgbaColor = (color: RgbaColor): string => {
  return `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a || 0})`;
};
