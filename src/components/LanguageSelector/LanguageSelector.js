import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import i18n from '../../i18n/setupI18n';
import { DEFAULT_LANGUAGES, LANGUAGES } from '../../const';
import './LanguageSelector.scss';

class LanguageSelector extends Component {
    constructor(props) {
        super(props);

        this.state = {
            current : props.current,
            choices : this.removeChoice(props.current),
            isOpen  : false,
            trigger : false,
        };
    }

    removeChoice(lng) {
        return this.props.choices.filter(choice => lng !== choice);
    }

    selectLanguage(lng) {
        this.setState({
            isOpen  : false,
            current : lng,
            choices : this.removeChoice(lng),
            trigger : true,
        }, () => {
            i18n.changeLanguage(lng);
        });
    }

    handleList = (visible) => {
        this.setState({ isOpen : visible, trigger : false });
    }

    render() {
        const { current, choices, isOpen, trigger } = this.state;

        return (
            <div
                className={`LanguageSelector ${trigger ? '' : 'open'}`}
                tabIndex="0"
                onBlur={() => this.handleList(false)}
            >
                { isOpen && (
                    <div className="lng-choices">
                        <ul>
                            {
                                choices.map(choice => (
                                    <li
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
    current : DEFAULT_LANGUAGES,
    choices : LANGUAGES,
};

LanguageSelector.propTypes = {
    current : PropTypes.oneOf(LANGUAGES),
    choices : PropTypes.arrayOf(PropTypes.string),
};

export default withTranslation()(LanguageSelector);
