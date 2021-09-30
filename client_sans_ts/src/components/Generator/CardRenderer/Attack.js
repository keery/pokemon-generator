import React from 'react'
import { Text, Group } from 'react-konva'
import { useWatch } from 'react-hook-form'
import ImageCanvas from './ImageCanvas'

const Attack = ({ name, x, y, isTiny = false, control }) => {
  const attack = useWatch({
    control,
    name,
  })
  let imgTypeAmountY = 30
  let damageY = 40

  const global = {
    textAttackX: 15,
    textWidth: 278,
    img: null,
    height: 107,
    width: 380,
  }

  if (isTiny) {
    global.height = 50
    imgTypeAmountY = 0
    damageY = 10
  }

  let attackNameData = {
    fontSize: 19,
    y: 0,
    align: 'center',
    wrap: 'char',
    verticalAlign: 'middle',
  }

  if (Boolean(attack.info)) {
    attackNameData = {
      fontSize: 16,
      y: 2,
      align: 'left',
      verticalAlign: 'top',
    }
  }

  if (Boolean(attack.amount) && Boolean(attack.type)) {
    global.img = (
      <ImageCanvas
        src={`1-gen/${attack.amount}-${attack.type}.png`}
        x={0}
        y={imgTypeAmountY}
      />
    )
  }

  if (Boolean(attack.damage) || global.img) {
    global.textAttackX = 54
    global.textWidth = 200
  }

  const attackDescData = {
    fontSize: 12,
    y: name !== '' ? 20 : 2,
    align: 'left',
  }

  return (
    <Group
      width={global.width}
      height={global.height}
      x={x}
      y={y}
      clipWidth={global.width}
      clipHeight={global.height}
      clipY={0}
      clipX={0}
    >
      {global.img}
      <Group
        y={attackNameData.y}
        x={global.textAttackX}
        width={global.textWidth}
      >
        <Text
          text={attack.name}
          fontFamily="pokename"
          fontSize={attackNameData.fontSize}
          y={attackNameData.y}
          x={0}
          width={global.textWidth}
          height={global.height}
          align={attackNameData.align}
          wrap={attackNameData.wrap}
          verticalAlign={attackNameData.verticalAlign}
        />
        <Text
          text={attack.info}
          fontFamily="gstd"
          fontSize={attackDescData.fontSize}
          y={attackDescData.y}
          x={0}
          width={global.textWidth}
          wrap="word"
        />
      </Group>
      <Text
        text={attack.damage}
        fontFamily="gstd"
        fontSize={27}
        y={damageY}
        x={196}
        width={100}
        align="right"
      />
    </Group>
  )
}

export default Attack
