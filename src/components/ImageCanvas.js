import PropTypes from 'prop-types';
import React from 'react';
import { Image } from 'react-konva';
import useImage from 'use-image';
// import img from './fire-basic.png'

const ImageCanvas = ({ src, width, height }) => {
    const [image] = useImage(require(`../assets/1-gen/${src}`), 'Anonymous');
    return (
        <Image image={image} width={width} height={height} />
    );
};

ImageCanvas.propTypes = {
    src    : PropTypes.string.isRequired,
    width  : PropTypes.number.isRequired,
    height : PropTypes.number.isRequired,
};

export default ImageCanvas;
