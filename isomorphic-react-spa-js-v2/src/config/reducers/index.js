import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import {env} from '../../redux/reducers/env';
import {session} from '../../redux/reducers/session';
import {filter} from '../../redux/reducers/filter';
import {profile} from '../../redux/reducers/profile';

export default combineReducers({
    routing: routerReducer,
    env,
    session,
    filter,
    profile
});
