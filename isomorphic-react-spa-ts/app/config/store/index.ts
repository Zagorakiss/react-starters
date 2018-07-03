import {createStore, Store, applyMiddleware, compose} from 'redux';
import {routerMiddleware} from 'react-router-redux';
import {server} from 'constants/server';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import reducer from 'config/reducers';
import {IStore} from 'models';

export default function configureStore(history, initialState?: IStore): Store<IStore> {

    const middlewares: Redux.Middleware[] = [
        routerMiddleware(history),
        thunk
    ];

    const createLogger = require('redux-logger');

    if (server.env !== 'production' && process.env.BROWSER) {
        middlewares.push(logger);
    }

    const composeEnhancers = (server.env !== 'production' &&
        typeof window === 'object' &&
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

    const store = createStore<IStore>(reducer, initialState as IStore, composeEnhancers(
        applyMiddleware(...middlewares)
    ));

    if (server.env === 'development' && (module as any).hot) {
        (module as any).hot.accept('../reducers', () => {
            store.replaceReducer((require('../reducers')));
        });
    }

    return store;
}
