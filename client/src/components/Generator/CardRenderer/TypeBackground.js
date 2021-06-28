import React from 'react'
import { useWatch } from 'react-hook-form'
import ImageCanvas from './ImageCanvas'

const TypeBackground = ({ control }) => {
  const { type, stage } = useWatch({
    control,
    name: ['type', 'stage'],
  })
  console.log(type)
  console.log(stage)

  return (
    <ImageCanvas src={`1-gen/${type}-${stage}.png`} width={540} height={759} />
  )
}

export default TypeBackground
