import {createStore, applyMiddleware, compose} from 'redux';
import {routerMiddleware} from 'react-router-redux';
import {server} from 'constants/server';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import reducer from 'config/reducers';

export default function configureStore(history, initialState) {

    const middlewares = [
        routerMiddleware(history),
        thunk
    ];

    if (server.env !== 'production' && process.env.BROWSER) {
        middlewares.push(logger);
    }

    const composeEnhancers = (server.env !== 'production' &&
        typeof window === 'object' &&
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

    const store = createStore(reducer, initialState, composeEnhancers(
        applyMiddleware(...middlewares)
    ));

    if (server.env === 'development' && module.hot) {
        module.hot.accept('../reducers', () => {
            store.replaceReducer((require('../reducers')));
        });
    }

    return store;

}
