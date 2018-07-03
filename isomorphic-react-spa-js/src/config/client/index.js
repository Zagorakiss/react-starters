import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {renderRoutes} from 'react-router-config';
import {Provider} from 'react-redux';
import {ConnectedRouter} from 'react-router-redux';
import {AppContainer} from 'react-hot-loader';
import routesConfig from 'routes';
import createHistory from 'history/createBrowserHistory';
import configureStore from 'config/store';
import {setServerSide} from 'actions';

const history = createHistory();
const store = configureStore(history, window.__REDUX_STATE__);

const render = (routes) => {
    ReactDOM.hydrate(
        <AppContainer>
            <Provider store={store}>
                <ConnectedRouter history={history}>
                    {renderRoutes(routes)}
                </ConnectedRouter>
            </Provider>
        </AppContainer>,
        document.getElementById('app')
    );
};

render(routesConfig);
setServerSide(store.dispatch, false);

if (module.hot) {
    module.hot.accept('../../routes', () => {
        const app = require('../../routes').default;
        render(app);
    });
}
