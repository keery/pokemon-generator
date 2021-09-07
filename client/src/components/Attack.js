import React from 'react'
import PropTypes from 'prop-types'
import { Text, Group, Image as ImageCanvas, Rect } from 'react-konva'

const IMG_SIZE = 65
const Attack = ({
  damage,
  desc,
  name,
  width,
  height,
  x,
  y,
  imgTypeAmount,
  tiny,
}) => {
  if (tiny) {
    height = 80
  }
  const global = {
    textAttackX: 195,
    textWidth: 400,
  }

  let attackNameData = {
    fontSize: 28,
    y: 0,
    align: 'center',
    wrap: 'char',
    verticalAlign: 'middle',
  }

  if (desc !== '') {
    attackNameData = {
      fontSize: 16,
      y: 2,
      align: 'left',
      verticalAlign: 'top',
    }
  }

  if (damage !== '' || imgTypeAmount) {
    global.textAttackX = 75
    global.textWidth = 320
  }

  const attackDescData = {
    fontSize: 12,
    y: name !== '' ? 20 : 2,
    align: 'left',
  }

  if (imgTypeAmount) {
    const imgTypeAmountY = height / 2 - IMG_SIZE / 2 - 5
    imgTypeAmount = (
      <ImageCanvas
        image={imgTypeAmount}
        x={0}
        y={imgTypeAmountY}
        width={IMG_SIZE}
        height={IMG_SIZE}
      />
    )
  }

  return (
    <Group
      width={width}
      height={height}
      x={x}
      y={y}
      clipWidth={width}
      clipHeight={height}
      clipY={0}
      clipX={0}
    >
      {/* <Rect
        text="fsdfsdfs"
        y={0}
        x={0}
        width={width}
        height={height}
        fill="#000"
      /> */}
      {imgTypeAmount}
      <Group
        y={attackNameData.y}
        x={global.textAttackX}
        width={global.textWidth}
        height={height}
      >
        <Text
          text={name}
          fontFamily="pokename"
          fontSize={attackNameData.fontSize}
          y={attackNameData.y}
          x={0}
          width={global.textWidth}
          height={height}
          align={attackNameData.align}
          wrap={attackNameData.wrap}
          verticalAlign={attackNameData.verticalAlign}
        />
        {/* <Rect
          y={attackNameData.y}
          x={0}
          width={global.textWidth}
          height={height}
          fill="#000"
        /> */}
        <Text
          text={desc}
          fontFamily="gstd"
          fontSize={attackDescData.fontSize}
          height={height}
          width={global.textWidth}
          verticalAlign="middle"
          wrap="word"
        />
      </Group>
      <Text
        text={damage}
        fontFamily="gstd"
        fontSize={40}
        y={0}
        x={350}
        width={100}
        height={height}
        verticalAlign="middle"
        align="right"
      />
    </Group>
  )
}

Attack.defaultProps = {
  damage: '',
  name: '',
  desc: '',
  width: 462,
  height: 180,
  imgTypeAmount: null,
  tiny: false,
}

Attack.propTypes = {
  damage: PropTypes.string,
  name: PropTypes.string,
  desc: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  tiny: PropTypes.bool,
  // eslint-disable-next-line react/forbid-prop-types
  imgTypeAmount: PropTypes.object,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
}

export default Attack
