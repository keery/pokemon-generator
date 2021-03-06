import React from 'react'
import { useWatch } from 'react-hook-form'
import { Group } from 'react-konva'
import ImageCanvas from './ImageCanvas'

const MainImage = ({ control }) => {
  const image = useWatch({
    control,
    name: 'mainImage',
  })

  if (!Boolean(image)) return null

  return (
    <Group
      width={412}
      height={289}
      y={95}
      x={65}
      clipWidth={412}
      clipHeight={295}
      clipY={0}
      clipX={-2}
    >
      {/* <KonvaImage
        image={mainImage}
        y={mainImageY}
        x={mainImageX}
        draggable
        name="mainImage"
        onDragEnd={updateImgPos}
      /> */}
    </Group>
  )
}

export default MainImage
