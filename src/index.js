import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {Provider} from 'react-redux'
import store, {history} from './store';
import {ConnectedRouter} from 'react-router-redux';
import {StripeProvider} from 'react-stripe-elements';

ReactDOM.render(
    <StripeProvider apiKey="pk_test_mjxYxMlj4K2WZfR6TwlHdIXW">
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <App/>
        </ConnectedRouter>
    </Provider>
    </StripeProvider>, document.getElementById('root')
);
registerServiceWorker();
