import {Action} from 'redux';
import {IArticleModule} from 'models';
import {
    GetArticleSuccess,
    GetArticleFailure,
    ClearArticle,
    GetArticlesSuccess,
    GetArticlesFailure,
    GET_ARTICLE_SUCCESS,
    GET_ARTICLE_FAILURE,
    CLEAR_ARTICLE,
    GET_ARTICLES_SUCCESS,
    GET_ARTICLES_FAILURE
} from 'actions';

const defaultState: IArticleModule = {
    list: undefined,
    details: undefined,
    error: 0
};

const reducer: (state: IArticleModule, action: Action) => IArticleModule =
    (state: IArticleModule = defaultState, action: Action): IArticleModule => {
        switch (action.type) {
            case GET_ARTICLE_SUCCESS:
                return {
                    ...state,
                    details: (action as GetArticleSuccess).details
                };
            case GET_ARTICLE_FAILURE:
                return {
                    ...state,
                    error: (action as GetArticleFailure).error
                };
            case CLEAR_ARTICLE:
                return {
                    ...state,
                    details: (action as ClearArticle).details
                };
            case GET_ARTICLES_SUCCESS:
                return {
                    ...state,
                    list: (action as GetArticlesSuccess).list
                };
            case GET_ARTICLES_FAILURE:
                return {
                    ...state,
                    error: (action as GetArticlesFailure).error
                };
            default:
                return state;
        }
    };

export default reducer;
