import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {renderRoutes, RouteConfig} from 'react-router-config';
import {Store} from 'redux';
import {Provider} from 'react-redux';
import {ConnectedRouter} from 'react-router-redux';
import {AppContainer} from 'react-hot-loader';
import routesConfig from 'routes';
import createHistory from 'history/createBrowserHistory';
import configureStore from 'config/store';
import {IStore} from 'models';
import {isServerSide} from 'actions';

const history = createHistory();
const store: Store<IStore> = configureStore(history, window.__REDUX_STATE__);

const render: (routes: RouteConfig[]) => void = (routes: RouteConfig[]) => {
    ReactDOM.render(
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

isServerSide(store.dispatch, false);

if (module.hot) {
    module.hot.accept('../../routes', () => {
        const app: any = require('../../routes').default;
        render(app);
    });
}
