import React from 'react'
import { useWatch } from 'react-hook-form'
import ImageCanvas from './ImageCanvas'

const Rarity = ({ control }) => {
  const rarity = useWatch({
    control,
    name: 'rarity',
  })

  if (!Boolean(rarity)) return null

  return (
    <ImageCanvas
      src={`1-gen/rarity-${rarity}.png`}
      y={718}
      x={495}
      width={10.5}
      height={10.5}
    />
  )
}

export default Rarity
