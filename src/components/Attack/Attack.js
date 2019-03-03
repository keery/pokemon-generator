import PropTypes from 'prop-types'
import React from 'react'
import { Text, Group, Image as ImageCanvas } from 'react-konva';

const Attack = ({damage, desc, name, amount, type, width, height, x, y, imgTypeAmount, tiny }) => {
    let imgTypeAmountY = 30;
    let damageY = 40;

    if(tiny) {
        height = 50
        imgTypeAmountY = 0;
        damageY = 10;
    }
    const global = {
        textAttackX : 15,
        textWidth : 278
    }

    let attackNameData = {
        fontSize: 19,
        y: 0,
        align: 'center',
        wrap : 'word',
        verticalAlign : 'middle'
    }

    if ( desc !== '') {
        attackNameData = {
            fontSize: 16,
            y: 2,
            align: 'left',
            verticalAlign : 'top'
        }
    }

    if (damage !== '' || imgTypeAmount) {
        global.textAttackX = 54
        global.textWidth = 200
    }

    const attackDescData = {
        fontSize: 12,
        y: (name !== '' ? 20 : 2),
        align: 'left'
    }

    if(imgTypeAmount) {
        imgTypeAmount = <ImageCanvas image={imgTypeAmount} x={0} y={imgTypeAmountY} />
    }

    return (
        <Group width={width} height={height} x={x} y={y} clipWidth={width} clipHeight={height}  clipY={0} clipX={0}>
            { imgTypeAmount }
            <Group y={attackNameData.y} x={global.textAttackX} width={global.textWidth}>
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
                <Text text={desc} fontFamily="gstd" fontSize={attackDescData.fontSize}  y={attackDescData.y} x={0} width={global.textWidth} wrap="char" />
            </Group>
            <Text text={damage} fontFamily="gstd" fontSize={27} y={damageY} x={196} width={100} align="right"/>
        </Group>
    )
}

Attack.defaultProps = {
    width  : 380,
    height : 107,
    imgTypeAmount : null,
};

Attack.PropTypes = {}

export default Attack