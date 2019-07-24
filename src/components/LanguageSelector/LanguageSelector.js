import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import i18n from '../../i18n/setupI18n';
import { LANGUAGES, KEY_LNG } from '../../const';
import './LanguageSelector.scss';

class LanguageSelector extends Component {
    constructor(props) {
        super(props);
        this.state = {
            current : i18n.language,
            choices : this.removeChoice(i18n.language),
            isOpen  : false,
            trigger : false,
        };
    }

    handleList = (visible) => {
        this.setState({ isOpen : visible, trigger : false });
    }

    selectLanguage(lng) {
        this.setState({
            isOpen  : false,
            current : lng,
            choices : this.removeChoice(lng),
            trigger : true,
        }, () => {
            localStorage.setItem(KEY_LNG, lng);
            i18n.changeLanguage(lng);
        });
    }

    removeChoice(lng) {
        return this.props.choices.filter(choice => lng !== choice);
    }

    render() {
        const {
            current, choices, isOpen, trigger,
        } = this.state;

        return (
            <div
                className={`LanguageSelector ${trigger ? '' : 'open'}`}
                tabIndex={0}
                onBlur={() => this.handleList(false)}
            >
                { isOpen && (
                    <div className="lng-choices">
                        <ul>
                            {
                                choices.map(choice => (
                                    <li
                                        role="menuitem"
                                        title={this.props.t(`index:${choice}`)}
                                        key={choice}
                                        className={`lng-ico ${choice}`}
                                        onClick={() => this.selectLanguage(choice)}
                                    />
                                ))
                            }
                        </ul>
                    </div>
                )}
                <div
                    className="lng-current"
                    onClick={() => this.handleList(!isOpen)}
                >
                    <span className={`lng-ico ${current}`} />
                </div>
            </div>
        );
    }
}

LanguageSelector.defaultProps = {
    choices : LANGUAGES,
};

LanguageSelector.propTypes = {
    choices : PropTypes.arrayOf(PropTypes.string),
    t       : PropTypes.func.isRequired,
};

export default withTranslation()(LanguageSelector);
