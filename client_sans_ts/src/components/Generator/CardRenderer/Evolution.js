import React from 'react'
import { useWatch } from 'react-hook-form'
import { Group } from 'react-konva'
import EvolutionImage from './EvolutionImage'
import EvolutionName from './EvolutionName'
import ImageCanvas from './ImageCanvas'

const Evolution = ({ control }) => {
  const stage = useWatch({
    control,
    name: 'stage',
  })
  if (stage === 'basic') return null

  return (
    <Group>
      <ImageCanvas
        src="1-gen/slice-stage.png"
        x={54}
        y={85}
        width={84}
        height={55}
      />
      <EvolutionImage control={control} />
      <EvolutionName control={control} />
    </Group>
  )
}

export default Evolution
