import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import {IStore} from 'models';
import {env, user, article} from 'reducers';

export default combineReducers<IStore>({
    router: routerReducer,
    env,
    user,
    article
});
