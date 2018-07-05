import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import {env} from '../../redux/reducers/env';
import {session} from '../../redux/reducers/session'

export default combineReducers({
    routing: routerReducer,
    env,
    session
});
