import React from 'react'
import { useWatch } from 'react-hook-form'
import { Text, Group, Image as ImageCanvas } from 'react-konva'

const TypeWithAmount = ({ control, name, x = 0, y = 0 }) => {
  const values = useWatch({
    control,
    name: [`${name}Amount`, `${name}Type`],
  })

  const type = values[`${name}Type`]
  const amount = values[`${name}Amount`]
  // let imageType = null

  if (type) {
    // imageType = <ImageCanvas image={type} x={27} y={0} width={58} height={58} />
  }

  if (Boolean(type)) return null

  return (
    <Group x={x} y={y}>
      {/* {imageType} */}
      {Boolean(amount) && (
        <Text text={amount} fontFamily="pokename" fontSize={15} y={25} x={73} />
      )}
    </Group>
  )
}

export default TypeWithAmount
