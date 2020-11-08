import React from 'react';
import ReactDOM from 'react-dom';

import * as serviceWorker from './serviceWorker';


import configureStore from './config/configureStore';
import { Provider } from 'react-redux';

import App from './App'

const store = configureStore();
const rootElement = document.getElementById('root');

    ReactDOM.render(
        <Provider store={store}>
            <App />
        </Provider>,
        rootElement
    );




// if (module.hot) {
//     module.hot.accept('./DemoPages/Main', () => {
//         const NextApp = require('./DemoPages/Main').default;
//         renderApp(NextApp);
//     });
// }
serviceWorker.unregister();

