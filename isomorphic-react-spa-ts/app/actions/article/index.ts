import {Dispatch, Action} from 'redux';
import {IArticle} from 'models';
import {api} from 'constants/server';

const prefix = 'article';

export const GET_ARTICLE_SUCCESS = `${prefix}/GET_ARTICLE_SUCCESS`;
export const GET_ARTICLE_FAILURE = `${prefix}/GET_ARTICLE_FAILURE`;

export const CLEAR_ARTICLE = `${prefix}/CLEAR_ARTICLE`;

export const GET_ARTICLES_SUCCESS = `${prefix}/GET_ARTICLES_SUCCESS`;
export const GET_ARTICLES_FAILURE = `${prefix}/GET_ARTICLES_FAILURE`;

export type GetArticleSuccess = {
    details: IArticle;
} & Action;

export type GetArticleFailure = {
    error: number;
} & Action;

export type ClearArticle = {
    details: undefined;
} & Action;

export type GetArticlesSuccess = {
    list: IArticle[];
} & Action;

export type GetArticlesFailure = {
    error: number;
} & Action;

export function getArticle(dispatch: Dispatch<IArticle>, params: any): Promise<any> {
    return fetch(`${api}article/${params.id}`, {
        method: 'get',
        headers: new Headers({
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'Accept': 'application/json'
        }),
        mode: 'cors'
    }).then<GetArticleSuccess | GetArticleFailure>((res: Response) => {
        if (res.status >= 400) {
            return dispatch<GetArticleFailure>({
                type: GET_ARTICLE_FAILURE,
                error: res.status
            });
        } else {
            return res.json().then((details: IArticle) => dispatch<GetArticleSuccess>({
                type: GET_ARTICLE_SUCCESS,
                details
            }));
        }
    });
}

export function clearArticle(dispatch: Dispatch<IArticle>) {
    return dispatch<ClearArticle>({
        type: CLEAR_ARTICLE,
        details: undefined
    });
}

export function getArticles(dispatch: Dispatch<IArticle>): Promise<any> {
    return fetch(`${api}article`, {
        method: 'get',
        headers: new Headers({
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'Accept': 'application/json'
        }),
        mode: 'cors'
    }).then<GetArticlesSuccess | GetArticlesFailure>((res: Response) => {
        if (res.status >= 400) {
            return dispatch<GetArticleFailure>({
                type: GET_ARTICLES_FAILURE,
                error: res.status
            });
        } else {
            return res.json().then((list: IArticle[]) => dispatch<GetArticlesSuccess>({
                type: GET_ARTICLES_SUCCESS,
                list
            }));
        }
    });
}
