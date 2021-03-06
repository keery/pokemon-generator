import React, { useState } from 'react'
import { Text, IconButton } from '@chakra-ui/react'
import { AnimateSharedLayout, motion, AnimatePresence } from 'framer-motion'
import { InteractiveArea } from './Interactive'
import { FieldsSubInfo } from '.'
import { AiOutlineDownload } from 'react-icons/ai'

const SelectedArea = ({ id, setSelected }) => {
  return (
    <motion.div
      animate={{
        translateY: '-50%',
      }}
      style={{
        display: 'flex',
        width: '200px',
        height: '400px',
        backgroundColor: 'rgba(0, 0, 0, 0.54)',
        // backgroundColor: '#b58fe3',
        borderRadius: '15px',
        border: '2px solid white',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
        fontSize: '32px',
        fontWeight: '500',
        position: 'absolute',
        top: 'calc(50% - 200px)',
        left: '100%',
        marginLeft: '30px',
        padding: '20px 0',
        overflow: 'auto',
        // transform: 'translateY(-50%)',
      }}
      //   onClick={() => {
      //     setSelected(null)
      //     setTimeout(() => {
      //       setSelected(id)
      //     }, 500)
      //   }}
      layoutId={`area-${id}`}
    >
      <IconButton
        isRound
        icon={<AiOutlineDownload />}
        onClick={() => setSelected(null)}
        colorScheme="orange"
        pos="absolute"
        top="0.5rem"
        right="0.75rem"
      />

      <Text layoutId={`card-text-${id}`}>
        <FieldsSubInfo />
      </Text>
    </motion.div>
  )
}

const Areas = () => {
  const [selectedArea, setSelected] = useState()

  return (
    <AnimateSharedLayout type="crossfade">
      {/* COLLECTION RARITY */}
      <InteractiveArea
        name="collection"
        x={81}
        y={94.9}
        height={2.2}
        width={14.2}
        setSelected={setSelected}
      />

      {/* SPECIES SIZE WEIGHT */}
      <InteractiveArea
        name="species"
        x={13.9}
        y={54}
        height={3}
        width={71.9}
        setSelected={setSelected}
      />

      <AnimatePresence>
        {selectedArea && (
          <SelectedArea
            id={selectedArea}
            key="item"
            setSelected={setSelected}
          />
        )}
      </AnimatePresence>
    </AnimateSharedLayout>
  )
}

export default Areas
