import React, { useMemo } from 'react'
import { useWatch } from 'react-hook-form'
import { Text } from 'react-konva'

const HP = ({ control }) => {
  const { species, length, weight } = useWatch({
    control,
    name: ['species', 'length', 'weight'],
  })

  const pokemonInfo = useMemo(() => {
    let info = ''
    if (species !== '') info += `${species} Pokémon`
    if (species !== '' && (length !== '' || weight !== '')) info += '. '
    if (length !== '') info += `Length: ${length}`
    if (length !== '' && weight !== '') info += ', '
    if (weight !== '') info += `Weight: ${weight}`
    return info
  }, [species, length, weight])

  if (!Boolean(pokemonInfo)) return null

  return (
    <Text
      text={`${pokemonInfo}.`}
      fontFamily="pokevolution"
      width={367}
      fontSize={16}
      y={411}
      x={82}
      wrap="none"
      align="center"
    />
  )
}

export default HP
