import React from 'react'
import { Image } from 'react-konva'
import useImage from 'use-image'

const ImageCanvas = ({
  src,
  width,
  height,
  x,
  y,
  draggable = false,
  name = '',
}) => {
  const [image] = useImage(
    `${process.env.REACT_APP_FRONT_URL}/assets/${src}`,
    'Anonymous',
  )

  return (
    <Image
      name={name}
      image={image}
      width={width}
      height={height}
      x={x}
      y={y}
      draggable={draggable}
    />
  )
}

export default ImageCanvas
