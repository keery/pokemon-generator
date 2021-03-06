import React from 'react'
import { useWatch } from 'react-hook-form'
import { Text } from 'react-konva'

const Illustrator = ({ control }) => {
  const illustrator = useWatch({
    control,
    name: 'illustrator',
  })
  if (!Boolean(illustrator)) return null

  return (
    <Text
      text={illustrator}
      fontFamily="pokename"
      width={112}
      height={12}
      wrap="none"
      fontSize={10.5}
      y={721}
      x={30}
    />
  )
}

export default Illustrator
