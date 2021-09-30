import React from 'react'
import { useWatch } from 'react-hook-form'
import ImageCanvas from './ImageCanvas'

const Retreat = ({ control }) => {
  const retreat = useWatch({
    control,
    name: 'retreat',
  })

  if (!Boolean(retreat)) return null

  return <ImageCanvas src={`1-gen/retreat-${retreat}.png`} x={376} y={20} />
}

export default Retreat
