import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import counter from 'reducers/counter';
import env from 'reducers/env';

export default combineReducers({
    routing: routerReducer,
    counter,
    env
});
