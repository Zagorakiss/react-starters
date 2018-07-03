import {IStore} from 'models';
import {RouterState} from 'react-router-redux';
import {IEnvModule, IDevice, IArticle, IRates} from 'models';

export const selEnv: (state: IStore) => IEnvModule =
    (state: IStore): IEnvModule => state.env;

export const selLocation: (state: IStore) => RouterState =
    (state: IStore): RouterState => state.router;

export const selUserDevice: (state: IStore) => IDevice | undefined =
    (state: IStore): IDevice | undefined => state.user.device;

export const selArticle: (state: IStore) => IArticle | undefined =
    (state: IStore): IArticle | undefined => state.article.details;

export const selArticles: (state: IStore) => IArticle[] | undefined =
    (state: IStore): IArticle[] | undefined => state.article.list;

export const selRates: (state: IStore) => IRates | undefined =
    (state: IStore): IRates | undefined => state.rates;
