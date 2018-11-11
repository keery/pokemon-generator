import PropTypes from 'prop-types'
import React from 'react'
import { Text, Group, Image as ImageCanvas } from 'react-konva';

const TypeAmount = ({ type, amount, x , y}) => {
    let imageType = null
    let textAmount = null

    if(type) {
        imageType = <ImageCanvas image={type} x={27} y={0} width={39} height={39} />
        if(amount !== '') textAmount = <Text text={amount} fontFamily="pokename" fontSize={10} y={15} x={58} />
    }

    return (
        <Group x={x} y={y}>
            {imageType}
            {textAmount}
        </Group>
    )
}

TypeAmount.defaultProps = {
    amount : '',
    x      : 0,
    y      : 0,
    type   : null,
};

TypeAmount.propTypes = {
    type: PropTypes.object,
    amount: PropTypes.string,
    y : PropTypes.number,
    x : PropTypes.number,
}

export default TypeAmount