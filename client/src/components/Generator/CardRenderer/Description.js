import React from 'react'
import { useWatch } from 'react-hook-form'
import { Text, Group } from 'react-konva'

const Description = ({ control }) => {
  const description = useWatch({
    control,
    name: 'description',
  })
  if (!Boolean(description)) return null

  return (
    <Group x={57} y={680} width={423}>
      <Text
        text={description}
        fontFamily="pokevolution"
        width={420}
        height={37.5}
        fontSize={15}
        lineHeight={1.1}
      />
    </Group>
  )
}

export default Description
