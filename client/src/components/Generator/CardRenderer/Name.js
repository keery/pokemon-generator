import React from 'react'
import { useWatch } from 'react-hook-form'
import { Text } from 'react-konva'

const Name = ({ control }) => {
  const name = useWatch({
    control,
    name: 'name',
  })

  return <Text text={name} fontFamily="pokename" fontSize={31} y={58} x={54} />
}

export default Name
