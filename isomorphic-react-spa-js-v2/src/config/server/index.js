import express from 'express';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpack from 'webpack';
import 'isomorphic-fetch';
import * as React from 'react';
import {renderToString} from 'react-dom/server';
import {StaticRouter} from 'react-router-dom';
import {matchRoutes, renderRoutes} from 'react-router-config';
import {Provider} from 'react-redux';
import {Helmet, HelmetData} from 'react-helmet';
import routeConfig from 'routes';
import createStore from 'config/store';
import createMemoryHistory from 'history/createMemoryHistory';
import serialize from 'serialize-javascript';
import {server} from 'constants/server';
import {setServerSide} from '../../redux/actions/env';

function resolve(manifest, files) {
    return files.map((src) => {
        if (!manifest[src]) {
            return;
        }
        return '/' + manifest[src];
    }).filter((file) => file !== undefined);
}

function styles() {
    if (fs.existsSync(path.join(__dirname, 'public', 'styles.css'))) {
        const stylesheet = fs.readFileSync(path.join(__dirname, 'public', 'styles.css'), 'utf8');
        return <style dangerouslySetInnerHTML={{__html: `${stylesheet}`}}/>;
    }
}

function assets() {
    if (fs.existsSync(path.join(__dirname, 'assets.json'))) {
        const assets = JSON.parse(fs.readFileSync(path.join(__dirname, 'assets.json'), 'utf8'));
        const clientSide = resolve(assets, ['app.js']);
        return clientSide.map((src, item) => {
            return <script src={src} key={item}/>;
        });
    }
}

const fs = require('fs');
const path = require('path');
const compression = require('compression');
const app = express();

app.set('view engine', 'ejs');
app.use(compression());

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

app.get('*', (req, res) => {

    // if (req.path.substr(req.path.length - 1, req.path.length) !== '/') {
    //     res.redirect(301, `http://${server.host}:${server.port}${req.path}/`);
    // }

    const matchedRoutes= matchRoutes(routeConfig, req.originalUrl);
    let promises = [];

    const memoryHistory = createMemoryHistory(req.path);
    const store = createStore(memoryHistory);
    const dispatch = store.dispatch;

    setServerSide(dispatch, true);

    for (const {route, match} of matchedRoutes) {
        const component = route.component;
        if (component && component.fetchData && typeof component.fetchData === 'function') {
            const promise = component.fetchData(dispatch, match.params, match.url);
            if (typeof promise.then === 'function') {
                promises = [...promises, promise];
            }
        }
    }

    Promise.all(promises).then(() => {
        const head= Helmet.renderStatic();
        const context = {};
        const reactAppElement = renderToString((
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
        res.send(`<!DOCTYPE html>${renderToString((
            <html lang="ru-RU">
            <head>
                {head.base.toComponent()}
                {head.title.toComponent()}
                {head.meta.toComponent()}
                {head.link.toComponent()}
                {styles()}
            </head>
            <body>
                <div id="app" dangerouslySetInnerHTML={{__html: reactAppElement}}/>
                <script
                    dangerouslySetInnerHTML={{__html: `window.__REDUX_STATE__=${serialize(store.getState())}`}}
                    charSet="UTF-8"
                />
                {assets()}
            </body>
            </html>
        ))}`);
    }, (err) => res.status(500).send(err.message));
});

app.listen(server.port, server.host, (err) => {
    if (err) {
        console.error(err); // eslint-disable-line
    }
    console.info('\x1b[32m', `Hostname is ${server.host}:${server.port} \n`, '\x1b[0m'); // eslint-disable-line
});
