import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import {env} from '../../redux/reducers/env';
import {session} from '../../redux/reducers/session';
import {filter} from '../../redux/reducers/filter';

export default combineReducers({
    routing: routerReducer,
    env,
    session,
    filter
});
