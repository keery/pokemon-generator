import React from 'react'
import { useWatch } from 'react-hook-form'
import { Text } from 'react-konva'

const HP = ({ control }) => {
  const hp = useWatch({
    control,
    name: 'hp',
  })
  if (!Boolean(hp)) return null

  return (
    <Text
      text={`${hp} HP`}
      fontFamily="pokehp"
      width={150}
      height={150}
      fontSize={28}
      y={54}
      x={292}
      align="right"
      fill="#ff1f00"
    />
  )
}

export default HP
