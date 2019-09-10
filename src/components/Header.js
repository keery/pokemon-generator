import React from 'react';
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import LanguageSelector from './LanguageSelector/LanguageSelector';
import LogoPokeball from '../assets/img/pokeball.png';

const Header = ({ t }) => (
    <header>
        <nav>
            <div className="container is-fluid">
                <div className="logo-container">
                    {/* <div>
                        <a id='logo'>
                            <img src={LogoPokeball} alt={`Logo ${process.env.REACT_APP_TITLE}`} />
                        </a>
                    </div> */}
                    {/* <div id="logo-title">{process.env.REACT_APP_TITLE.toUpperCase()}</div> */}
                </div>
                <div className="menu-left">
                    <a title={t('index:signUp')}>{t('index:signUp')}</a>
                    <a className="gradient-btn tiny" title={t('index:signIn')}>
                        <i className="fas fa-user" />
                        {t('index:signIn')}
                    </a>
                    <LanguageSelector />
                </div>
            </div>
        </nav>
    </header>
);

Header.propTypes = {
    t : PropTypes.func.isRequired,
};

export default withTranslation()(Header);
