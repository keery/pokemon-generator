import PropTypes from 'prop-types';
import React from 'react';
import { Image } from 'react-konva';
import useImage from 'use-image';

const ImageCanvas = ({
    src, width, height, x, y,
}) => {
    const [image] = useImage(require(`../assets/1-gen/${src}`), 'Anonymous');
    return (
        <Image
            image={image}
            width={width}
            height={height}
            x={x}
            y={y}
        />
    );
};

ImageCanvas.defaultProps = {
    x : 0,
    y : 0,
};

ImageCanvas.propTypes = {
    src    : PropTypes.string.isRequired,
    width  : PropTypes.number.isRequired,
    height : PropTypes.number.isRequired,
    x      : PropTypes.number,
    y      : PropTypes.number,
};

export default ImageCanvas;
