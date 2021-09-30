import React from 'react'
import { useWatch } from 'react-hook-form'
import { Group } from 'react-konva'
import ImageCanvas from './ImageCanvas'

const EvolutionImage = ({ control }) => {
  const image = useWatch({
    control,
    name: 'evolutionImage',
  })

  if (!Boolean(image)) return null

  return (
    <Group
      width={66}
      height={60}
      y={60}
      x={46}
      clipWidth={66}
      clipHeight={57}
      clipY={0}
      clipX={0}
    >
      {/* <ImageCanvas
        image={evolvePicture}
        y={evolvePictureY}
        x={evolvePictureX}
        name="evolvePicture"
        // onDragEnd={updateImgPos}
        draggable
      /> */}
    </Group>
  )
}

export default EvolutionImage
