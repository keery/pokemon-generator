import React from 'react'
import { Container, Image, Link, Text, Flex } from '@chakra-ui/react'
import { withTranslation } from 'react-i18next'
import PropTypes from 'prop-types'
import LanguageSelector from '../LanguageSelector/LanguageSelector'

const Header = ({ t }) => (
  <header>
    <Container maxW="1200px">
      <Flex className="logo-container" alignItems="center">
        <Link href="/" id="logo">
          <Image
            w="40px"
            src={`${process.env.REACT_APP_FRONT_URL}/assets/img/pokeball.png`}
            alt={`Logo ${process.env.REACT_APP_TITLE}`}
          />
        </Link>
        <Text ml={4}>{process.env.REACT_APP_TITLE.toUpperCase()}</Text>
      </Flex>
      {/* <div className="menu-left">
        <a title={t("index:signUp")} href="/tmp">
          {t("index:signUp")}
        </a>
        <a className="gradient-btn tiny" title={t("index:signIn")} href="/tmp">
          <i className="fas fa-user" />
          {t("index:signIn")}
        </a>
        <LanguageSelector />
      </div> */}
    </Container>
  </header>
)

Header.propTypes = {
  t: PropTypes.func.isRequired,
}

export default withTranslation()(Header)
