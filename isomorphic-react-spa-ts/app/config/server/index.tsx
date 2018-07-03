import * as express from 'express';
import {Express, Request, Response} from 'express-serve-static-core';
import * as webpackDevMiddleware from 'webpack-dev-middleware';
import * as webpackHotMiddleware from 'webpack-hot-middleware';
import * as webpack from 'webpack';
import 'isomorphic-fetch';
import * as React from 'react';
import {renderToString, renderToStaticMarkup} from 'react-dom/server';
import {StaticRouter} from 'react-router-dom';
import {matchRoutes, renderRoutes, MatchedRoute} from 'react-router-config';
import {Store, Dispatch} from 'redux';
import {Provider} from 'react-redux';
import {Helmet, HelmetData} from 'react-helmet';
import routeConfig from 'routes';
import createStore from 'config/store';
import createMemoryHistory from 'history/createMemoryHistory';
import * as serialize from 'serialize-javascript';
import {isServerSide} from 'actions';
import {IStore} from 'models';
import {server} from 'constants/server';

function resolve(manifest, files) {
    return files.map((src) => {
        if (!manifest[src]) {
            return;
        }
        return '/' + manifest[src];
    }).filter((file) => file !== undefined);
}

function renderStylesheets() {
    if (fs.existsSync(path.join(__dirname, 'public', 'styles.css'))) {
        const stylesheet = fs.readFileSync(path.join(__dirname, 'public', 'styles.css'), 'utf8');
        return <style dangerouslySetInnerHTML={{__html: `${stylesheet}`}}/>;
    }
}

function renderJsLinks() {
    if (fs.existsSync(path.join(__dirname, 'assets.json'))) {
        const assets = JSON.parse(fs.readFileSync(path.join(__dirname, 'assets.json'), 'utf8'));
        const clientSide: string[] = resolve(assets, ['app.js']);
        return clientSide.map<JSX.Element>((src: string, item: number) => {
            return <script src={src} key={item}/>;
        });
    }
}

const fs = require('fs');
const path = require('path');
const compression = require('compression');
const app: Express = express();
const cookieParser = require('cookie-parser');

app.set('view engine', 'ejs');
app.use(compression());
app.use(cookieParser());

if (process.env.NODE_ENV !== 'production') {
    const config = require('../webpack/dev');
    const compiler = webpack(config);
    app.use(webpackDevMiddleware(compiler, {
        publicPath: config.output.publicPath,
        stats: {
            colors: true
        },
        noInfo: true,
        lazy: false,
        quiet: true
    }));
    app.use(webpackHotMiddleware(compiler));
}

app.use(express.static(path.join(__dirname, 'public')));

app.get('*', (req: Request, res: Response) => {

    const memoryHistory = createMemoryHistory();
    const store: Store<IStore> = createStore(memoryHistory);
    const dispatch: Dispatch<IStore> = store.dispatch;
    isServerSide(dispatch, true);

    const matchedRoutes: Array<MatchedRoute<{}>> = matchRoutes<{}>(routeConfig, req.originalUrl);
    let promises: Array<Promise<void>> = [];

    for (const {route, match} of matchedRoutes) {
        const component: any = route.component;
        if (component && component.fetchData && typeof component.fetchData === 'function') {
            const promise: Promise<void> = component.fetchData(dispatch, match.params, match.url);
            if (typeof promise.then === 'function') {
                promises = [...promises, promise];
            }
        }
    }

    Promise.all(promises).then(() => {
        const head: HelmetData = Helmet.renderStatic();
        const context: { url?: string } = {};
        const reactAppElement: string = renderToString((
            <Provider store={store}>
                <StaticRouter location={req.path} context={context}>
                    {renderRoutes(routeConfig)}
                </StaticRouter>
            </Provider>
        ));
        if (context.url) {
            res.redirect(302, context.url);
            return;
        }
        res.send(`<!DOCTYPE html>${renderToStaticMarkup((
            <html lang="ru-RU">
            <head>
                {head.base.toComponent()}
                {head.title.toComponent()}
                {head.meta.toComponent()}
                {head.link.toComponent()}
                {renderStylesheets()}
            </head>
            <body>
            <div id="app" dangerouslySetInnerHTML={{__html: reactAppElement}}/>
            <script
                dangerouslySetInnerHTML={{__html: `window.__REDUX_STATE__=${serialize(store.getState())}`}}
                charSet="UTF-8"
            />
            {renderJsLinks()}
            </body>
            </html>
        ))}`);
    }, (err: Error) => res.status(500).send(err.message));
});

app.listen(server.port, server.host, (err: Error) => {
    if (err) {
        console.error(err);
    }
    console.info(`Приложение запущено на ${server.host}:${server.port}`);
});
