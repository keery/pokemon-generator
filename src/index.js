import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App/App';
import registerServiceWorker from './registerServiceWorker';
import './i18n/setupI18n';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
