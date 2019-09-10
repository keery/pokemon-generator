import React from 'react';
import ReactDOM from 'react-dom';
import * as Sentry from '@sentry/browser';
import { App } from './containers';
import registerServiceWorker from './registerServiceWorker';

import './i18n/setupI18n';

Sentry.init({ dsn : process.env.REACT_APP_DSN_SENTRY_CLIENT });

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
