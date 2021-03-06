import React, { useState } from 'react'
import { AnimateSharedLayout, motion, AnimatePresence } from 'framer-motion'
import { Button, Box, Flex, VStack, Text } from '@chakra-ui/react'

const Selected = ({ id, setItem }) => {
  return (
    <motion.div
      layoutId={`card-${id}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      //   exit={{
      //     y: '10px',
      //     opacity: 0,
      //   }}
    >
      <Box bg="violet.500" borderRadius="20px" p="20px">
        <Button onClick={() => setItem(null)}>X</Button>
        <motion.div
          layoutId={`card-text-${id}`}
          animate
          //   animate={{
          //     y: 0,
          //     opacity: 1,
          //   }}
          //   initial={{
          //     y: '10px',
          //     opacity: 0,
          //   }}
          //   transition={{
          //     delay: 0.3,
          //   }}
        >
          {id}
        </motion.div>
      </Box>
    </motion.div>
  )
}

const Element = ({ children, onClick, name, selected }) => {
  return (
    <motion.div
      style={{
        display: 'flex',
        width: '200px',
        height: '100px',
        backgroundColor: '#b58fe3',
        borderRadius: '15px',
        border: '2px solid white',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
        fontSize: '32px',
        fontWeight: '500',
      }}
      onClick={() => {
        onClick(null)
        setTimeout(
          () => {
            onClick(name)
          },
          selected ? 500 : 0,
        )
      }}
      layoutId={`card-${name}`}
    >
      <Text layoutId={`card-text-${name}`}>{children}</Text>
    </motion.div>
  )
}

const Framer = () => {
  const [item, setItem] = useState(false)
  return (
    <AnimateSharedLayout type="crossfade">
      <Text>Selected item : {item}</Text>
      <VStack spacing="15px">
        <Element onClick={setItem} selected={item} name="first">
          First
        </Element>
        <Element onClick={setItem} selected={item} name="second">
          Second
        </Element>
        <Element onClick={setItem} selected={item} name="third">
          Third
        </Element>
      </VStack>
      <AnimatePresence>
        {item && <Selected id={item} key="item" setItem={setItem} />}
      </AnimatePresence>
    </AnimateSharedLayout>
  )
}

export default Framer
