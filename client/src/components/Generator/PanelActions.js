import React from 'react'
import { useTranslation } from 'react-i18next'
import { IconButton, Tooltip, HStack } from '@chakra-ui/react'
import {
  AiOutlineDownload,
  AiFillPrinter,
  AiFillSave,
  AiOutlineSync,
  AiOutlineShareAlt,
} from 'react-icons/ai'

const printCard = () => {
  window.print()
}

const ActionBtn = ({ icon, label, onClick }) => (
  <Tooltip hasArrow shouldWrapChildren label={label} aria-label={label}>
    <IconButton isRound icon={icon} onClick={onClick} colorScheme="orange" />
  </Tooltip>
)

const PanelActions = () => {
  const { t } = useTranslation('generator')
  return (
    <HStack spacing={1}>
      <ActionBtn icon={<AiOutlineDownload />} label={t('downloadCard')} />
      <ActionBtn
        icon={<AiFillPrinter />}
        onClick={printCard}
        label={t('printCard')}
      />
      <ActionBtn icon={<AiOutlineSync />} label={t('resetCard')} />
      {/* <ActionBtn icon={<AiFillSave />} label={t('saveCard')} /> */}
      {/* <ActionBtn icon={<AiOutlineShareAlt />} label={t('shareCard')} /> */}
    </HStack>
  )
}

export default PanelActions
