import Konva from "konva";

export function getDistance(p1, p2) {
  return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
}

export function getCenter(p1, p2) {
  return {
    x: (p1.x + p2.x) / 2,
    y: (p1.y + p2.y) / 2,
  };
}

export function calculateAspectRatioFit(
  srcWidth,
  srcHeight,
  maxWidth,
  maxHeight
) {
  if (srcWidth <= maxWidth && srcHeight <= maxHeight)
    return { width: srcWidth, height: srcHeight };

  const axe = maxWidth / srcWidth < maxHeight / srcHeight ? "width" : "height";

  const ratioWidth = maxWidth / srcWidth;
  const ratioHeight = maxHeight / srcHeight;

  const resizedHeight = srcHeight * ratioWidth;
  const resizedWidth = srcWidth * ratioHeight;

  if (maxWidth / resizedWidth === maxHeight / resizedHeight) {
    return { width: resizedWidth, height: resizedHeight };
  }

  if (axe === "height") {
    return { width: maxWidth, height: resizedHeight };
  }
  if (axe === "width") {
    return { width: resizedWidth, height: maxHeight };
  }
}
