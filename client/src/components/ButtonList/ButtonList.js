import React, { useState, useRef } from 'react'
import PropTypes from 'prop-types'
import { Box, Input, HStack } from '@chakra-ui/react'
import { motion } from 'framer-motion'

const styleEl = {
  width: '2rem',
  height: '2rem',
  borderRadius: '100%',
  backgroundSize: '228%',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: '50%',
  position: 'relative',
  backgroundSize: 'contain',
  outline: 'none',
}

const styleDeleteBtn = {
  content: '""',
  position: 'absolute',
  display: 'block',
  backgroundColor: '#c1c1c1',
  left: '50%',
  top: '50%',
  width: '7%',
  height: '50%',
}

const stylePreview = {
  display: 'block',
  backgroundPosition: 'center',
  backgroundSize: 'contain',
  backgroundRepeat: 'no-repeat',
  boxSizing: 'content-box',
  backgroundRepeat: 'no-repeat',
}

const ButtonList = ({
  name,
  x,
  y,
  size,
  items,
  handleClick,
  value,
  removeButton,
}) => {
  const [selected, selectItem] = useState(value)
  const [isVisible, setVisible] = useState(false)
  const inputRef = useRef(null)

  return (
    <Box
      className="ButtonList"
      left={`${x}%`}
      top={`${y}%`}
      pos="absolute"
      display="inline-block"
      role="group"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      <Box
        borderRadius="100%"
        border="2px dashed transparent"
        _hover={{
          border: '2px dashed #fdd705',
        }}
      >
        <Box
          className={selected}
          {...stylePreview}
          height={`${size}rem`}
          width={`${size}rem`}
        />
      </Box>
      {isVisible && (
        <motion.div
          style={{
            position: 'absolute',
            bottom: 'calc(100% + 15px)',
            left: '50%',
            minWidth: '100%',
            x: '-50%',
          }}
          animate={{
            y: 0,
          }}
          initial={{
            y: '10px',
          }}
        >
          <HStack
            spacing=".3rem"
            backgroundColor="#eff0f1"
            p="10px 20px"
            borderRadius="8px"
            boxShadow="0px 0px 11px #d5d5d5"
            display="inline-flex"
            _before={{
              content: '""',
              display: 'block',
              position: 'absolute',
              left: '0',
              right: '0',
              height: '30px',
              top: '100%',
            }}
          >
            {removeButton && (
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                style={{ outline: 'none' }}
              >
                <Box
                  {...styleEl}
                  backgroundColor="#fff"
                  transition="box-shadow ease-in-out .1s"
                  border="1px solid #d8d8d8"
                  _before={{
                    ...styleDeleteBtn,
                    transform:
                      'translateX(-50%) translateY(-50%) rotate(45deg)',
                  }}
                  _after={{
                    ...styleDeleteBtn,
                    transform:
                      'translateX(-50%) translateY(-50%) rotate(-45deg)',
                  }}
                  onClick={() => selectItem('')}
                />
              </motion.button>
            )}
            {items.map((item) => (
              <motion.button
                className={item}
                style={styleEl}
                key={item}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => selectItem(item)}
              />
            ))}
          </HStack>
        </motion.div>
      )}
      <Input
        type="hidden"
        name={name}
        ref={inputRef}
        value={selected}
        onClick={handleClick}
      />
    </Box>
  )
}

ButtonList.propTypes = {
  name: PropTypes.string.isRequired,
  x: PropTypes.number,
  y: PropTypes.number,
  size: PropTypes.number,
  items: PropTypes.arrayOf(PropTypes.string),
  handleClick: PropTypes.func.isRequired,
  value: PropTypes.string,
  removeButton: PropTypes.bool,
}

ButtonList.defaultProps = {
  items: [],
  x: 0,
  y: 0,
  size: 3,
  value: '',
  removeButton: true,
}

export default ButtonList
