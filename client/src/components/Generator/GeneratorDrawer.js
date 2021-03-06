import React from 'react'
import {
  Button,
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerContent,
  DrawerCloseButton,
  Accordion,
  AccordionItem,
  AccordionPanel,
} from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

import {
  FieldsPokemonInfo,
  FieldsEvolution,
  GroupButton,
  FieldsSubInfo,
  FieldsAttack,
  FieldsBottomInfo,
} from '.'

const GeneratorDrawer = () => {
  const { t } = useTranslation('generator')
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = React.useRef()

  return (
    <>
      <Button ref={btnRef} colorScheme="teal" onClick={onOpen}>
        Open
      </Button>
      <Drawer
        width="400px"
        isOpen
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
        blockScrollOnMount={false}
      >
        <DrawerContent maxW="400px">
          <DrawerCloseButton />
          <DrawerHeader>Create your card</DrawerHeader>
          <DrawerBody>
            <Accordion allowMultiple>
              <AccordionItem>
                <GroupButton number="01" label="Pokemon info" />
                <AccordionPanel>
                  <FieldsPokemonInfo />
                </AccordionPanel>
              </AccordionItem>
              <AccordionItem>
                <GroupButton number="02" label={t('evolution')} />
                <AccordionPanel>
                  <FieldsEvolution />
                </AccordionPanel>
              </AccordionItem>
              <AccordionItem>
                <GroupButton number="03" label={t('attack1')} />
                <AccordionPanel>
                  <FieldsAttack name="attack1" />
                </AccordionPanel>
              </AccordionItem>
              <AccordionItem>
                <GroupButton number="04" label={t('attack2')} />
                <AccordionPanel>
                  <FieldsAttack name="attack2" />
                </AccordionPanel>
              </AccordionItem>
              <AccordionItem>
                <GroupButton
                  number="05"
                  label={t('weaknessResistanceRetreat')}
                />
                <AccordionPanel>
                  <FieldsSubInfo />
                </AccordionPanel>
              </AccordionItem>
              <AccordionItem>
                <GroupButton number="06" label={t('additionalInformation')} />
                <AccordionPanel>
                  <FieldsBottomInfo />
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default GeneratorDrawer
