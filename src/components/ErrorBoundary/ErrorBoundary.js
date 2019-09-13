import React, { Component } from 'react';
import * as Sentry from '@sentry/browser';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import LogoPokeball from '../../assets/img/pokeball.png';
import './ErrorBoundary.scss';

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { eventId : null };
    }

    static getDerivedStateFromError(error) {
        return { hasError : true };
    }

    componentDidCatch(error, errorInfo) {
        Sentry.withScope((scope) => {
            scope.setExtras(errorInfo);
            const eventId = Sentry.captureException(error);
            this.setState({
                eventId,
            });
        });
    }

    render() {
        const { t, children } = this.props;

        if (this.state.hasError) {
            return (
                <div id="ErrorBoundary">
                    <div className="errorHeader">
                        <img src={LogoPokeball} alt={`Logo ${process.env.REACT_APP_TITLE}`} className="logo" />
                        <div>
                            <h1>{ t('somethingWrong') }</h1>
                            <button
                                onClick={() => Sentry.showReportDialog({ eventId : this.state.eventId })}
                                className="gradient-btn"
                                type="button"
                            >
                                { t('reportFeedback') }
                            </button>
                        </div>
                    </div>
                    <div className="pikachuMeme" title={t('caressMe')} />
                </div>
            );
        }

        return children;
    }
}

ErrorBoundary.propTypes = {
    t        : PropTypes.func.isRequired,
    children : PropTypes.node.isRequired,
};

export default withTranslation('index')(ErrorBoundary);
