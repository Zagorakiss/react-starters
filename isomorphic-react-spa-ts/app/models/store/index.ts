import {RouterState} from 'react-router-redux';
import {IEnvModule, IUserModule, IArticleModule, IRates} from 'models';

export interface IStore {
    router: RouterState;
    env: IEnvModule;
    user: IUserModule;
    article: IArticleModule;
    rates: IRates;
}
