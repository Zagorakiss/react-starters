export interface IArticle {
    id?: number;
    title: string;
    body: string;
}

export interface IArticleModule {
    list: IArticle[];
    details: IArticle;
    error: number;
}
